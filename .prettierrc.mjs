export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  bracketSameLine: true,
  printWidth: 160,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
