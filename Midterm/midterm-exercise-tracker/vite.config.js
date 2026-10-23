import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // json-server rewrites db.json on every save. Without this, Vite sees
      // the file change and reloads the whole page after every add/edit.
      ignored: ["**/db.json"],
    },
  },
});
