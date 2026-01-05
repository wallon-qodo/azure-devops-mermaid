.PHONY: help install dev test test-watch build package clean lint format publish

# Default target
.DEFAULT_GOAL := help

# Colors for terminal output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)ADO Mermaid Viewer - Available Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

install: ## Install all dependencies
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

dev: ## Start development server
	@echo "$(BLUE)Starting development server...$(NC)"
	npm run dev

test: ## Run tests
	@echo "$(BLUE)Running tests...$(NC)"
	npm test

test-watch: ## Run tests in watch mode
	@echo "$(BLUE)Running tests in watch mode...$(NC)"
	npm run test:watch

build: ## Build the extension for production
	@echo "$(BLUE)Building extension...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete: ADOMermaidViewer.ado-mermaid-viewer-2.0.1.vsix$(NC)"

package: build ## Build and package the extension (alias for build)
	@echo "$(GREEN)✓ Extension packaged$(NC)"

clean: ## Clean build artifacts and dependencies
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	rm -rf dist/
	rm -rf node_modules/
	rm -f *.vsix
	rm -rf coverage/
	@echo "$(GREEN)✓ Clean complete$(NC)"

clean-build: ## Clean only build artifacts (keep node_modules)
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	rm -rf dist/
	rm -f *.vsix
	rm -rf coverage/
	@echo "$(GREEN)✓ Build artifacts cleaned$(NC)"

reinstall: clean install ## Clean and reinstall dependencies
	@echo "$(GREEN)✓ Reinstall complete$(NC)"

lint: ## Run linter (if configured)
	@echo "$(BLUE)Running linter...$(NC)"
	@echo "$(YELLOW)Note: Linter not configured yet$(NC)"

format: ## Format code (if configured)
	@echo "$(BLUE)Formatting code...$(NC)"
	@echo "$(YELLOW)Note: Formatter not configured yet$(NC)"

publish: build ## Build and publish to marketplace (requires PAT)
	@echo "$(BLUE)Publishing extension...$(NC)"
	@if [ -z "$(PAT)" ]; then \
		echo "$(RED)Error: PAT token required. Usage: make publish PAT=your_token$(NC)"; \
		exit 1; \
	fi
	tfx extension publish --publisher ADOMermaidViewer --token $(PAT) --vsix ADOMermaidViewer.ado-mermaid-viewer-2.0.1.vsix
	@echo "$(GREEN)✓ Extension published$(NC)"

update-version: ## Update version number (usage: make update-version VERSION=2.0.2)
	@if [ -z "$(VERSION)" ]; then \
		echo "$(RED)Error: VERSION required. Usage: make update-version VERSION=2.0.2$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)Updating version to $(VERSION)...$(NC)"
	@sed -i '' 's/"version": "[^"]*"/"version": "$(VERSION)"/' package.json
	@sed -i '' 's/"version": "[^"]*"/"version": "$(VERSION)"/' vss-extension.json
	@sed -i '' 's/v[0-9]\+\.[0-9]\+\.[0-9]\+/v$(VERSION)/g' Makefile
	@sed -i '' 's/ado-mermaid-viewer-[0-9]\+\.[0-9]\+\.[0-9]\+/ado-mermaid-viewer-$(VERSION)/g' Makefile
	@echo "$(GREEN)✓ Version updated to $(VERSION) in package.json, vss-extension.json, and Makefile$(NC)"
	@echo "$(YELLOW)⚠ Don't forget to update marketplace/changelog.md$(NC)"

check: ## Check if extension can be built
	@echo "$(BLUE)Checking project health...$(NC)"
	@npm list --depth=0 2>/dev/null || true
	@echo ""
	@if [ -f "ADOMermaidViewer.ado-mermaid-viewer-2.0.1.vsix" ]; then \
		echo "$(GREEN)✓ Extension package exists$(NC)"; \
		ls -lh ADOMermaidViewer.ado-mermaid-viewer-2.0.1.vsix; \
	else \
		echo "$(YELLOW)⚠ Extension package not built yet. Run 'make build'$(NC)"; \
	fi

info: ## Show project information
	@echo "$(BLUE)ADO Mermaid Viewer v2.0.1$(NC)"
	@echo ""
	@echo "Publisher:    ADOMermaidViewer"
	@echo "Extension ID: ado-mermaid-viewer"
	@echo "License:      MIT"
	@echo ""
	@echo "Repository:   https://github.com/wallon-qodo/ado-mermaid-viewer"
	@echo "Marketplace:  https://marketplace.visualstudio.com/items?itemName=ADOMermaidViewer.ado-mermaid-viewer"

setup-tfx: ## Install TFX CLI globally
	@echo "$(BLUE)Installing TFX CLI...$(NC)"
	npm install -g tfx-cli
	@echo "$(GREEN)✓ TFX CLI installed$(NC)"

# Development workflow shortcuts
quick-test: ## Quick test (no coverage)
	@echo "$(BLUE)Running quick tests...$(NC)"
	npm test -- --no-coverage

watch: dev ## Alias for dev (start development server)

serve: dev ## Alias for dev (start development server)
