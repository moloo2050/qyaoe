import typography from '@tailwindcss/typography';
import flowbitePlugin from 'flowbite/plugin'
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}','./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
	theme: {
		extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        },
        aoe2: {
          1: '#405BFF',
          2: '#FF0000',
          3: '#00FF00',
          4: '#FFFF00',
          5: '#00FFFF',
          6: '#FF57B3',
          7: '#797979',
          8: '#FF9600'
        }
      }
    }
	},


  plugins: [flowbitePlugin,typography]
};
