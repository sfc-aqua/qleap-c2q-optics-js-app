# QLEAP Classical to Quantum Optics JS App

# Usage

## Prerequisites
* Node.js 16.13.0 (see `.node-version`)

## Setup
`$ npm ci` to install dependencies

## Start the server
`$ npm start` then you can see the page on [http://localhost:1234](http://localhost:1234)

## Lint
`eslint` will check your code is good or not and if it's easy to fix, `eslint` will fix it automatically.
before commit, you MUST run this to clean up your change.

`$ npm run lint`

## Build
`$ npm run build` will build your codes into one js file and minify it and then put it on `dist` dir.
basically you don't need to do this because `$ npm start` will build your code automatically and then start the server and you can browse it.


# Contributing

## Steps
1. create new feature branch and then checkout it there.
1. modify code
1. `$ npm run lint` and fix it
1. commit & push
1. send new "Pull Request" to the `master` branch
1. someone will review your PR
1. fix until reviewer approve your PR
1. if the PR approved, you can merge it
1. automatically deployed to github-pages

## Branching strategy
we use "GitHub flow". see [the doc](https://docs.github.com/en/get-started/quickstart/github-flow),
and also [this article](http://scottchacon.com/2011/08/31/github-flow.html) might be so useful.
