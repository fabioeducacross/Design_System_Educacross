import React from 'react';

interface BrandHeaderProps {
  title: string;
  subtitle: string;
  version?: string;
  cta?: { label: string; href: string };
  features?: string[];
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  title,
  subtitle,
  version,
  cta,
  features = [],
}) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #7367F0 0%, #5C52C0 100%)',
        borderRadius: '16px',
        padding: '3rem 2rem',
        marginBottom: '2rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {/* Exibe logo diferente conforme tema (light/dark) */}
        <picture>
          <source srcSet="/logo-educacross-dark.svg" media="(prefers-color-scheme: dark)" />
          <img 
            src="/logo-educacross-light.svg"
            alt="Educacross Design System"
            style={{ height: '48px', display: 'inline-block' }}
          />
        </picture>
      </div>

      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          filter: 'blur(30px)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          {version && (
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '0.25rem 0.75rem',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '500px',
                backdropFilter: 'blur(10px)',
              }}
            >
              {version}
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: '400',
            margin: '0.5rem 0 1.5rem 0',
            opacity: 0.95,
            maxWidth: '600px',
          }}
        >
          {subtitle}
        </p>

        {/* Features badges */}
        {features.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {features.map((feature, index) => (
              <span
                key={index}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                ✨ {feature}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {cta && (
          <a
            href={cta.href}
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'white',
              color: '#7367F0',
              fontWeight: '600',
              fontSize: '1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            {cta.label} →
          </a>
        )}
      </div>
    </div>
  );
};
