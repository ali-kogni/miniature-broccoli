# setup

1. You need to install the **_nodejs_** runtime. [`node-download`](https://nodejs.org/)en the LTS version is recommended.

   We recommend also to install nvm to manage multiple nodejs versions. to quickly switch between versions and verify we are all using the same one. [`nvm-installation`](https://github.com/nvm-sh/nvm#installing-and-updating).

2. npm is a package management library that comes with nodejs. It is used to install and manage dependencies.

   However for this project we will use **yarn**. It is a package manager that is faster than npm and has a better user experience.

   Follow the yarn installation here [`installation`](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

3. Finally for running misc commands we need **npx** [`npx-installation`](https://www.npmjs.com/package/npx).

   We want the tools above to be system wide when using npm, so be sure to install them globally with the `-g` flag.

4. For formatting and linting we are using prettier and eslint. Be sure to use them in your code editor and before committing.

   For VSCode we recommend the following extensions:

   - Prettier - Code formatter
   - ESLint
   - Svelte extension for VS Code

## Development

everytime we add new libraries to package.json we need to run the install commands. Also when cloning the project for the first time we need to install the dependencies.

first install the dependencies:

```bash
yarn install
```

then start the development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

Before Making a commit, run the following commands:

format code:

```
yarn format
```

check linter errors:

```
yarn lint
```

## Testing

For Unit testing we will use **vitest** which is a testing framework recommended for svelte. It is fully compatible with **jest**

For E2E testing we will use **playwright** which is also the recommended testing suite for svelte applications.
playwright

In order for tests to pass we require two configured testing accounts in BE for the environment.
This is because we need to login to the application to be able to test it. Furthermore we need an account that has an expired membership to test access to the application.

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
