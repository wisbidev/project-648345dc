import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAF6F0',
        surface: '#FFFFFF',
        border: '#E7DFD4',
        text: '#1F2430',
        'text-muted': '#6E7480',
        primary: {
          DEFAULT: '#E85D3D',
          hover: '#C94A2E',
          soft: '#FBE9E2',
        },
        secondary: {
          DEFAULT: '#1F5C5C',
          soft: '#E3EFEC',
        },
        danger: '#C0392B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Iowan Old Style', 'Palatino Linotype', 'Palatino', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        float: '0 24px 60px -28px rgba(31,36,48,.30)',
        button: '0 10px 24px -10px rgba(232,93,61,.55)',
        nav: '0 10px 30px -22px rgba(31,36,48,.35)',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        input: '14px',
        card: '16px',
      },
      transitionDuration: {
        fast: '0.18s',
        base: '0.22s',
        slow: '0.7s',
      },
    },
  },
  plugins: [],
};

export default config;
