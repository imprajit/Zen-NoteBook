# Contributing to Zen Notebook

First, thank you for your interest in Zen Notebook.

Zen Notebook is built around one simple belief:

**Less noise. More thought.**

We believe software should respect people's attention. Not every tool needs AI, and not every project needs endless features. We want to build a notebook that stays focused on what matters: your thoughts.

If this philosophy resonates with you, you're welcome to contribute.

## What We Welcome

You can help Zen Notebook by:

- Fixing bugs and improving reliability
- Improving the user interface
- Writing tests
- Improving documentation
- Improving Windows packaging and installation
- Suggesting useful features that preserve simplicity
- Improving accessibility and usability

## Before You Start

1. Check the existing GitHub Issues.
2. Look for issues labelled `good first issue` or `help wanted`.
3. For significant changes, open an issue first to discuss your idea.
4. Avoid duplicating work that another contributor is already doing.

## How to Contribute

### 1. Fork the repository

Create your own fork of Zen Notebook on GitHub.

### 2. Clone your fork

Replace `YOUR-USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR-USERNAME/Zen-NoteBook.git
cd Zen-NoteBook
```

### 3. Create a branch

```bash
git switch -c fix/describe-your-change
```

Use a descriptive branch name that explains your work.

### 4. Make your changes

Keep changes focused, readable, and consistent with the existing project.

Before submitting, test your changes and make sure the application still works.

### 5. Review your changes

Check which files you modified:

```bash
git status
```

Review your changes:

```bash
git diff
```

Check for whitespace errors:

```bash
git diff --check
```

Stage only the files related to your contribution:

```bash
git add path/to/your-file
```

Avoid staging unrelated files, generated build output, logs, or personal configuration.

### 6. Commit and push

```bash
git commit -m "Describe your change"
git push -u origin fix/describe-your-change
```

Use a meaningful commit message.

### 7. Open a Pull Request

On GitHub, open a Pull Request from your branch to the `main` branch of the original Zen Notebook repository.

Explain:

- What you changed
- Why you changed it
- How you tested it
- Which issue it addresses, if applicable

I'll review contributions and may request changes before merging.

## Our Design Principles

Every contribution should respect these principles:

1. **Simplicity over clutter.** Avoid adding features without a clear purpose.
2. **User control.** Do not introduce unwanted AI features or unnecessary integrations.
3. **Reliability first.** Fix existing problems before adding complexity.
4. **Respectful collaboration.** Discuss ideas openly and treat contributors