/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				pruebaPurple: '#39397F',
				pruebaDark: '#1B1B1B',
				pruebaWhite: '#FFFFFF',
				pruebaBgClear: '#F4F4F4',
				pruebaOrange: '#FA7759',
				pruebaCyan: '#58A4B0',
				pruebaLightOrange: '#FA7759',
				pruebaRed: '#F44336',
				pruebaGreen: '#4CAF50',
				lightGray: '#626566',
				pruebaYellow: '#F3DB87'
			}
		}
	},
	plugins: []
};
