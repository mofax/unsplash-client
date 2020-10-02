## The Unspash Client

<br>

# Usage

**[NOTE] keys.ts**

Before this project can run, you need to create a file `keys.ts` in the project root. This file should export your unsplash access key

```ts
// keys.ts
export const UNSPLASH_ACCESS_KEY = "5FO................1E0";
```

To run in development, first install the dependencies via npm

```bash
$ npm install
```

Then run the development server

```bash
$ npm start
```

Visit `localhost:1234/` on your browser to view the running application

# Tests

```bash
$ npm test
```

# Tools

This app uses the following tools

1. React - The View Library
2. Jest - The Test Runner
3. Parcel - Zero Config Bundler
4. Prettier - Opinionated code formatting
5. CSS Modules - Component level scoping for css
6. Mobx - State Managment
