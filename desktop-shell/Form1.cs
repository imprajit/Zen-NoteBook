using Microsoft.Web.WebView2.WinForms;
using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DesktopShell
{
    public partial class Form1 : Form
    {
        private readonly WebView2 webView = new WebView2();
        private Process? javaProcess;

        // The launcher will be placed beside the app and runtime folders.
        private readonly string root = AppContext.BaseDirectory;

        private readonly string logPath = Path.Combine(
            Environment.GetFolderPath(
                Environment.SpecialFolder.LocalApplicationData),
            "ZenNotebook-desktop-test.log");

        private const int Port = 8082;

        public Form1()
        {
            Text = "Zen Notebook";
            Width = 1100;
            Height = 750;
            MinimumSize = new Size(700, 500);
            StartPosition = FormStartPosition.CenterScreen;

            webView.Dock = DockStyle.Fill;
            Controls.Add(webView);

            Shown += async (_, _) => await StartNotebookAsync();
            FormClosing += (_, _) => StopJava();
        }

        private async Task StartNotebookAsync()
        {
            try
            {
                string java = Path.Combine(
                    root, "runtime", "bin", "java.exe");

                string jar = Path.Combine(
                    root, "app", "zen-notebook-1.0-SNAPSHOT.jar");

                if (!File.Exists(java))
                {
                    throw new FileNotFoundException(
                        "The bundled Java runtime was not found.",
                        java);
                }

                if (!File.Exists(jar))
                {
                    throw new FileNotFoundException(
                        "The Zen Notebook application JAR was not found.",
                        jar);
                }

                File.WriteAllText(
                    logPath,
                    "Zen Notebook desktop test started."
                    + Environment.NewLine);

                var start = new ProcessStartInfo
                {
                    FileName = java,
                    WorkingDirectory = Path.GetDirectoryName(jar)!,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true
                };

                start.ArgumentList.Add(
                    "-Dzen.notebook.openBrowser=false");

                start.ArgumentList.Add("-jar");
                start.ArgumentList.Add(jar);
                start.ArgumentList.Add($"--server.port={Port}");

                // Keep test notes separate from the real database.
                string testData = Path.Combine(
                    root, "test-data");

                Directory.CreateDirectory(testData);

                string testDb = Path.Combine(
                    testData, "zen_note_test")
                    .Replace('\\', '/');

                start.ArgumentList.Add(
                    $"--spring.datasource.url=jdbc:h2:file:{testDb}");

                javaProcess = new Process
                {
                    StartInfo = start,
                    EnableRaisingEvents = true
                };

                javaProcess.OutputDataReceived += (_, e) =>
                {
                    if (e.Data != null)
                        Log(e.Data);
                };

                javaProcess.ErrorDataReceived += (_, e) =>
                {
                    if (e.Data != null)
                        Log("ERROR: " + e.Data);
                };

                javaProcess.Start();
                javaProcess.BeginOutputReadLine();
                javaProcess.BeginErrorReadLine();

                using var client = new HttpClient
                {
                    Timeout = TimeSpan.FromSeconds(2)
                };

                bool ready = false;

                for (int i = 0; i < 45; i++)
                {
                    if (javaProcess.HasExited)
                    {
                        throw new Exception(
                            $"Java exited with code {javaProcess.ExitCode}.");
                    }

                    try
                    {
                        using var response = await client.GetAsync(
                            $"http://127.0.0.1:{Port}/");

                        if (response.IsSuccessStatusCode)
                        {
                            ready = true;
                            break;
                        }
                    }
                    catch (HttpRequestException)
                    {
                        // The server may still be starting.
                    }
                    catch (TaskCanceledException)
                    {
                        // Retry if this individual request times out.
                    }

                    await Task.Delay(500);
                }

                if (!ready)
                {
                    throw new Exception(
                        "The Java server did not start within the expected time.");
                }

                await webView.EnsureCoreWebView2Async();

                webView.CoreWebView2.NavigationStarting += (_, e) =>
                {
                    // Keep navigation inside the local notebook server.
                    if (!Uri.TryCreate(e.Uri, UriKind.Absolute, out Uri? uri)
                        || uri.Scheme != Uri.UriSchemeHttp
                        || uri.Host != "127.0.0.1"
                        || uri.Port != Port)
                    {
                        e.Cancel = true;
                    }
                };

                webView.CoreWebView2.Navigate(
                    $"http://127.0.0.1:{Port}/");
            }
            catch (Exception ex)
            {
                Log("STARTUP ERROR:");
                Log(ex.ToString());

                MessageBox.Show(
                    this,
                    ex.Message
                    + Environment.NewLine
                    + Environment.NewLine
                    + "Full details are in:"
                    + Environment.NewLine
                    + logPath,
                    "Zen Notebook startup error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
            }
        }

        private void Log(string message)
        {
            try
            {
                lock (logPath)
                {
                    File.AppendAllText(
                        logPath,
                        message + Environment.NewLine);
                }
            }
            catch
            {
                // Logging failure must not crash the desktop application.
            }
        }

        private void StopJava()
        {
            try
            {
                if (javaProcess != null && !javaProcess.HasExited)
                {
                    javaProcess.Kill(entireProcessTree: true);
                    javaProcess.WaitForExit(3000);
                }
            }
            catch (Exception ex)
            {
                Log("Shutdown error: " + ex.Message);
            }
            finally
            {
                javaProcess?.Dispose();
                javaProcess = null;
            }
        }
    }
}
