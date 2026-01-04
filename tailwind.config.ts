import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color (Facebook Blue approximation)
        'primary': '#1877f2', 
        'primary-dark': '#166fe5',
        'primary-hover': '#166fe5',
        
        // Background colors
        'bg-light': '#f0f2f5', // Default body background
        'bg-surface': '#ffffff', // Card/Modal background
        
        // Gray palette
        'gray-100': '#f0f2f5', // Lightest gray for separators
        'gray-200': '#e4e6eb',
        'gray-300': '#d8dade',
        'gray-400': '#babbbe',
        'gray-500': '#a2a5aa', // Subtle text/icon
        'gray-600': '#606770', // Secondary text
        'gray-700': '#4b4f56',
        
        // Text colors
        'text-primary': '#050505',
        'text-secondary': '#606770',
        
        // Action/Feedback colors
        'success': '#38a169',
        'danger': '#fa383e',
      },
      fontFamily: {
        // Standard social media font stack
        sans: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'], 
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
      },
      borderRadius: {
        'large': '0.625rem', // 10px, common for cards/buttons
        'xl': '0.75rem',
      },
      boxShadow: {
        // Subtle shadow for standard posts/cards
        'card': '0 1px 2px rgba(0, 0, 0, 0.2)',
        // Shadow for floating elements (modals, fixed headers)
        'float': '0 0 8px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        // Standard tailwind screens plus a wider desktop layout
        '2xl': '1440px',
      }
    },
  },
  plugins: [
    // Adds a basic reset for form styles that makes form elements easy to override and consistent.
    forms,
  ],
};

export default config;