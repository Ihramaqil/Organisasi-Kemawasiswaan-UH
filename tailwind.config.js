/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'bgHero': "url('https://firebasestorage.googleapis.com/v0/b/manajemen-organisasi-mahasiswa.firebasestorage.app/o/hero-bg.jpg?alt=media&token=4b43ee98-af80-4e15-bb40-89ad9f1aface')",
				'bgAgenda': "url('./src/assets/agendaHero.png')",
			}
		
		},
	},
	plugins: [],
}