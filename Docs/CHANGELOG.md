# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-08-29

### Added
- Centralized page title configuration using `PAGE_TITLE` constant from Config.ts
- Responsive contact page layout that adapts when contact form is disabled
- Extracted contact cards into reusable `ContactCards` component
- Enhanced code organization with better component structure

### Changed
- Refactored all hardcoded "SecCodeSmith" references to use `PAGE_TITLE` constant
- Improved contact page layout for better user experience when form is disabled
- Updated component imports to use centralized configuration
- Enhanced maintainability through consistent title management

### Fixed
- Contact page layout issues when contact form is disabled via configuration
- Responsive design improvements for contact cards
- Consistent branding across all components and pages

### Technical Improvements
- Better separation of concerns with extracted components
- Centralized configuration management
- Improved type safety with consistent imports
- Enhanced code maintainability and reusability

## [0.1.0] - Initial Release

### Added
- Initial portfolio website with fantasy blacksmith theme
- React + TypeScript + Vite setup
- Responsive design with SCSS
- Portfolio sections: Home, About, Projects, Blog, Contact
- Dynamic content loading from JSON data
- Contact form with validation
- Project showcase with modal details
- Blog system with categories and tags
- Skills showcase with interactive cards
- Social media integration
- SEO optimized structure
