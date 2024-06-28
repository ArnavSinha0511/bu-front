# bu-front
Welcome interns! This is the official repository for building-U's new website(web app), here I'll explain the `guidelines` you'll be following to ensure we stay organized and consistent across the project.

## Technologies
This is a `React` application built using `Vite` and utilizes `CSS modules` for styling. `NPM` is our package manager.

## Vite
We are using `Vite` instead of `create-react-app`. I don't need to go into to much detail about `Vite` because you wouldn't need to worry about it, but `Vite` is a modern build tool that makes the development process faster and more efficient. It provides quicker build times and faster updates when you make changes to your code through Vite's fast hot module replacement (HMR), which all helps to improve the development experience.

## Styling
### CSS Modules vs CSS
CSS Modules might be new to many of you, so here's a brief explanation. CSS Modules provide a way to 'encapsulate' a CSS file so that the styles defined in it are scoped locally to the component that imports it. This ensures there aren't any style conflicts throughout the app, as CSS classes from one module won't affect those in another module. This way, even if two CSS Modules define the same class name, they won't interfere with each other.

### How to use CSS Modules
```JSX
// CSS Modules
import s from "./styles.module.css";

const Component = () => {
  return <div className={s.container}>Component</div>;
};

//-------------------------------------------------

// CSS (Global CSS)
import "./styles.css";

const Component = () => {
  return <div className="container">Component</div>;
};
```

### Use of Global CSS in the Project
The global CSS is defined in the `index.css` file at the base of the `src` directory. Here, we'll define our `default CSS properties` and `CSS variables`, such as colors and typography, etc. You'll use these variables in your CSS Module files to maintain consistency across the project. If you find a property value used across multiple files(not just your page files), add it as a CSS variable in `index.css`.

_Here's an example of how to use CSS variables:_
```JSX
import s from "./styles.module.css";

const Component = () => {
  return (
    <div className={s.container}>
      <h2>Heading</h2>
    </div>
  );
};
```
```CSS
/* styles.module.css */

.container {
  /* properties... */
}
.container h2 {
  font-family: var(--heading-font1); /* Heading Font 1 */
  color: var(--c-heading-w); /* White Heading */
}
```

## NPM
`NPM` is a package manager and a runtime or whatever it's called. So, the `package.json` and `package-lock.json` are `NPM` files, our package manager is how we install the react package/dependency (dependency is another word for package) and other packages. 

In the `package.json` there are also the script commands, like the `dev` command. All you have to look at is the `package.json`, the `package-lock.json` is just all the...

You can go to https://www.npmjs.com/, to search other packages from developers if you fell like it.

## Project Architecture
In this project, we will be using a `reusable architecture` for all directories/files. This means **creating a new `component` only if it is used in more than one `page directory` or component.** The same rule applies to utils, hooks, constants, and other directories. This approach ensures that everything stays modular and organized.

In your learning lessons, you might not have used `ES Modules (ESM)`; instead, you probably used `CommonJS`, which is the default module format  in `Node.js`. `ESM` is the modern JavaScript module format and has several advantages over `CommonJS`.

For `components`, `utilities`, etc, that are only used within a single page directory, define them as a file within that page directory or within the page file itself.

### CommonJs vs ESM 
```JavaScript
// logger.js (CommonJS)
const logger = (message) => {
  console.log(message);
};

module.exports = logger;

//-------------------------------------------------

// main.js (CommonJS)
const logger = require('./logger');

logger('Hello, World!');
```
```JavaScript
// logger.js (ESM)
export const logger = (message) => {
  console.log(message);
};

//-------------------------------------------------

// main.js (ESM)
import { logger } from './logger.js';

logger('Hello, World!');
```

### Directory Structure
...TODO

## Getting Started

### Prerequisites
- `Nodejs` version 20 or greater.
- `NPM` version 10 or greater.

To first get started, install all the packages listed in the `package.json` by doing a `npm install`. Then you'll have to create your team's branch. Since we are working by pages, you'll create your `branch by page`, for example, `page/home`. When you create your branch, make sure you're on your branch. Then run the dev command to start the development environment.

```
$ npm install
$ npm run dev
```
Running `npm run dev` would run the project in development mode.
```
$ npm run dev
```
`installing a package` (you most likely don't have to do this):
```
$ npm install <package>
```

### Pushing Code
You'll always be working in your `page/<page name>` branch. When you have completed a good amount or feel that this part of the code is ready, you can push it to the `develop` branch. The `develop` branch is where all the current code in development is located. **But before you push your code to `develop`**, set up a meeting with me, David Bishop, so I can check it out :)

## Helpful Recourses

https://www.freecodecamp.org/news/intro-to-react-components/ - React vs Static HTML

https://www.freecodecamp.org/news/full-guide-to-react-hooks/ - Common Hook Guide (You don't need to use all of them shown there)
