# ADO Mermaid Viewer 🎨

> Professional Mermaid diagram renderer for Azure DevOps with full GitHub Flavored Markdown support

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=wallon-qodo.ado-mermaid-viewer)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CI/CD](https://github.com/wallon-qodo/ado-mermaid-viewer/actions/workflows/ci.yml/badge.svg)](https://github.com/wallon-qodo/ado-mermaid-viewer/actions/workflows/ci.yml)
[![Release](https://github.com/wallon-qodo/ado-mermaid-viewer/actions/workflows/release.yml/badge.svg)](https://github.com/wallon-qodo/ado-mermaid-viewer/actions/workflows/release.yml)

## Overview

**ADO Mermaid Viewer** is a powerful extension that brings beautiful, interactive Mermaid diagrams to your Azure DevOps repositories. Seamlessly integrated with Azure Repos, it automatically renders Mermaid code blocks in your Markdown files, transforming plain text into stunning visualizations.

> **Note**: This project is a fork of [rafaelprd/azure-devops-markdown-mermaid](https://github.com/rafaelprd/azure-devops-markdown-mermaid), which is no longer maintained. It has been completely rebranded, modernized, and greatly improved with:
> - GitHub Flavored Markdown support (tables, task lists, strikethrough)
> - Updated to Mermaid v11 with latest features
> - Professional table styling
> - Comprehensive testing framework
> - Modern build system and dependencies
> - Complete documentation rewrite

## ✨ Features

### 🎯 Core Capabilities

- **Automatic Rendering**: Instantly visualize Mermaid diagrams directly in Azure Repos
- **GitHub Flavored Markdown**: Full GFM support including tables, task lists, and strikethrough
- **Multiple Diagram Types**: Support for flowcharts, sequence diagrams, Gantt charts, class diagrams, state diagrams, entity relationships, user journeys, and more
- **Modern Technology**: Built with the latest Mermaid v11.12.0 and Marked.js for optimal performance
- **Zero Configuration**: Works out of the box - just install and start creating diagrams

### 📊 Supported Diagram Types

- **Flowcharts**: Visualize processes and workflows
- **Sequence Diagrams**: Document interactions between components
- **Gantt Charts**: Plan and track project timelines
- **Class Diagrams**: Model system architectures
- **State Diagrams**: Represent state machines
- **Entity Relationship Diagrams**: Design database schemas
- **User Journey Maps**: Map user experiences
- **Git Graphs**: Visualize branch strategies
- **Pie Charts**: Display data distributions
- **Mindmaps**: Brainstorm and organize ideas
- And many more!

### 🎨 Enhanced Markdown Rendering

- Professional table formatting with borders and styling
- Syntax highlighting for code blocks
- Proper handling of lists, headings, and inline formatting
- Responsive design that adapts to Azure DevOps themes

## 🚀 Quick Start

### Installation

1. Visit the [Azure DevOps Marketplace](https://marketplace.visualstudio.com/azuredevops)
2. Search for "ADO Mermaid Viewer" by wallon-qodo
3. Click **Get it free** and select your organization
4. Follow the installation prompts

### Usage

Simply add Mermaid diagrams to your Markdown files using fenced code blocks:

\`\`\`\`markdown
\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Check docs]
    D --> A
\`\`\`
\`\`\`\`

The diagram will automatically render when you view the Markdown file in Azure Repos.

### More Examples

**Sequence Diagram:**
\`\`\`\`markdown
\`\`\`mermaid
sequenceDiagram
    participant User
    participant API
    participant Database
    
    User->>API: Request data
    API->>Database: Query
    Database-->>API: Results
    API-->>User: Response
\`\`\`
\`\`\`\`

**Gantt Chart:**
\`\`\`\`markdown
\`\`\`mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Design           :a1, 2024-01-01, 30d
    Development      :after a1, 60d
    section Phase 2
    Testing          :2024-03-15, 20d
    Deployment       :2024-04-05, 10d
\`\`\`
\`\`\`\`

**Table Support:**
\`\`\`markdown
| Feature | Status | Notes |
|---------|--------|-------|
| Diagrams | ✅ | Fully supported |
| Tables | ✅ | GFM compatible |
| Styling | ✅ | Professional look |
\`\`\`

## 🛠️ Development

### Prerequisites

- Node.js 16+ and npm
- Azure DevOps account for testing

### Local Development

\`\`\`bash
# Clone the repository
git clone https://github.com/wallon-qodo/ado-mermaid-viewer.git
cd ado-mermaid-viewer

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
\`\`\`

**Or use the Makefile for convenience:**

\`\`\`bash
# Install dependencies
make install

# Start development server
make dev

# Run tests
make test

# Run tests in watch mode
make test-watch

# Build for production
make build

# Package extension
make package

# Clean build artifacts
make clean

# Show all available commands
make help
\`\`\`

### Project Structure

\`\`\`
ado-mermaid-viewer/
├── src/
│   ├── index.js          # Extension entry point
│   └── viewer.js         # Markdown/Mermaid renderer
├── marketplace/
│   ├── changelog.md      # Version history
│   └── logo.png          # Extension icon
├── tests/
│   └── viewer.test.js    # Unit tests
├── index.html            # Renderer template
├── webpack.config.js     # Build configuration
├── vss-extension.json    # Extension manifest
└── package.json          # Dependencies
\`\`\`

### Testing

The extension includes comprehensive unit tests:

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
\`\`\`

### Building

To create a production build:

\`\`\`bash
# Build and package extension
npm run build

# This creates a .vsix file ready for publishing
\`\`\`

## 📚 Documentation

### Configuration

No configuration needed! The extension works automatically once installed.

### Troubleshooting

**Diagrams not rendering?**
- Ensure your code block uses the \`mermaid\` language identifier
- Check that your Mermaid syntax is valid
- Try refreshing the page

**Tables not formatting correctly?**
- Verify your table syntax follows GFM standards
- Ensure proper spacing around pipes (\`|\`)

### Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 Changelog

See [CHANGELOG.md](marketplace/changelog.md) for version history and release notes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Forked from [rafaelprd/azure-devops-markdown-mermaid](https://github.com/rafaelprd/azure-devops-markdown-mermaid) - Original concept and implementation
- Built with [Mermaid.js](https://mermaid.js.org/) - The incredible diagramming library
- Markdown parsing powered by [Marked](https://marked.js.org/)
- Azure DevOps Extension SDK by Microsoft

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/wallon-qodo/ado-mermaid-viewer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/wallon-qodo/ado-mermaid-viewer/discussions)

## ⭐ Show Your Support

If you find this extension helpful, please consider:
- ⭐ Starring the repository
- 📢 Sharing with your team
- 💬 Leaving a review on the marketplace
- 🐛 Reporting bugs or suggesting features

---

[Marketplace](https://marketplace.visualstudio.com/items?itemName=wallon-qodo.ado-mermaid-viewer) • [GitHub](https://github.com/wallon-qodo/ado-mermaid-viewer) • [Issues](https://github.com/wallon-qodo/ado-mermaid-viewer/issues)
