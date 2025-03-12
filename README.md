You can install Enhanced Commit CLI globally using npm:

```sh
npm i -g git-commit-msg-cli
```

# Enhanced Commit CLI

Enhanced Commit CLI is a powerful command-line tool designed to help developers generate meaningful and conventional commit messages based on their staged changes. It automatically analyzes modified files and suggests appropriate commit messages following best practices.

## Features

- 📌 **Auto-detects changes** and suggests commit messages.
- 🔍 **Categorizes changes** based on file types and modifications.
- 🛠 **Supports conventional commit types** like `fix`, `feat`, `perf`, `refactor`, etc.
- ✏️ **Allows manual message customization** when needed.
- 🏗 **Improves commit consistency** for better project history.

## Installation

You can install Enhanced Commit CLI globally using npm:

```sh
npm i -g git-commit-msg-cli
```

## Usage

To generate and apply a commit message, simply run:

```sh
gcm commit
```

The tool will analyze your staged changes and suggest an appropriate commit message. You can select from the suggestions or enter a custom message.

## Example Workflow

1. Stage your changes:
   ```sh
   git add .
   ```
2. Run Enhanced Commit CLI:
   ```sh
   gcm commit
   ```
3. Select a suggested message or enter a custom one.
4. Confirm and commit!

## Supported Commit Types

- **fix**: Bug fixes.
- **feat**: New features.
- **perf**: Performance improvements.
- **refactor**: Code restructuring without changing functionality.
- **style**: Code style updates (e.g., formatting, missing semicolons).
- **docs**: Documentation updates.
- **test**: Adding or updating tests.
- **chore**: Other updates like dependency changes, build scripts, etc.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

🚀 Enhance your commit history with clarity and consistency!

