# 🚀 CI/CD Pipeline Documentation

This repository includes a comprehensive CI/CD pipeline setup using GitHub Actions for automated testing, building, and deployment.

## 📋 Available Workflows

### 1. **Main CI/CD Pipeline** (`.github/workflows/ci.yml`)
- **Triggers**: Push to `main`, `develop`, PRs to `main`
- **Features**:
  - ✅ Automated testing with Vitest
  - 🏗️ Build verification
  - 🔍 ESLint code quality checks
  - 📊 Test coverage reporting
  - 💬 Automatic PR comments with test results
  - 🏷️ Status badges for repository

### 2. **Release Pipeline** (`.github/workflows/release.yml`)
- **Triggers**: Manual dispatch, Git tags (`v*`)
- **Features**:
  - 🔖 Automated version management
  - 📝 Changelog generation from git commits
  - 📦 Build artifacts (tar.gz, zip)
  - 🚀 GitHub Pages deployment
  - 📋 Release notes creation
  - 🎯 Production-ready builds

### 3. **Pre-release Pipeline** (`.github/workflows/pre-release.yml`)
- **Triggers**: Push to feature branches (`feature/*`, `develop`)
- **Features**:
  - 🧪 Development branch testing
  - 📅 Timestamp-based versioning
  - 🧹 Automatic cleanup of old pre-releases
  - 📦 Development artifacts
  - 🔄 Continuous integration for development

### 4. **Version Bump** (`.github/workflows/version-bump.yml`)
- **Triggers**: Manual dispatch with version type selection
- **Features**:
  - 📈 Semantic version bumping (patch/minor/major)
  - 🔀 Pre-release versioning (alpha/beta/rc)
  - 📝 Automatic CHANGELOG.md updates
  - 🔄 Pull request creation for review
  - ✨ Automated commit messages

### 5. **Deployment Status** (`.github/workflows/deployment-status.yml`)
- **Triggers**: Deployment events, workflow completions
- **Features**:
  - 📊 Deployment status tracking
  - 🎉 Success notifications
  - ❌ Failure alerts with troubleshooting
  - 🔗 Live URL notifications

## 🎯 Quick Start Guide

### Setting Up the Pipeline

1. **Enable GitHub Actions**:
   - Go to repository Settings → Actions → General
   - Allow "Read and write permissions" for GITHUB_TOKEN

2. **Configure GitHub Pages**:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - This enables automatic deployment

3. **Repository Secrets** (Optional):
   - All workflows use the default `GITHUB_TOKEN`
   - No additional secrets required for basic setup

### Creating Your First Release

1. **Version Bump**:
   ```bash
   # Option 1: Use GitHub UI
   Go to Actions → Version Bump → Run workflow
   Select version type (patch/minor/major)
   
   # Option 2: Manual tag
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Review and Merge**:
   - Version bump creates a PR automatically
   - Review changes in CHANGELOG.md
   - Merge the PR

3. **Create Release**:
   - Go to Actions → Release → Run workflow
   - Or push a tag to trigger automatically

## 📊 Status Badges

Add these badges to your README.md:

```markdown
![CI](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)
![Release](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/release.yml/badge.svg)
![License](https://img.shields.io/github/license/YOUR_USERNAME/YOUR_REPO)
![Version](https://img.shields.io/github/v/release/YOUR_USERNAME/YOUR_REPO)
```

## 🔧 Workflow Details

### Test Pipeline Features

- **Parallel Testing**: Tests run on multiple Node.js versions
- **Coverage Reports**: Automatically generated and commented on PRs
- **Failure Notifications**: Detailed error reporting in PR comments
- **Cache Optimization**: npm dependencies cached for faster builds

### Release Features

- **Semantic Versioning**: Automatic version detection from tags
- **Changelog Generation**: Git commits automatically formatted
- **Multi-format Artifacts**: Both tar.gz and zip distributions
- **GitHub Pages**: Automatic deployment with custom domain support
- **Release Notes**: Formatted release descriptions

### Security Features

- **Minimal Permissions**: Each job has specific permission scopes
- **Token Security**: Uses GitHub's built-in GITHUB_TOKEN
- **Dependency Security**: npm audit checks in CI pipeline
- **Build Verification**: All artifacts verified before deployment

## 🛠️ Customization

### Modifying Test Configuration

Edit `.github/workflows/ci.yml`:
```yaml
# Add more Node.js versions
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]

# Add more test commands
- name: Run additional tests
  run: npm run test:e2e
```

### Customizing Release Process

Edit `.github/workflows/release.yml`:
```yaml
# Change deployment target
- name: Deploy to custom server
  run: |
    # Your custom deployment script
    ./deploy.sh
```

### Adding Environment Variables

```yaml
env:
  NODE_ENV: production
  API_URL: ${{ secrets.API_URL }}
```

## 🚨 Troubleshooting

### Common Issues

1. **Tests Failing**:
   - Check test logs in Actions tab
   - Verify all dependencies are installed
   - Ensure test files are properly configured

2. **Deployment Failures**:
   - Verify GitHub Pages is enabled
   - Check repository permissions
   - Ensure build artifacts are generated

3. **Version Bump Issues**:
   - Verify package.json exists
   - Check Git permissions
   - Ensure CHANGELOG.md format is correct

### Debug Mode

Add this to any workflow for verbose logging:
```yaml
env:
  ACTIONS_STEP_DEBUG: true
```

## 📈 Monitoring and Analytics

### GitHub Insights

- View workflow runs in Actions tab
- Monitor deployment frequency
- Track test success rates
- Analyze build times

### Performance Optimization

- Use dependency caching
- Parallel job execution
- Minimal artifact sizes
- Efficient Docker layers (if using containers)

## 🤝 Contributing

When contributing to this repository:

1. Create feature branches: `feature/your-feature-name`
2. All PRs trigger automated testing
3. Ensure tests pass before requesting review
4. Follow semantic commit messages for changelog generation

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**💡 Tip**: This pipeline is designed to be zero-configuration. Just push your code and let GitHub Actions handle the rest!
