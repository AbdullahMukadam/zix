# Zix

<div align="center">

![Zix Banner](https://via.placeholder.com/1200x400/020202/FFFFFF?text=ZIX+-+The+Developer+Ecosystem)

**The all-in-one developer ecosystem. Build portfolios, generate CSS, explore UI components, and ship faster.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](package.json)

[Live Demo](https://zix.dev) · [Report Bug](https://github.com/AbdullahMukadam/Zix/issues) · [Request Feature](https://github.com/AbdullahMukadam/Zix/issues)

</div>

---

## Features

### Portfolio Builder
- **Template System**: Choose from curated, production-ready HTML templates
- **Live Customization**: Real-time preview with dynamic placeholder replacement
- **One-Click Deploy**: Export as ZIP or deploy directly to GitHub
- **Folder-Based Templates**: Support for multi-template repositories

### CSS Tools
- **Gradient Generator**: Create beautiful CSS gradients with live preview
- **Box Shadow Generator**: Design layered shadows with visual controls
- **Layout Generator**: Build responsive layouts with CSS Grid and Flexbox

### Component Showcase
- **Live Interactive Demos**: Real components powered by React, Framer Motion, and GSAP
- **Multi-Framework Support**: Components available for React, Tailwind, and vanilla HTML/CSS
- **Copy-Paste Ready**: One-click code copying for instant integration
- **Categories**: Buttons, Cards, Creative effects, and more

### UI Component Library
- **Tailwind Components**: Modern, responsive components using Tailwind CSS
- **CSS Components**: Pure CSS implementations for framework-free projects
- **Searchable & Filterable**: Find exactly what you need instantly

### Productivity Hub
- **Curated Tools**: Hand-picked developer resources and utilities
- **Categorized**: Design tools, icons, generators, and learning resources
- **External Links**: Direct access to the best tools on the web

---

## Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbdullahMukadam/Zix.git
   cd Zix
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your GitHub OAuth credentials (optional, for deployment features):
   ```env
   VITE_GITHUB_CLIENT_ID=your_github_client_id
   VITE_GITHUB_REDIRECT_URI=http://localhost:5173/auth/callback
   VITE_BACKEND_GITHUB_URL=your_backend_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
Zix/
├── src/
│   ├── Components/          # React components
│   │   ├── common/          # Shared components (SEO, etc.)
│   │   ├── editor/          # Template editor components
│   │   ├── forms/           # Dynamic form system
│   │   ├── layout/          # Header, Footer
│   │   ├── showcase/        # Showcase card & code block
│   │   │   └── previews/    # Live component previews
│   │   ├── templates/       # Template gallery
│   │   ├── tools/           # CSS generator tools
│   │   └── ui-library/      # UI component library
│   ├── context/             # React Context (Auth, Templates)
│   ├── data/                # Static data & configs
│   │   ├── components/      # UI library data
│   │   ├── productivity/    # Tools data
│   │   └── showcase/        # Showcase components data
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities (cn helper, etc.)
│   ├── pages/               # Route pages
│   ├── services/            # API & business logic
│   │   ├── export/          # ZIP & deployment
│   │   ├── github/          # GitHub API integration
│   │   └── template/        # Template processing
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies & scripts
└── README.md                # You are here
```

---

## Tech Stack

### Core
- **React 18.3** - UI library
- **Vite 5.4** - Build tool & dev server
- **React Router 6** - Client-side routing
- **Zustand** - State management

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **shadcn/ui** - Component system

### APIs & Integrations
- **GitHub API** - OAuth & repository management
- **Octokit** - GitHub REST API client
- **JSZip** - Archive creation for downloads

### Animation & Effects
- **GSAP** - Advanced animations
- **Framer Motion** - React animations

### Developer Experience
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Deployment

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AbdullahMukadam/Zix)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AbdullahMukadam/Zix)

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure environment variables on your hosting platform

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

-  **Report bugs** - [Open an issue](https://github.com/AbdullahMukadam/Zix/issues)
-  **Suggest features** - [Open a feature request](https://github.com/AbdullahMukadam/Zix/issues)
-  **Improve documentation** - Submit PRs for README or docs
-  **Add components** - Create new showcase components
-  **Fix issues** - Check out [good first issues](https://github.com/AbdullahMukadam/Zix/labels/good%20first%20issue)
-  **Add templates** - Contribute new portfolio templates

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Adding New Components

### Showcase Components

To add a new interactive component to the Showcase:

1. **Create the component file**
   ```bash
   src/Components/showcase/previews/MyComponent.jsx
   ```

2. **Register in the registry**
   ```javascript
   // src/Components/showcase/previews/registry.js
   import MyComponent from './MyComponent';
   
   const previewRegistry = {
     'my-component': MyComponent,
     // ... other components
   };
   ```

3. **Add data entry**
   ```javascript
   // src/data/showcase/components.js
   {
     id: 'my-component',
     title: 'My Component',
     description: 'An awesome new component',
     category: 'creative',
     framework: 'react-framer',
     tags: ['animation', 'interactive'],
     dependencies: ['framer-motion'],
     code: {
       jsx: `// Your component code here`,
       css: null,
       html: null
     }
   }
   ```

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Author

**Abdullah Mukadam**

- GitHub: [@AbdullahMukadam](https://github.com/AbdullahMukadam)
- Twitter: [@abd_mukadam](https://twitter.com/abd_mukadam)

---

## Acknowledgments

- **Tailwind CSS** - For the amazing utility-first framework
- **Framer Motion** - For smooth animations
- **GSAP** - For advanced animation capabilities
- **shadcn/ui** - For the beautiful component system
- **Vercel** - For hosting and inspiration
- **The open-source community** - For inspiration and tools

---

## Project Stats

![GitHub stars](https://img.shields.io/github/stars/AbdullahMukadam/Zix?style=social)
![GitHub forks](https://img.shields.io/github/forks/AbdullahMukadam/Zix?style=social)
![GitHub issues](https://img.shields.io/github/issues/AbdullahMukadam/Zix)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AbdullahMukadam/Zix)

---

## Roadmap

- [ ] **More Templates** - Add 10+ new portfolio templates
- [ ] **Three.js Showcase** - Interactive 3D components
- [ ] **Animation Library** - Pre-built animation presets
- [ ] **CLI Tool** - Command-line interface for quick setup
- [ ] **VS Code Extension** - Component snippets
- [ ] **Dark/Light Mode** - Theme switching
- [ ] **Component Playground** - Live code editor
- [ ] **Export to CodePen** - Share components easily
- [ ] **Template Marketplace** - Community-submitted templates
- [ ] **API Documentation** - Full API reference

---

<div align="center">

**If you find this project helpful, please give it a star!**

Made with ❤️ by [Abdullah Mukadam](https://github.com/AbdullahMukadam)

</div>
