# Contributing to Zix

First off, thank you for considering contributing to Zix! It's people like you that make Zix such a great tool for the developer community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Adding New Components](#adding-new-components)
- [Adding New Templates](#adding-new-templates)
- [Commit Message Guidelines](#commit-message-guidelines)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [your-email@example.com].

### Our Standards

- **Be respectful** of differing viewpoints and experiences
- **Give and accept** constructive feedback gracefully
- **Focus on what is best** for the community
- **Show empathy** towards other community members

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 2.0.0]
```

### Suggesting Features

Feature requests are welcome! Please provide:

**Feature Request Template:**
```markdown
## Feature Description
A clear description of the feature.

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Solution
How do you envision this feature working?

## Alternatives
Any alternative solutions you've considered.
```

### Adding Showcase Components

We're always looking for creative, interactive components! See [Adding New Components](#adding-new-components) below.

### Adding Portfolio Templates

Contribute new portfolio templates! See [Adding New Templates](#adding-new-templates) below.

### Improving Documentation

Documentation improvements are highly valued! This includes:
- Fixing typos
- Clarifying explanations
- Adding examples
- Translating documentation

---

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

### Setup Steps

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Zix.git
   cd Zix
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/AbdullahMukadam/Zix.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/my-new-feature
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Make your changes** and test thoroughly

8. **Run linter**
   ```bash
   npm run lint
   ```

9. **Build to verify**
   ```bash
   npm run build
   ```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] You've tested your changes locally
- [ ] You've updated documentation if needed
- [ ] Linter passes without errors
- [ ] Build succeeds without errors
- [ ] Commit messages follow our conventions

### Submitting a PR

1. **Update your fork**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/my-new-feature
   ```

3. **Create Pull Request** on GitHub

4. **Fill out the PR template** completely

5. **Wait for review** - maintainers will review your PR

6. **Address feedback** if requested

7. **Celebrate!** Your PR is merged

### PR Template

```markdown
## Description
Briefly describe what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #(issue number)

## Screenshots (if applicable)
Add screenshots to demonstrate the changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed my code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests (if applicable)
- [ ] All tests passing
```

---

## Style Guidelines

### JavaScript/React

- Use **functional components** with hooks
- Use **ES6+ syntax** (arrow functions, destructuring, etc.)
- Follow **Airbnb JavaScript Style Guide** principles
- Use **meaningful variable names**
- Keep components **small and focused**
- Avoid **prop drilling** - use Context when needed

#### Example

```javascript
const MyComponent = ({ title, description }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div className="p-4">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

// Bad
function mycomponent(props) {
  var active = false;
  return <div><h2>{props.title}</h2></div>;
}
```

### CSS/Tailwind

- Use **Tailwind utility classes** when possible
- Follow **mobile-first** approach
- Use **consistent spacing** (multiples of 4px)
- Prefer **Tailwind colors** over custom colors
- Group classes logically: layout → spacing → colors → effects

#### Example

```jsx
// Good - Logical grouping
<div className="flex items-center gap-4 p-6 bg-black border border-white/10 rounded-xl hover:border-white/20 transition-colors">

// Bad - Random order
<div className="hover:border-white/20 flex bg-black p-6 transition-colors border-white/10 border rounded-xl items-center gap-4">
```

### File Naming

- **Components**: `PascalCase.jsx` (e.g., `ShowcaseCard.jsx`)
- **Utilities**: `camelCase.js` (e.g., `utils.js`)
- **Data files**: `camelCase.js` (e.g., `components.js`)
- **Pages**: `PascalCase.jsx` (e.g., `LandingPage.jsx`)

---

## Adding New Components

### Showcase Component Structure

1. **Create the component**

```javascript
// src/Components/showcase/previews/MyAwesomeComponent.jsx
import { motion } from 'framer-motion';

const MyAwesomeComponent = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white"
    >
      <h3 className="text-2xl font-bold">Awesome!</h3>
    </motion.div>
  );
};

export default MyAwesomeComponent;
```

2. **Register in the registry**

```javascript
// src/Components/showcase/previews/registry.js
import MyAwesomeComponent from './MyAwesomeComponent';

const previewRegistry = {
  'my-awesome-component': MyAwesomeComponent,
  // ... other components
};
```

3. **Add component data**

```javascript
// src/data/showcase/components.js
{
  id: 'my-awesome-component',
  title: 'My Awesome Component',
  description: 'A component that does awesome things',
  category: 'creative',
  framework: 'react-framer',
  tags: ['hover', 'gradient', 'animation'],
  dependencies: ['framer-motion'],
  code: {
    jsx: `import { motion } from 'framer-motion';

export default function MyAwesomeComponent() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white"
    >
      <h3 className="text-2xl font-bold">Awesome!</h3>
    </motion.div>
  );
}`,
    css: null,
    html: null
  }
}
```

---

## Adding New Templates

### Template Repository Structure

```
your-template/
├── index.html              # Main HTML file (required)
├── style.css              # Styles (optional)
├── script.js              # JavaScript (optional)
├── template.config.json   # Template configuration (required)
├── preview.png            # Thumbnail (recommended)
└── README.md              # Template documentation (optional)
```

### Template Config Example

```json
{
  "id": "modern-portfolio",
  "name": "Modern Portfolio",
  "description": "A sleek, modern portfolio template",
  "category": "portfolio",
  "type": "html",
  "version": "1.0.0",
  "author": "Your Name",
  "formConfig": {
    "steps": [
      {
        "id": 1,
        "title": "Personal Info",
        "description": "Enter your details",
        "fields": [
          {
            "name": "name",
            "label": "Full Name",
            "type": "text",
            "required": true,
            "placeholder": "John Doe",
            "default": "Your Name"
          }
        ]
      }
    ]
  }
}
```

### Using Placeholders

In your HTML, use `{{fieldName}}` syntax:

```html
<!DOCTYPE html>
<html>
<head>
  <title>{{name}}'s Portfolio</title>
</head>
<body>
  <h1>{{name}}</h1>
  <p>{{bio}}</p>
</body>
</html>
```

---

## Commit Message Guidelines

We follow **Conventional Commits** specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(showcase): add magnetic button component"

# Bug fix
git commit -m "fix(editor): resolve preview not updating on input change"

# Documentation
git commit -m "docs(readme): add installation steps for Windows"

# Refactor
git commit -m "refactor(components): extract common card styles"

# Chore
git commit -m "chore(deps): update framer-motion to v12"
```

### Detailed Commit

```
feat(showcase): add spotlight card component

- Add interactive spotlight effect on mouse move
- Include live preview in showcase gallery
- Add code examples for JSX and CSS

Closes #42
```

---

## Questions?

- **General questions**: Open a [Discussion](https://github.com/AbdullahMukadam/Zix/discussions)
- **Bug reports**: Open an [Issue](https://github.com/AbdullahMukadam/Zix/issues)
- **Security issues**: Email directly (don't create public issue)

---

## Recognition

Contributors will be added to our [Contributors](https://github.com/AbdullahMukadam/Zix/graphs/contributors) page and mentioned in release notes.

---

<div align="center">

**Thank you for contributing to Zix!**

</div>
