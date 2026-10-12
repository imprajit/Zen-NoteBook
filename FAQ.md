# Frequently Asked Question (FAQ)

### Zen Notebook — Less noise. More thought.

## 1. What is Zen Notebook?

Zen Notebook is a Java and JavaScript-based notebook application designed to make writing and managing notes simple, focused, and straightforward.

It aims to provide a quieter alternative to software that keeps adding complexity to everyday tasks.

## 2. What technologies does Zen Notebook use?

Zen Notebook uses several technologies, each serving a specific purpose:

| Technology      | What it does in Zen Notebook                                             |
| --------------- | ------------------------------------------------------------------------ |
| **Java**        | Backend application logic and server                                     |
| **JavaScript**  | Frontend interactions, notes, search, and communication with the backend |
| **HTML**        | Structure of the interface                                               |
| **CSS**         | Appearance and styling                                                   |
| **Spring Boot** | Framework for the Java backend                                           |
| **H2**          | Local database                                                           |
| **Maven**       | Project build and dependency management                                  |

These technologies work together to provide a focused notebook experience.

We believe the technology should support the user—not distract them from their thoughts.


## 3. Why does Zen Notebook exist?

We believe a notebook should help you think, not compete for your attention.

Zen Notebook exists to give people a focused place to capture ideas, organize thoughts, and manage notes without unnecessary distractions.

## 4. Why not just use Windows Notepad?

Windows Notepad is useful for plain-text editing. Zen Notebook has a different purpose: it focuses on managing notes through features such as saving, searching, editing, favorites, and trash.

The goal isn't to claim that one application is right for everyone. It's to offer another choice for people who prefer a focused notebook experience.

## 5. Does Zen Notebook use AI?

Zen Notebook's philosophy is to avoid forcing AI into the writing experience.

The project does not aim to make an AI assistant a requirement for taking notes. Any future AI-related proposal would need to be evaluated against this principle.

## 6. Where are my notes stored?

Zen Notebook uses the H2 database for local storage.

The application is designed to store its database in the user's Windows application-data directory. The exact storage and backup behavior should be verified for each release.

## 7. Do I need an internet connection?

The Spring Boot application serves its web interface locally. However, installation, updates, and some development workflows may require an internet connection.

Offline behavior should be verified for the specific release and installation method.

## 8. Can I search, edit, and organize notes?

The application includes note creation, searching, editing, favorites, and trash functionality.

The exact behavior of each feature may evolve as the project develops.

## 9. Is Zen Notebook free?

Zen Notebook is an open-source project. Check the repository's `LICENSE` file for the applicable permissions and conditions.

## 10. Is Zen Notebook available for Windows?

Windows installation and packaging are part of the project. Check the latest GitHub Releases for available installers and release notes.

If an installer fails, please report the issue with the error message and steps to reproduce it.

## 11. How can I report a bug?

Open an issue in the GitHub repository:

https://github.com/imprajit/Zen-NoteBook/issues

Include the steps to reproduce the problem, what you expected to happen, and what actually happened. Remove private information from screenshots and logs.

## 12. Can I request a feature?

Yes. Open a GitHub Issue describing the problem you want to solve and how the proposed feature would help.

Features are evaluated according to the project's core principles: simplicity, usefulness, reliability, and respect for the user's attention.

## 13. Can I contribute to Zen Notebook?

Absolutely. Contributions are welcome, including bug fixes, tests, documentation, accessibility improvements, and carefully considered features.

Read `CONTRIBUTING.md` before submitting a Pull Request.

## 14. How can I follow development?

Visit the GitHub repository to explore the source code, open issues, milestones, roadmap, and releases:

https://github.com/imprajit/Zen-NoteBook

## 15. Is Zen Notebook finished?

Zen Notebook is an evolving project. Features, testing, and packaging may still be under development.

Check the latest release notes and open issues for the current status. Do not assume that a planned feature is already available.

## 16. What makes Zen Notebook different?

Zen Notebook is guided by a simple idea: more features do not automatically mean a better experience.

We want to build software that helps people focus on their thoughts instead of demanding more of their attention.

---

### Still have a question?

If your question is about a bug, feature, or technical issue, visit the [GitHub Issues page](https://github.com/imprajit/Zen-NoteBook/issues).

**Your thoughts deserve a quieter place.**

**Zen Notebook — Less noise. More thought.**
