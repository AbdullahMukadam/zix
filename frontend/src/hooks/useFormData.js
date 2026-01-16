import { useState, useCallback } from 'react';
import { validateForm } from '../utils/validators.js';

export const useFormData = (initialData = {}, templateConfig = null) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const updateField = useCallback((name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const updateFields = useCallback((fields) => {
    setFormData(prev => ({
      ...prev,
      ...fields
    }));
  }, []);

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const validateCurrentData = useCallback(() => {
    if (!templateConfig || !templateConfig.formConfig) {
      return { isValid: true, errors: {} };
    }

    const validation = validateForm(formData, templateConfig.formConfig);
    setErrors(validation.errors);
    return validation;
  }, [formData, templateConfig]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  const isFieldValid = useCallback((name) => {
    return !errors[name];
  }, [errors]);

  const getFieldError = useCallback((name) => {
    return touched[name] ? errors[name] : null;
  }, [errors, touched]);

  return {
    formData,
    errors,
    touched,
    updateField,
    updateFields,
    setFieldTouched,
    validateCurrentData,
    resetForm,
    isFieldValid,
    getFieldError,
    setFormData,
    setErrors
  };
};

export default useFormData;
