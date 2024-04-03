## Introduction

Hey there 👋,

This is my submission to the [Perdoo Code Challenge](https://www.notion.so/Full-Stack-Web-Engineer-Case-Study-1df14966419740c2baf95461c04458c8).

I tried to keep things simple and focus on the main requirements of the challenge in order to stay within the 3-4 hours suggested.

I would be happy to discuss the project with you and get your feedback.

### 📈 Improvements:

In a real project, we could consider the following improvements:

- **Add more granular error handling:** right now we only show a generic error message but it woul be better to show specific error messages depending on the error type,
- **Add more tests:** Only the Pagination component and the global navigation are being tested. We could add more tests to the other components and pages, **focusing on the data fetching** (see https://docs.cypress.io/guides/end-to-end-testing/working-with-graphql)
- **Better UI and UX:** example: allow user to navigating back to the discover page when he's deeply nested in the detailed info pages,
- **Add routing type safety**

### 🛠️ Stack

This project was built using the following stack:

- NextJS 14 (with app directory),
- React,
- TypeScript,
- TailwindCSS for styling,
- Shadcn/ui for the primitives UI components,
- Lucide.dev for the icons,
- Apollo Client for fetching data from the GraphQL API,
- Jest for unit tests,
- Cypress for end-to-end tests.

## Run the project

First, install the dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run the tests

To run the jest tests:

```bash
npm run jest
```

To run the cypress tests, make sure the development server is running and then run:

```bash
npm run cypress:open
```
