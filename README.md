# ⚙️ Ignorai

Ignorai is a command-line tool that dynamically generates `.gitignore` files tailored to your projects using AI.

## Features

- Automatically creates `.gitignore` files based on your project structure
- Utilizes OpenAI's API for intelligent file exclusion recommendations
- Easy setup and configuration
- Customizable to suit your specific project needs

## Installation

You can install Ignorai globally using npm:
```bash
npm install -g ignorai
```

## Configuration
To set up Ignorai, run the following command and provide your OpenAI API token:
```bash
ignorai setup <YOUR_OPENAI_API_KEY>
```

## Usage
⚠️ Important: Always run Ignorai in the root directory of your project!
To generate a .gitignore file, use:
```bash
ignorai generate
```

## How It Works

1. Ignorai scans your project directory
2. It analyzes the file structure and identifies common patterns
3. The tool then uses OpenAI's API to generate appropriate .gitignore rules
4. Finally, it creates or updates the .gitignore file in your project root

## Contributing
We welcome contributions to Ignorai! If you'd like to contribute:

## Fork the repository
Create a new branch for your feature or bug fix
Make your changes and commit them
Push to your fork and submit a pull request
Please open an issue first if you plan to make major changes.

## License
This project is licensed under the AGPL-3.0 License.
