# Version Management Guide

## Quick Version Update

To update the version for a new release:

```bash
make update-version VERSION=X.Y.Z
```

This automatically updates:
- `package.json`
- `vss-extension.json`
- `Makefile` (all version references)

Then rebuild:
```bash
make build
```

## Version Numbering (Semantic Versioning)

Follow semantic versioning: `MAJOR.MINOR.PATCH`

### When to Increment:

- **MAJOR** (X.0.0): Breaking changes
  - Changed syntax requirements
  - Removed features
  - Major architecture changes

- **MINOR** (2.X.0): New features (backward compatible)
  - Added diagram types
  - New configuration options
  - Enhanced functionality

- **PATCH** (2.0.X): Bug fixes (backward compatible)
  - Fixed rendering issues
  - Performance improvements
  - Security patches

## Current Version: 2.0.1

### Changelog for 2.0.1:
- Added console debug logging for troubleshooting
- Improved renderer priority configuration
- Fixed diagram rendering initialization
- Enhanced error handling

## Release Checklist

Before each release:

1. ✅ Update version: `make update-version VERSION=X.Y.Z`
2. ✅ Update `marketplace/changelog.md` with changes
3. ✅ Build extension: `make build`
4. ✅ Test locally: `make dev`
5. ✅ Run tests: `make test`
6. ✅ Upload to marketplace
7. ✅ Tag git release: `git tag vX.Y.Z && git push origin vX.Y.Z`

## Auto Version Detection

The build system automatically includes the version in:
- Extension filename: `ADOMermaidViewer.ado-mermaid-viewer-X.Y.Z.vsix`
- Extension manifest
- Marketplace display
- GitHub releases
