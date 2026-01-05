## [2.1.0] - 2026-01-05

### ✨ Added - NEW FEATURE
- **Pull Request Tab**: Added custom "Mermaid Diagrams" tab to pull requests
- Automatically extracts and renders Mermaid diagrams from PR descriptions
- Displays all diagrams in a dedicated, easy-to-view tab
- Works alongside the existing file viewer for `.md` files

### 🔧 Fixed
- Multi-entry webpack configuration for both file viewer and PR tab
- Proper Azure DevOps Git REST API integration for fetching PR data
- Graceful error handling when PR data cannot be accessed

### 📝 Technical Details
This release adds a second contribution type (`ms.vss-web.tab`) targeting `ms.vss-code-web.pr-tabs`. When viewing a pull request with Mermaid diagrams in the description (using ` ```mermaid ` code blocks), a new "Mermaid Diagrams" tab will appear. This addresses the use case of rendering diagrams typed directly into PR descriptions, similar to how GitHub natively supports Mermaid.

The extension now provides two ways to view Mermaid diagrams:
1. **File Viewer**: Renders `.md` files in repositories (existing functionality)
2. **PR Tab**: Extracts and displays diagrams from PR descriptions (new feature)

## [2.0.5] - 2026-01-05

### 🔧 Fixed
- **CRITICAL**: Added `await SDK.ready()` call after `SDK.init()` and before `SDK.register()`
- This ensures the SDK is fully initialized before registering the renderer

### 📝 Technical Details
The DanieleCas extension calls `await SDK.ready()` between init and register, which is required for proper extension initialization. Without this, Azure DevOps may not fully initialize the SDK context before registration, causing the extension to fail silently.

# Changelog

All notable changes to the Azure DevOps Mermaid extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.4] - 2026-01-05

### 🔧 Fixed
- **CRITICAL FIX**: Added `registeredObjectId` property matching SDK.register() ID
- Restored `mimeTypes: ["text/html"]` property (required for content renderers)
- Added `defaultBehavior: "showRenderedContent"` property
- Changed SDK.register() from empty string to `"mermaid_renderer"` matching manifest

### 📝 Technical Details
This release fixes the root cause by matching the configuration used by the working DanieleCas extension. The key issues were:
1. Missing `registeredObjectId` in manifest that matches the SDK.register() call
2. Incorrect assumption that `text/markdown` was needed (should be `text/html`)
3. Missing `defaultBehavior` property that tells Azure DevOps to show rendered content

These properties were incorrectly removed in previous versions based on incomplete documentation.

## [2.0.3] - 2026-01-05

### 🔧 Fixed
- Removed `baseUri` property that may have been causing resource resolution issues
- Removed `mimeTypes` property to rely solely on `fileExtensions` for content type detection
- Simplified manifest to minimal required properties for content renderer activation

### 📝 Technical Details
This release further simplifies the extension manifest by removing potentially problematic properties. Azure DevOps content renderers work best with minimal configuration, using only file extensions for matching rather than MIME types.

## [2.0.2] - 2026-01-05

### 🔧 Fixed
- Fixed content renderer registration by using empty string for SDK.register() to let manifest control binding
- Corrected MIME type from `text/html` to `text/markdown` in content renderer properties
- Added `baseUri` configuration to extension manifest root for proper resource resolution
- Removed non-standard properties (`supportedCapabilities`, `order`, `defaultBehavior`, `registeredObjectId`) that were preventing proper renderer activation
- Added proper `name` property to content renderer contribution

### 🛠️ Improved
- Enhanced debug logging with iframe detection to verify extension loading context
- More granular console output for SDK initialization steps
- Better diagnostic messages to identify if extension code is being executed

### 📝 Technical Details
This release addresses the root cause of the extension not being activated by Azure DevOps. The previous configuration used incorrect MIME types and non-standard properties that prevented the content renderer from being recognized and loaded by Azure DevOps.

## [2.0.1] - 2026-01-05

### 🔧 Fixed
- Added debug console logging for troubleshooting diagram rendering issues
- Improved content renderer priority configuration with `order: 100`
- Enhanced Mermaid initialization with better error handling
- Fixed async rendering with proper Promise handling in `Mermaid.run()`

### 🛠️ Improved
- Better diagnostic messages for debugging extension behavior
- More informative console output for developers
- Improved error reporting when diagrams fail to render

## [2.0.0] - 2025-10-02

### 🎉 Major Release - Complete Rewrite

This is a major release that completely modernizes the extension with breaking changes and significant improvements.

### ✨ Added
- **GitHub Flavored Markdown Support**: Full GFM compatibility including tables, task lists, and strikethrough
- **Professional Table Styling**: Beautiful table formatting with borders, headers, alternating rows, and hover effects
- **Mermaid v11**: Upgraded to the latest Mermaid.js version (11.12.0) with new diagram types and features
- **Modern Dependencies**: All packages updated to their latest stable versions
- **Enhanced Performance**: Optimized rendering and build process
- **Comprehensive Tests**: Added Jest testing framework with unit tests
- **Improved Documentation**: Complete rewrite of README and marketplace overview
- **Better Error Handling**: More robust error messages and graceful fallbacks

### 🔧 Changed
- **BREAKING**: Replaced CommonMark parser with Marked.js for better GFM support
- **BREAKING**: Minimum required browser versions updated for better performance
- Upgraded webpack from v5.90 to v5.102
- Upgraded webpack-cli from v5.1 to v6.0
- Upgraded webpack-dev-server from v5.0 to v5.2
- Upgraded Azure DevOps SDK from v4.0 to v4.1
- Renamed npm scripts: `serve` → `dev` for clarity
- Updated extension ID to `azure-devops-mermaid`
- Changed publisher from `talisca` to `jramos`
- Updated repository URLs to reflect new ownership

### 🔨 Fixed
- Tables now render correctly with proper HTML structure
- Improved Mermaid code block detection and parsing
- Better handling of special characters in markdown
- Fixed rendering issues with nested code blocks
- Resolved styling conflicts with Azure DevOps themes

### 📝 Documentation
- Completely rewritten README with examples and detailed usage
- New professional marketplace overview with feature highlights
- Added comprehensive troubleshooting guide
- Included contribution guidelines
- Added development setup instructions

### 🗑️ Removed
- Removed CommonMark dependency (replaced with Marked)
- Removed outdated build artifacts
- Cleaned up unused dev dependencies

---

## [1.0.1] - Previous Version

### Initial release from original author
- Basic Mermaid diagram rendering
- CommonMark markdown parsing
- Azure DevOps integration

---

## Upgrade Guide

### Migrating from 1.x to 2.0

The 2.0 release is a drop-in replacement with no configuration changes required. However, note these improvements:

**What stays the same:**
- All your existing Mermaid diagrams continue to work
- Same installation process
- No configuration changes needed

**What's better:**
- Tables now render beautifully (they may have been broken before)
- More Mermaid diagram types supported
- Better performance and reliability
- GFM features like task lists now work

**Action required:**
- None! Just update the extension and enjoy the improvements.

---

## Support

- Report bugs: [GitHub Issues](https://github.com/javiramos1/azure-devops-mermaid/issues)
- Feature requests: [GitHub Discussions](https://github.com/javiramos1/azure-devops-mermaid/discussions)
- Email: javier.ramos1@gmail.com

---

*For the complete list of changes, see the [commit history](https://github.com/javiramos1/azure-devops-mermaid/commits/main).*
