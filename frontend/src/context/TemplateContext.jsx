import React, { createContext, useContext, useState, useRef } from 'react';
import { saveDraft, getDraft, clearDraft } from '../utils/storage.js';
import { extractDefaultValues, mergeWithDefaults } from '../utils/templateHelpers.js';

const TemplateContext = createContext(null);

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within TemplateProvider');
  }
  return context;
};

export const TemplateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateConfig, setTemplateConfig] = useState(null);
  const [templateFiles, setTemplateFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  
  // Batching mechanism for form updates
  const updateBatchRef = useRef({});
  const batchTimeoutRef = useRef(null);

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentStep(1);
    
    // Load draft if exists
    const draft = getDraft(template.id);
    if (draft) {
      // If draft exists, use it (will be merged with defaults when config loads)
      setFormData(draft);
    } else {
      // No draft, will be populated with defaults when config loads
      setFormData({});
    }
  };

  const updateTemplateConfig = (config) => {
    setTemplateConfig(config);
    
    // Extract default values from the new config
    const defaults = extractDefaultValues(config);
    
    // Merge defaults with existing formData (existing data takes priority)
    setFormData(prev => {
      // If formData is empty, use defaults
      // If formData has values, keep them (user has already started editing)
      const hasExistingData = Object.keys(prev).length > 0;
      
      if (hasExistingData) {
        // Merge: keep existing user data, add defaults for missing fields
        return { ...defaults, ...prev };
      } else {
        // Use defaults for initial load
        return defaults;
      }
    });
  };

  const updateTemplateFiles = (files) => {
    setTemplateFiles(files);
  };

  /**
   * Flush batched updates to state
   */
  const flushFormUpdates = () => {
    if (Object.keys(updateBatchRef.current).length === 0) return;

    const batchedUpdates = { ...updateBatchRef.current };
    updateBatchRef.current = {};

    setFormData(prev => {
      const newData = { ...prev, ...batchedUpdates };
      // Auto-save draft
      if (selectedTemplate) {
        saveDraft(selectedTemplate.id, newData);
      }
      return newData;
    });
  };

  /**
   * Update form data with automatic batching
   * Multiple rapid calls will be batched into a single state update
   */
  const updateFormData = (data) => {
    // Add to batch
    Object.assign(updateBatchRef.current, data);

    // Clear existing timeout
    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current);
    }

    // Schedule flush after 16ms (one frame) for optimal batching
    batchTimeoutRef.current = setTimeout(flushFormUpdates, 16);
  };

  /**
   * Update a single field (uses batching internally)
   */
  const updateField = (fieldName, value) => {
    updateFormData({ [fieldName]: value });
  };

  /**
   * Force immediate update without batching
   */
  const updateFormDataImmediate = (data) => {
    // Cancel any pending batch
    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current);
      updateBatchRef.current = {};
    }

    setFormData(prev => {
      const newData = { ...prev, ...data };
      if (selectedTemplate) {
        saveDraft(selectedTemplate.id, newData);
      }
      return newData;
    });
  };

  const resetFormData = () => {
    // Clear any pending batched updates
    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current);
      updateBatchRef.current = {};
    }
    
    setFormData({});
    if (selectedTemplate) {
      clearDraft(selectedTemplate.id);
    }
  };

  const goToNextStep = () => {
    if (templateConfig && currentStep < templateConfig.formConfig.steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (templateConfig && step >= 1 && step <= templateConfig.formConfig.steps.length) {
      setCurrentStep(step);
    }
  };

  const clearTemplate = () => {
    // Clear any pending batched updates
    if (batchTimeoutRef.current) {
      clearTimeout(batchTimeoutRef.current);
      updateBatchRef.current = {};
    }
    
    setSelectedTemplate(null);
    setTemplateConfig(null);
    setTemplateFiles([]);
    setFormData({});
    setCurrentStep(1);
  };

  const value = {
    selectedTemplate,
    templateConfig,
    templateFiles,
    formData,
    currentStep,
    selectTemplate,
    updateTemplateConfig,
    updateTemplateFiles,
    updateFormData,
    updateField,
    updateFormDataImmediate,
    resetFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    clearTemplate
  };

  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
};
