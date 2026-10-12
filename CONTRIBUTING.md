# Contributing to Zen Notebook

First, thank you for your interest in Zen Notebook.

Zen Notebook is built around one simple belief:

**Less noise. More thought.**

We believe software should respect people's attention. Not every tool needs AI, and not every project needs endless features. We want to build a notebook that stays focused on what matters: your thoughts.

If this philosophy resonates with you, you're welcome to contribute.

## What We Welcome

You can help Zen Notebook by:

* Fixing bugs and improving reliability
* Improving the user interface
* Writing tests
* Improving documentation
* Improving Windows packaging and installation
* Suggesting useful features that preserve simplicity
* Improving accessibility and usability

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

### 4. Make your changes

Keep changes focused, readable, and consistent with the existing project.

Before submitting, test your changes and make sure the application still works.

### 5. Commit your work

```bash
git add .
git commit -m "Describe your change"
git push -u origin fix/describe-your-change
```

Use a meaningful commit message. Do not include unrelated changes or personal files.

### 6. Open a Pull Request

On GitHub, open a Pull Request from your branch to the main branch of the original Zen Notebook repository.

Explain:

* What you changed
* Why you changed it
* How you tested it
* Which issue it addresses, if applicable

I'll review contributions and may request changes before merging.

## Our Design Principles

Every contribution should respect these principles:

1. **Simplicity over clutter.** Avoid adding features without a clear purpose.
2. **User control.** Do not introduce unwanted AI features or unnecessary integrations.
3. **Reliability first.** Fix existing problems before adding complexity.
4. **Respectful collaboration.** Discuss ideas openly and treat contributors with respect.
5. **Purposeful design.** Every feature should make the notebook more useful without distracting from its core purpose.

## Development Notes

Zen Notebook uses Java, Spring Boot, HTML, CSS, JavaScript, Maven, and H2.

Build the project with:

```bash
mvn clean package
```

Please test your changes before submitting a Pull Request. If you encounter build or installation problems, include the error message and the steps needed to reproduce them.

## A Final Note

You don't have to be an expert to contribute. A useful bug report, a clear explanation, a test, or a small improvement can make a real difference.

We're not trying to build software that does everything.

We're trying to build software that does what matters, without getting in your way.

**Your thoughts deserve a quieter place.**

Thank you for helping build Zen Notebook.

— Zen Notebook Project
