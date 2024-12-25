import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...tseslint.configs.recommended,

  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      // "no-unused-vars": "warn"
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
