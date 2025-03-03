/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
			customBlue: "#64b0f2",
			customGreen: "#1bb99a",
			customFacebook: "#3b5998",
			customTwitter: "#00aced",
			customGoogle: "#dd4b39",
		},
	  },
	},
	plugins: [],
  };
  
//   module.exports = {
// 	theme: {
// 	  extend: {
// 		colors: {
// 		  customBlue: "#64b0f2",
// 		},
// 	  },
// 	},
//   };
  