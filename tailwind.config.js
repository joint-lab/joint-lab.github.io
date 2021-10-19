module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
        'pulse-linear': 'pulse-slow 5s linear infinite;',
        'ping-slow': 'ping 4.2s cubic-bezier(0, 0, 0.2, 1) infinite;',
        'ping-xslow': 'ping 6.1s cubic-bezier(0, 0, 0.2, 1) infinite;',
        'ping-xxslow': 'ping 5.5s cubic-bezier(0, 0, 0.2, 1) infinite;',
        'ping-xxslow-finite': 'ping-finite 3s cubic-bezier(0, 0.2, 0.5, 1);',
        'ping-xxxslow': 'ping 7.2s cubic-bezier(0, 0, 0.2, 1) infinite;'
      },
    },
    fontFamily: {
      'serif': ['lora']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
