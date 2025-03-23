const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      features: {
        "custom-properties": true, // Enable CSS custom properties (variables)
      },
    },
  },
};

export default config;
