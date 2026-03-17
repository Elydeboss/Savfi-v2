/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/@sveltejs/kit/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        blue: '#2092e9',
        green: '#33b86b',
        purple: '#7146e8',
        orange: '#e89e50',
        'blue-hover': '#baddf8',
        'blue-dark': '#007ac2',
        'blue-light': '#58c3ff',
        // Additional theme colors from app.css
        foreground: '#23272f',
        'foreground-dark': '#ffffff',
        'card-foreground': '#23272f',
        primary: '#2092e9',
        'primary-foreground': '#ffffff',
        'primary-light': '#58c3ff',
        'primary-dark': '#007ac2',
        secondary: '#f0f4f8',
        'secondary-foreground': '#23272f',
        muted: '#f2f6f9',
        'muted-foreground': '#6e737b',
        accent: '#ffc928',
        'accent-foreground': '#23272f',
        success: '#33b86b',
        'success-foreground': '#ffffff',
        destructive: '#e53935',
        'destructive-foreground': '#ffffff',
        border: '#e3e8ed',
        input: '#e3e8ed',
        ring: '#1ba8ff',
        card: '#ffffff'
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'instrument-sans': ['"Instrument Sans"', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '0.75rem'
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'glow-blue': '0 0 20px rgba(88, 166, 255, 0.25)',
        'glow-green': '0 0 20px rgba(63, 185, 80, 0.25)',
        'glow-purple': '0 0 20px rgba(188, 140, 255, 0.25)'
      }
    }
  },
  plugins: []
};
