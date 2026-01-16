import githubAPI from './api.js';

export const createAndPushTemplate = async (
  templateFiles,
  repoName,
  description = 'Created with Zix'
) => {
  try {
    // Step 1: Create new repository
    const repo = await githubAPI.createRepo(repoName, description, false);
    
    // Step 2: Get authenticated user
    const user = await githubAPI.getUser();
    
    // Step 3: Upload all files
    const uploadPromises = templateFiles.map(file =>
      githubAPI.uploadFile(
        user.login,
        repoName,
        file.path,
        file.content,
        `Add ${file.path}`
      )
    );
    
    await Promise.all(uploadPromises);
    
    return {
      success: true,
      repoUrl: repo.html_url,
      repoName: repo.name,
      owner: user.login
    };
  } catch (error) {
    console.error('Error creating and pushing template:', error);
    throw error;
  }
};

export const pushToExistingRepo = async (
  templateFiles,
  owner,
  repoName
) => {
  try {
    const uploadPromises = templateFiles.map(file =>
      githubAPI.uploadFile(
        owner,
        repoName,
        file.path,
        file.content,
        `Update ${file.path}`
      )
    );
    
    await Promise.all(uploadPromises);
    
    return {
      success: true,
      repoUrl: `https://github.com/${owner}/${repoName}`,
      repoName,
      owner
    };
  } catch (error) {
    console.error('Error pushing to existing repo:', error);
    throw error;
  }
};
