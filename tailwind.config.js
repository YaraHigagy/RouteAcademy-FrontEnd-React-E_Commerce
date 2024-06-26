/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        extend: {
            fontSize: {
                '2xl': '1.75rem',
                '3xl': '2rem',
                '4xl': '2.5rem',
            },
            colors: {
                'accent': 'var(--accent)',
                'black-mut': 'var(--black-mut)',
                'primary': 'var(--primary)',
                'primary-dark': 'var(--primary-dark)',
                'success': 'var(--success)',
                'green-light': 'var(--green-light)',
                'green-darker': 'var(--green-darker)',
                'danger': 'var(--danger)',
                'mustard': 'var(--mustard)',
                'gray-light': 'var(--gray-light)',
                'gray-dark': 'var(--gray-dark)',
            },
            boxShadow: {
                '3xl': '1px 1px 10px var(--accent)',
            },
            height: {
                '75': '18.75rem',
            },
            lineHeight: {
                'tighter': '1.2',
            },
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

