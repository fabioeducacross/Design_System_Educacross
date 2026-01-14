import React from 'react';

interface DiagramGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  gap?: 'small' | 'normal' | 'large';
}

const gapConfig = {
  small: '1rem',
  normal: '1.5rem',
  large: '2rem'
};

export const DiagramGrid: React.FC<DiagramGridProps> = ({
  children,
  columns = 1,
  gap = 'normal'
}) => {
  const gridGap = gapConfig[gap];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gridGap,
        margin: '2rem 0',
        '@media (max-width: 768px)': {
          gridTemplateColumns: columns > 1 ? '1fr' : `repeat(${columns}, 1fr)`
        }
      }}
    >
      {children}
    </div>
  );
};
