import React from 'react';
import { Button } from './Button';
import { Card } from './Card';

export interface PricingTier {
    name: string;
    price: string;
    description?: string;
    features: string[];
    isPopular?: boolean;
    ctaLabel?: string;
}

export interface PricingProps {
    title?: string;
    subtitle?: string;
    tiers: PricingTier[];
}

export const Pricing: React.FC<PricingProps> = ({ title = "Simple, transparent pricing", subtitle, tiers }) => {
    return (
        <div style={{ padding: '64px 20px', textAlign: 'center', background: 'var(--background)' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--foreground)' }}>{title}</h2>
            {subtitle && <p style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '48px' }}>{subtitle}</p>}

            <div style={{
                display: 'flex',
                gap: '24px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {tiers.map((tier, index) => (
                    <div key={index} style={{
                        flex: '1 1 300px',
                        maxWidth: '350px',
                        transform: tier.isPopular ? 'scale(1.05)' : 'none',
                        position: 'relative',
                        zIndex: tier.isPopular ? 10 : 1
                    }}>
                        {tier.isPopular && (
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'var(--primary)',
                                color: '#fff',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>
                                Most Popular
                            </div>
                        )}
                        <Card title={tier.name}>
                            <div style={{ paddingBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '24px' }}>
                                <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--foreground)' }}>{tier.price}</div>
                                {tier.description && <div style={{ color: 'var(--secondary)', fontSize: '14px', marginTop: '8px' }}>{tier.description}</div>}
                            </div>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {tier.features.map((feature, fidx) => (
                                    <li key={fidx} style={{ color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                label={tier.ctaLabel || 'Get Started'}
                                variant={tier.isPopular ? 'primary' : 'secondary'}
                                style={{ width: '100%' }}
                            />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};
