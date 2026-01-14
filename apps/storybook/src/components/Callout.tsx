import React from 'react';
import { AlertCircle, Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

const calloutConfig = {
  info: {
    bg: 'var(--color-blue-50)',
    border: 'var(--color-blue-300)',
    text: 'var(--color-blue-900)',
    icon: Info,
    emoji: 'ℹ️'
  },
  warning: {
    bg: 'var(--color-yellow-50)',
    border: 'var(--color-yellow-300)',
    text: 'var(--color-yellow-900)',
    icon: AlertTriangle,
    emoji: '⚠️'
  },
  success: {
    bg: 'var(--color-green-50)',
    border: 'var(--color-green-300)',
    text: 'var(--color-green-900)',
    icon: CheckCircle,
    emoji: '✅'
  },
  error: {
    bg: 'var(--color-red-50)',
    border: 'var(--color-red-300)',
    text: 'var(--color-red-900)',
    icon: AlertCircle,
    emoji: '❌'
  },
  tip: {
    bg: 'var(--color-purple-50)',
    border: 'var(--color-purple-300)',
    text: 'var(--color-purple-900)',
    icon: Lightbulb,
    emoji: '💡'
  }
};

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
  icon,
  showIcon = true
}) => {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      style={{
        backgroundColor: config.bg,
        border: `2px solid ${config.border}`,
        borderRadius: '8px',
        padding: '1.25rem',
        margin: '1.5rem 0',
        color: config.text,
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {title && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          {showIcon && (icon || <Icon size={20} />)}
          {title}
        </div>
      )}
      <div
        style={{
          lineHeight: '1.6',
          fontSize: '0.95rem'
        }}
      >
        {children}
      </div>
    </div>
  );
};
