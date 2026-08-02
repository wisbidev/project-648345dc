import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAF6F0',
        surface: '#FFFFFF',
        border: '#E7DFD4',
        ink: '#1F2430',
        muted: '#6E7480',
        primary: {
          DEFAULT: '#E85D3D',
          hover: '#C94A2E',
          text: '#FFFFFF',
          soft: '#FBE9E2',
        },
        secondary: {
          DEFAULT: '#1F5C5C',
          soft: '#E3EFEC',
        },
        danger: '#C0392B',
      },
      fontFamily: {
        body: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Iowan Old Style', 'Palatino Linotype', 'Palatino', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'eyebrow': ['12.5px', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '700' }],
        '3xl': ['clamp(42px, 6vw, 68px)', { lineHeight: '1.06', fontWeight: '600' }],
        '2xl': ['clamp(30px, 4vw, 42px)', { lineHeight: '1.15', fontWeight: '600' }],
        'xl': ['21px', { lineHeight: '1.3', fontWeight: '600' }],
        'lg': ['18px', { lineHeight: '1.6' }],
        'base': ['16px', { lineHeight: '1.6' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'xs': ['12px', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '72px',
        '28': '110px',
      },
      borderRadius: {
        'card': '22px',
        'input': '14px',
        'lg': '28px',
      },
      boxShadow: {
        'float': '0 24px 60px -28px rgba(31,36,48,.30)',
        'button': '0 10px 24px -10px rgba(232,93,61,.55)',
        'nav': '0 10px 30px -22px rgba(31,36,48,.35)',
      },
      transitionDuration: {
        'fast': '0.18s',
        'base': '0.22s',
        'slow': '0.7s',
        'meter': '1s',
        'pop': '0.45s',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(.34,1.56,.64,1)',
        'meter': 'cubic-bezier(.22,.61,.36,1)',
      },
      maxWidth: {
        'container': '1120px',
      },
      zIndex: {
        'mobile-menu': '49',
        'nav': '50',
      },
    },
  },
  plugins: [],
}

export default config
