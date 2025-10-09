import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	safelist: [
		// background colors
		"bg-orange-500",
		"bg-yellow-400",
		"bg-blue-500",
		"bg-error-500",
		"bg-teal-500",
		"bg-green-500",
		"bg-purple-500",
		"bg-indigo-500",

		// text colors
		"text-white",
		"text-black",
		"text-gray-400",

		// border colors (for pipeline headers)
		"border-orange-500",
		"border-yellow-400",
		"border-blue-500",
		"border-error-500",
		"border-teal-500",
		"border-green-500",
		"border-purple-500",
		"border-indigo-500",
	],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{ts,tsx}"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				gray: {
					'25': '#FDFDFD',
					'50': '#FAFAFA',
					'100': '#F5F5F5',
					'200': '#E9EAEB',
					'300': '#D5D7DA',
					'400': '#A4A7AE',
					'500': '#717680',
					'600': '#535862',
					'700': '#414651',
					'800': '#252B37',
					'900': '#101828'
				},
				brand: {
					'25': '#F5F8FF',
					'50': '#EEF4FF',
					'100': '#E0EAFF',
					'200': '#C7D7FE',
					'300': '#A4BCFD',
					'400': '#8098F9',
					'500': '#6172F3',
					'600': '#444CE7',
					'700': '#3538CD',
					'800': '#2D31A6',
					'900': '#2D3282'
				},
				error: {
					'25': '#FFFBFA',
					'50': '#FEF3F2',
					'100': '#FEE4E2',
					'200': '#FECDCA',
					'300': '#FDA29B',
					'400': '#F97066',
					'500': '#F04438',
					'600': '#D92D20',
					'700': '#B42318',
					'800': '#912018',
					'900': '#7A271A'
				},
				warning: {
					'25': '#FFFCF5',
					'50': '#FFFAEB',
					'100': '#FEF0C7',
					'200': '#FEDF89',
					'300': '#FEC84B',
					'400': '#FDB022',
					'500': '#F79009',
					'600': '#DC6803',
					'700': '#B54708',
					'800': '#93370D',
					'900': '#7A2E0E'
				},
				success: {
					'25': '#F6FEF9',
					'50': '#ECFDF3',
					'100': '#D1FADF',
					'200': '#A6F4C5',
					'300': '#6CE9A6',
					'400': '#32D583',
					'500': '#12B76A',
					'600': '#039855',
					'700': '#027A48',
					'800': '#05603A',
					'900': '#054F31'
				},
				blueGray: {
					'25': '#FCFCFD',
					'50': '#F8F9FC',
					'100': '#EAECF5',
					'200': '#D5D6E5',
					'300': '#AFB5D9',
					'400': '#717BBC',
					'500': '#4E5BA6',
					'600': '#3E4784',
					'700': '#363F72',
					'800': '#293056',
					'900': '#101323'
				},
				blueLight: {
					'25': '#F5FBFF',
					'50': '#F0F9FF',
					'100': '#E0F2FE',
					'200': '#B9E6FE',
					'300': '#7CD4FD',
					'400': '#36BFFA',
					'500': '#0BA5EC',
					'600': '#0086C9',
					'700': '#026AA2',
					'800': '#065986',
					'900': '#0B4A6F'
				},
				blue: {
					'25': '#F5FAFF',
					'50': '#EFF8FF',
					'100': '#D1E9FF',
					'200': '#B2DDFF',
					'300': '#84CAFF',
					'400': '#53B1FD',
					'500': '#2E90FA',
					'600': '#1570EF',
					'700': '#175CD3',
					'800': '#1849A9',
					'900': '#194185'
				},
				indigo: {
					'25': '#F5F8FF',
					'50': '#EEF4FF',
					'100': '#E0EAFF',
					'200': '#C7D7FE',
					'300': '#A4BCFD',
					'400': '#8098F9',
					'500': '#6172F3',
					'600': '#444CE7',
					'700': '#3538CD',
					'800': '#2D31A6',
					'900': '#203282'
				},
				purple: {
					'25': '#FAFAFF',
					'50': '#F4F3FF',
					'100': '#EBE9FE',
					'200': '#D9D6FE',
					'300': '#BDB4FE',
					'400': '#9B8AFB',
					'500': '#7A5AF8',
					'600': '#6938EF',
					'700': '#5925DC',
					'800': '#4A1FB8',
					'900': '#3E1C96'
				},
				pink: {
					'25': '#FEF6FB',
					'50': '#FDF2FA',
					'100': '#FCE7F6',
					'200': '#FCCEEE',
					'300': '#FAA7E0',
					'400': '#F670C7',
					'500': '#EE46BC',
					'600': '#DD2590',
					'700': '#C11574',
					'800': '#9E165F',
					'900': '#851651'
				},
				rose: {
					'25': '#FFF5F6',
					'50': '#FFF1F3',
					'100': '#FFE4E8',
					'200': '#FECDD6',
					'300': '#FDA4AF',
					'400': '#FB7185',
					'500': '#F63D68',
					'600': '#E31B54',
					'700': '#C01048',
					'800': '#A11043',
					'900': '#89123E'
				},
				orange: {
					'25': '#FFFAF5',
					'50': '#FFF6ED',
					'100': '#FFEDDA',
					'200': '#FDDCAB',
					'300': '#FEB273',
					'400': '#FD853A',
					'500': '#FB6514',
					'600': '#EC4A0A',
					'700': '#C4320A',
					'800': '#9C2A10',
					'900': '#7E2410'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				weekend: {
					DEFAULT: "hsl(var(--weekend))",
					light: "hsl(var(--weekend-light))",
				},
				absent: {
					DEFAULT: "hsl(var(--absent))",
					light: "hsl(var(--absent-light))",
				},
				late: {
					DEFAULT: "hsl(var(--late))",
					foreground: "hsl(var(--late-foreground))",
				},
				early: {
					DEFAULT: "hsl(var(--early))",
					foreground: "hsl(var(--early-foreground))",
				},
				today: {
					DEFAULT: "hsl(var(--today))",
					light: "hsl(var(--today-light))",
				},
				timeline: {
					bg: "hsl(var(--timeline-bg))",
					inactive: "hsl(var(--timeline-inactive))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		}
	},
	plugins: [
		require('tailwind-scrollbar-hide'),
		require("tailwindcss-animate")
	],
};
export default config;
