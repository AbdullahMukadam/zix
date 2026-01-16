import { createAndPushTemplate } from '../github/repository.js';
import { generateReadme } from '../template/builder.js';

export const deployToGitHub = async (files, userData, repoName, templateType = 'html') => {
  try {
    // Generate README for HTML template
    const readme = generateReadme({ name: 'HTML Template', type: 'html' }, userData);
    const filesWithReadme = [
      ...files,
      {
        path: 'README.md',
        content: readme
      }
    ];
    
    // Create repository and push files
    const result = await createAndPushTemplate(
      filesWithReadme,
      repoName,
      userData.bio || 'Website created with Zix (HTML Template)'
    );
    
    return result;
  } catch (error) {
    console.error('Error deploying to GitHub:', error);
    throw error;
  }
};

export const getDeploymentInstructions = (repoUrl, templateType = 'html') => {
  return {
    github: `Your code has been pushed to: ${repoUrl}`,
    githubPages: `
To deploy to GitHub Pages:
1. Go to your repository Settings
2. Click on Pages in the sidebar
3. Select branch and folder
4. Your site will be live at username.github.io/repo-name
`,
    netlify: `
To deploy to Netlify:
1. Go to netlify.com and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Click "Deploy site"
`,
    vercel: `
To deploy to Vercel:
1. Go to vercel.com and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click "Deploy"
`
  };
};
