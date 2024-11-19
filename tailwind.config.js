/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        mystic: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      animation: {
        'card-flip': 'flip 0.6s ease-in-out',
        'card-hover': 'hover 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shuffle': 'shuffle 0.3s ease-in-out',
        'reveal': 'reveal 0.6s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        flip: {
          '0%': { 
            transform: 'rotateY(0deg)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          '100%': { 
            transform: 'rotateY(180deg)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
          },
        },
        hover: {
          '0%': { 
            transform: 'translateY(0) scale(1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          },
          '100%': { 
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shuffle: {
          '0%': { transform: 'translateX(0) rotate(0)' },
          '25%': { transform: 'translateX(-5px) rotate(-3deg)' },
          '75%': { transform: 'translateX(5px) rotate(3deg)' },
          '100%': { transform: 'translateX(0) rotate(0)' },
        },
        reveal: {
          '0%': { 
            transform: 'rotateY(180deg) scale(0.95)',
            opacity: '0'
          },
          '100%': { 
            transform: 'rotateY(0) scale(1)',
            opacity: '1'
          },
        },
        slideUp: {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
        'flat': 'flat',
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      backfaceVisibility: {
        'visible': 'visible',
        'hidden': 'hidden',
      },
      rotate: {
        '0': '0deg',
        '180': '180deg',
        '-180': '-180deg',
      },
      transform: {
        'rotate-y-180': 'rotateY(180deg)',
        'rotate-y-0': 'rotateY(0deg)',
        'preserve-3d': 'preserve-3d',
        'flip': 'rotateY(180deg)',
        'flip-back': 'rotateY(0deg)',
      },
      transitionProperty: {
        'transform': 'transform',
        'all': 'all',
        'cards': 'transform, box-shadow, opacity',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '600': '600ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
          '-webkit-transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.backface-visible': {
          'backface-visibility': 'visible',
          '-webkit-backface-visibility': 'visible',
        },
        '.perspective-1000': {
          'perspective': '1000px',
          '-webkit-perspective': '1000px',
        },
        '.rotate-y-180': {
          'transform': 'rotateY(180deg)',
          '-webkit-transform': 'rotateY(180deg)',
        },
        '.rotate-y-0': {
          'transform': 'rotateY(0deg)',
          '-webkit-transform': 'rotateY(0deg)',
        },
        '.flip-card': {
          'position': 'relative',
          'transform-style': 'preserve-3d',
          '-webkit-transform-style': 'preserve-3d',
          'transition': 'transform 0.6s',
          '-webkit-transition': '-webkit-transform 0.6s',
        },
        '.flip-card-inner': {
          'position': 'relative',
          'width': '100%',
          'height': '100%',
          'transform-style': 'preserve-3d',
          '-webkit-transform-style': 'preserve-3d',
          'transition': 'transform 0.6s',
          '-webkit-transition': '-webkit-transform 0.6s',
        },
        '.flip-card-front': {
          'position': 'absolute',
          'width': '100%',
          'height': '100%',
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
          'transform': 'rotateY(0deg)',
          '-webkit-transform': 'rotateY(0deg)',
        },
        '.flip-card-back': {
          'position': 'absolute',
          'width': '100%',
          'height': '100%',
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
          'transform': 'rotateY(180deg)',
          '-webkit-transform': 'rotateY(180deg)',
        },
        '.flipped': {
          'transform': 'rotateY(180deg)',
          '-webkit-transform': 'rotateY(180deg)',
        },
      });
    },
  ],
};