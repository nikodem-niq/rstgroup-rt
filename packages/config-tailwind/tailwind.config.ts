import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  plugins: [require("tailwindcss-animate")],
};
export default config;
