export interface MultiFrameworkCode {
  react: string;
  vue2: string;
  vue3: string;
}

export interface CodeTabProps {
  code: string;
  language: 'tsx' | 'vue' | 'html';
  active: boolean;
  onClick: () => void;
}
