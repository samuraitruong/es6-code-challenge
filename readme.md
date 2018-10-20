# Sample ES6 + Babel + Express web API

API Document: [https://documenter.getpostman.com/view/3159079/RWguwc9n#ea0356be-5fa6-44a0-805c-d6f38c9308e5](https://documenter.getpostman.com/view/3159079/RWguwc9n#ea0356be-5fa6-44a0-805c-d6f38c9308e5)

Stack using

- ES6
- ExpressJS
- Morgan
- Winston
  Development Tools
  - @Babel
  - Mocha + Chai + Sinon

## Development

```bash
npm install
npm run dev

the express server will be hot reloading on port 5000, change port using enviroment config or update config.js file
```

## Build

```
    npm run build
    babel output will replace everything inside ./dist folder.
```

## Run

```sh
npm start
```

## test

```
npm run test
```

Unit test using mocha and mochawesome report, it been configured to run with ES6
