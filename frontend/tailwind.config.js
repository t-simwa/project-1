/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coursera Primary Blue
        primary: {
          DEFAULT: '#0056D2',
          hover: '#0048B0',
          light: '#E3EEFF',
          dark: '#00112A',
          'blue-xxstrong': '#00112A', // For hero card 2
        },
        // Text Colors
        text: {
          primary: '#0F1114',
          secondary: '#5B6780',
        },
        // Neutral Colors
        neutral: {
          background: '#FFFFFF',
          border: '#DAE1ED',
          gray: '#F2F5FA',
        },
        // Hero card background colors
        hero: {
          'light-green': '#EBFDF8', // Card 1
          'primary-blue-xxstrong': '#00112A', // Card 2
          'tertiary-yellow-xweak': '#FFF4E8', // Card 3
        },
        // Legacy support
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['5.25rem', { lineHeight: '5.75rem' }],
        'display-md': ['4rem', { lineHeight: '4.5rem' }],
        'display-sm': ['2.75rem', { lineHeight: '3.25rem' }],
        'title-lg': ['3rem', { lineHeight: '3.5rem' }],
        'title-md': ['2.25rem', { lineHeight: '2.625rem' }],
        'title-sm': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
      },
      borderRadius: {
        'coursera': '8px',
        'coursera-lg': '16px',
        'coursera-xl': '24px',
      },
      boxShadow: {
        'coursera-1': '0px 0px 4px 0px rgba(15, 17, 20, 0.1), 0px 2px 12px 2px rgba(15, 17, 20, 0.1)',
        'coursera-2': '0px 0px 4px 0px rgba(15, 17, 20, 0.1), 0px 4px 12px 4px rgba(15, 17, 20, 0.1)',
        'coursera-3': '0px 0px 4px 0px rgba(15, 17, 20, 0.1), 0px 6px 12px 4px rgba(15, 17, 20, 0.1)',
      },
      maxWidth: {
        'coursera': '3000px',
        'carousel': '3000px',
      },
    },
  },
  plugins: [],
}

