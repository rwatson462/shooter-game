# TICKET-0023: ESLint Setup

## Status
[ ] Not Started

## Description
Add ESLint to the project for consistent code style and catching common errors. Configure with sensible defaults for vanilla ES6 modules.

## Acceptance Criteria
- [ ] ESLint installed as dev dependency
- [ ] `.eslintrc.js` or `eslint.config.js` configured
- [ ] Rules work with ES6 modules (import/export)
- [ ] `npm run lint` script added to package.json
- [ ] Existing code passes linting (or issues documented)

## Technical Notes

### Installation
```bash
npm install --save-dev eslint
npx eslint --init
```

### Suggested Config (flat config format)
```javascript
// eslint.config.js
export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                document: "readonly",
                window: "readonly",
                console: "readonly",
                requestAnimationFrame: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "semi": ["warn", "never"], // or "always" - your preference
            "quotes": ["warn", "single"]
        }
    }
];
```

### Package.json Script
```json
{
    "scripts": {
        "lint": "eslint src/",
        "lint:fix": "eslint src/ --fix"
    }
}
```

## Dependencies
None

## Notes
- Decide on semicolons (you're currently not using them)
- Decide on quotes (you're using single quotes)
- Can add Prettier later for formatting if desired
