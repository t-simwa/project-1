// TypeScript declarations for Polaris Web Components
declare namespace JSX {
  interface IntrinsicElements {
    's-page': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      size?: 'base' | 'large';
    };
    's-section': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    's-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      padding?: 'none' | 'base' | 'large';
      background?: 'surface' | 'subdued' | 'info' | 'info-subdued';
      borderRadius?: 'none' | 'base' | 'round';
      border?: 'none' | 'base';
    };
    's-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    's-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
      variant?: 'primary' | 'secondary' | 'tertiary' | 'plain';
      size?: 'small' | 'base' | 'large';
      href?: string;
    };
    's-text-field': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
      label?: string;
      labelHidden?: boolean;
      error?: string;
      helpText?: string;
    };
    's-stack': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      gap?: 'none' | 'base' | 'large';
      direction?: 'vertical' | 'horizontal';
      align?: 'start' | 'center' | 'end';
    };
    's-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
      gap?: 'none' | 'base' | 'large';
    };
    's-banner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      tone?: 'info' | 'success' | 'warning' | 'critical';
      title?: string;
    };
  }
}

