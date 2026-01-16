
import { useEffect } from 'react';
import { useTemplate } from '../../context/TemplateContext.jsx';
import { useFormData } from '../../hooks/useFormData.js';
import FormStep from './FormStep.jsx';
import FormControls from './FormControls.jsx';

const DynamicForm = ({ onFormComplete }) => {
  const {
    templateConfig,
    formData: contextFormData,
    currentStep,
    updateFormData,
    goToNextStep,
    goToPreviousStep
  } = useTemplate();

  const {
    formData,
    errors,
    updateField,
    setFieldTouched,
    validateCurrentData,
    setFormData
  } = useFormData(contextFormData, templateConfig);

  // Sync form data with context only when contextFormData changes from external source
  useEffect(() => {
    setFormData(contextFormData);
  }, [contextFormData, setFormData]);

  if (!templateConfig || !templateConfig.formConfig) {
    return (
      <div className="bg-[#0A0A0A] border border-dashed border-white/10 p-8 text-center rounded-lg">
        <p className="text-util-gray font-bold uppercase text-xs font-mono">No Configuration Found</p>
      </div>
    );
  }

  const { steps } = templateConfig.formConfig;
  const currentStepData = steps.find(s => s.id === currentStep) || steps[0];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  const handleFieldChange = (name, value) => {
    updateField(name, value);
    // Update context with the new field value
    updateFormData({ ...formData, [name]: value });
  };

  const handleFieldBlur = (name) => {
    setFieldTouched(name);
  };

  const validateCurrentStep = () => {
    const stepFields = currentStepData.fields.map(f => f.name);
    let hasError = false;

    stepFields.forEach(fieldName => {
      if (errors[fieldName]) {
        hasError = true;
      }
    });

    return !hasError;
  };

  const handleNext = () => {
    // Mark all current step fields as touched
    currentStepData.fields.forEach(field => {
      setFieldTouched(field.name);
    });

    // Validate current step
    const validation = validateCurrentData();
    
    if (validation.isValid || validateCurrentStep()) {
      goToNextStep();
    }
  };

  const handlePrevious = () => {
    goToPreviousStep();
  };

  const handleSubmit = () => {
    // Mark all fields as touched
    steps.forEach(step => {
      step.fields.forEach(field => {
        setFieldTouched(field.name);
      });
    });

    // Validate entire form
    const validation = validateCurrentData();
    
    if (validation.isValid) {
      if (onFormComplete) {
        onFormComplete(formData);
      }
    }
  };

  return (
    <div className="font-sans text-white">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-util-gray/50 uppercase tracking-widest mb-1">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-bold text-white">
               {currentStepData.title || 'Configuration'}
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-mono border border-white/10">
             {Math.round((currentStep / steps.length) * 100)}%
          </div>
        </div>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Step */}
      <div className="mb-8">
        <FormStep
          step={currentStepData}
          formData={formData}
          errors={errors}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
        />
      </div>

      {/* Navigation Controls */}
      <div className="pt-6 border-t border-white/10">
        <FormControls
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          canProceed={true}
        />
      </div>
    </div>
  );
};

export default DynamicForm;
