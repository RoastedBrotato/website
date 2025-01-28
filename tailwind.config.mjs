/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				dark: '#151515',
				light: '#fff2ed',
				primary: '#A63D40',
				secondary: '#DDE0BD',
				accent: '#D0D1AC',
				neutral: '#B6A39E',
			  },
			  backgroundColor: theme => ({
				...theme('colors')
			  }),
			  textColor: theme => ({
				...theme('colors')
			  }),
			  borderColor: theme => ({
				...theme('colors')
			  })
		},
	},
	plugins: [],
}
