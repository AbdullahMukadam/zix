import React from 'react';
import FormField from './FormField.jsx';

const FormStep = ({ step, formData, errors, onFieldChange, onFieldBlur }) => {
  return (
    <div className="space-y-8 font-mono">
      <div className="mb-8 border-l-4 border-accent-blue pl-6 py-2">
        <div className="text-[10px] text-accent-blue font-bold uppercase tracking-[0.3em] mb-1">Module_Active</div>
        <h2 className="text-2xl font-black text-[#1a2e4c] uppercase tracking-tighter">{step.title}</h2>
        {step.description && (
          <p className="text-industrial-400 text-xs mt-2 uppercase font-bold tracking-tight">{step.description}</p>
        )}
      </div>

      <div className="space-y-6">
        {step.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            error={errors[field.name]}
          />
        ))}
      </div>
    </div>
  );
};

export default FormStep;
