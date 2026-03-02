import React from 'react';
import { Button } from './Button';
import { Input } from './Input';

export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'textarea';
    placeholder?: string;
    required?: boolean;
}

export interface FormProps {
    title?: string;
    description?: string;
    fields: FormField[];
    submitLabel?: string;
}

export const Form: React.FC<FormProps> = ({ title, description, fields = [], submitLabel = 'Submit' }) => {
    return (
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'var(--background)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            maxWidth: '500px',
            width: '100%',
            color: 'var(--foreground)'
        }} onSubmit={(e) => e.preventDefault()}>
            {title && <h3 style={{ margin: 0, fontSize: '24px' }}>{title}</h3>}
            {description && <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--secondary)' }}>{description}</p>}

            {fields.map((field) => (
                <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor={field.id} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--secondary)' }}>
                        {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.id}
                            placeholder={field.placeholder}
                            required={field.required}
                            style={{
                                padding: '10px 14px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: '#1e293b',
                                color: 'white',
                                minHeight: '100px',
                                resize: 'vertical'
                            }}
                        />
                    ) : (
                        <Input
                            id={field.id}
                            type={field.type as any}
                            placeholder={field.placeholder}
                            required={field.required}
                            value={undefined}
                        />
                    )}
                </div>
            ))}

            <Button label={submitLabel} variant="primary" style={{ marginTop: '16px' }} />
        </form>
    );
};
