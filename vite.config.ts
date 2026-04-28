import { defineConfig, loadEnv } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

console.log(monacoEditorPlugin)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const parsedPort = Number(env.VITE_PORT ?? env.PORT ?? 5173);
  const port = Number.isFinite(parsedPort) ? parsedPort : 5173;

  return {
    plugins: [
      (monacoEditorPlugin as any).default({}),
    ],
    server: {
      port,
      allowedHosts: [
        'editor.auby.io',
      ],
      cors: {
        origin: [
          'http://editor.auby.io',
          'https://editor.auby.io',
        ],
      },
    },
  };
});
