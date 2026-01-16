import { useState, useEffect } from 'react';
import templatesRegistry from '../config/templates.json';
import { fetchTemplateConfig, fetchAllTemplateContent } from '../services/github/templateFetcher.js';
import { cacheTemplate, getCachedTemplate } from '../utils/storage.js';

export const useTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ category: 'all', type: 'all' });

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      // Load templates from config
      const enabledTemplates = templatesRegistry.templates.filter(t => t.enabled);
      setTemplates(enabledTemplates);
      setError(null);
    } catch (err) {
      setError('Failed to load templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTemplateById = (id) => {
    return templates.find(t => t.id === id);
  };

  const getFilteredTemplates = () => {
    return templates.filter(template => {
      const categoryMatch = filter.category === 'all' || template.category === filter.category;
      const typeMatch = filter.type === 'all' || template.type === filter.type;
      return categoryMatch && typeMatch;
    });
  };

  const getFeaturedTemplates = () => {
    return templates.filter(t => t.featured);
  };

  const getTemplatesByCategory = (category) => {
    return templates.filter(t => t.category === category);
  };

  return {
    templates,
    filteredTemplates: getFilteredTemplates(),
    featuredTemplates: getFeaturedTemplates(),
    loading,
    error,
    filter,
    setFilter,
    getTemplateById,
    getTemplatesByCategory,
    reload: loadTemplates
  };
};

export const useTemplateData = (templateId) => {
  const [config, setConfig] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (templateId) {
      loadTemplateData();
    }
  }, [templateId]);

  const loadTemplateData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = getCachedTemplate(templateId);
      if (cached) {
        setConfig(cached.config);
        setFiles(cached.files);
        setLoading(false);
        return;
      }

      // Load template info
      const template = templatesRegistry.templates.find(t => t.id === templateId);
      if (!template) {
        throw new Error('Template not found');
      }

      // Fetch config and files
      const [templateConfig, templateFiles] = await Promise.all([
        fetchTemplateConfig(template.repoUrl, template.branch, template.folder),
        fetchAllTemplateContent(template.repoUrl, template.branch, template.folder)
      ]);

      setConfig(templateConfig);
      setFiles(templateFiles);

      // Cache the data
      cacheTemplate(templateId, { config: templateConfig, files: templateFiles });
    } catch (err) {
      setError(err.message || 'Failed to load template data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    config,
    files,
    loading,
    error,
    reload: loadTemplateData
  };
};
