import React from 'react';

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  level?: 'primary' | 'secondary' | 'tertiary';
  spacing?: 'compact' | 'normal' | 'spacious';
}

const levelConfig = {
  primary: {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '3px solid var(--color-primary)'
  },
  secondary: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '2px solid var(--color-primary)'
  },
  tertiary: {
    fontSize: '1.1rem',
    fontWeight: '500',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid var(--color-neutral-300)'
  }
};

const spacingConfig = {
  compact: { margin: '1rem 0', gap: '0.75rem' },
  normal: { margin: '2rem 0', gap: '1rem' },
  spacious: { margin: '3rem 0', gap: '1.5rem' }
};

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  children,
  level = 'primary',
  spacing = 'normal'
}) => {
  const titleStyle = levelConfig[level];
  const spacingStyle = spacingConfig[spacing];

  return (
    <section
      style={{
        margin: spacingStyle.margin,
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        gap: spacingStyle.gap
      }}
    >
      {title && (
        <div>
          <h2
            style={{
              ...titleStyle,
              margin: 0,
              color: 'var(--color-neutral-900)'
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--color-neutral-600)',
                marginTop: '0.5rem',
                lineHeight: '1.6'
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacingStyle.gap
        }}
      >
        {children}
      </div>
    </section>
  );
};
