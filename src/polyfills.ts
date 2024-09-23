// src/polyfills.ts

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js';  // Included with Angular CLI.

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "include": [
    "src/**/*.d.ts",
    "src/**/*.ts",
    "src/polyfills.ts",  // Ensure this line is present
    "src/**/*.html",
    "src/**/*.scss"
  ]
}
