import React from 'react';
import { Button } from './Button';

export interface HeroProps {
    title: string;
    subtitle?: string;
    ctaPrimary?: string;
    ctaSecondary?: string;
    align?: 'left' | 'center' | 'right';
    children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaPrimary, ctaSecondary, align = 'center', children }) => {
    return (
        <div style={{
            padding: '80px 20px',
            textAlign: align,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
            background: 'var(--background)'
        }}>
            <h1 style={{
                margin: 0,
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'var(--foreground)',
                lineHeight: 1.2
            }}>{title}</h1>

            {subtitle && (
                <p style={{
                    margin: 0,
                    fontSize: '20px',
                    color: 'var(--secondary)',
                    maxWidth: '800px',
                    lineHeight: 1.6
                }}>{subtitle}</p>
            )}

            {(ctaPrimary || ctaSecondary) && (
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                    {ctaPrimary && <Button label={ctaPrimary} variant="primary" />}
                    {ctaSecondary && <Button label={ctaSecondary} variant="secondary" />}
                </div>
            )}

            {children && <div style={{ marginTop: '24px', width: '100%' }}>{children}</div>}
        </div>
    );
};
