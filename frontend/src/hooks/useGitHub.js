import { useState } from 'react';
import githubAPI from '../services/github/api.js';
import { downloadZip } from '../services/export/zipper.js';
import { deployToGitHub } from '../services/export/deployer.js';
import { processTemplateFiles } from '../services/template/renderer.js';

export const useGitHub = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = () => {
    return githubAPI.isAuthenticated();
  };

  const getUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await githubAPI.getUser();
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const repos = await githubAPI.getUserRepositories();
      return repos;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const exportAsZip = async (templateFiles, formData, filename, templateType = 'html') => {
    try {
      setLoading(true);
      setError(null);
      
      // Process files with user data
      const processedFiles = processTemplateFiles(templateFiles, formData);
      
      // Download as ZIP
      const result = await downloadZip(processedFiles, formData, filename, templateType);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const exportToGitHub = async (templateFiles, formData, repoName, templateType = 'html') => {
    try {
      if (!isAuthenticated()) {
        throw new Error('Please login with GitHub first');
      }

      setLoading(true);
      setError(null);
      
      // Process files with user data
      const processedFiles = processTemplateFiles(templateFiles, formData);
      
      // Deploy to GitHub
      const result = await deployToGitHub(processedFiles, formData, repoName, templateType);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isAuthenticated,
    getUser,
    getUserRepositories,
    exportAsZip,
    exportToGitHub
  };
};

export default useGitHub;
