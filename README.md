# Pokedex

## About The Project
Simple React pokedex using pokeapi.co. Main pokedex displays a list of pokemon and is filterable by generation and lets users search within the current displayed generation. Pokemon details page has image, stats, essential data, evolution, and breeding info displays. 

Visual elements built with MUI and Emotion styled components. API data fetch using Axios. Routing with React Router.

### Built With

* [React.js](https://reactjs.org/)
* [React Router](https://reactrouter.com/)
* [Axios](https://axios-http.com/)
* [Material UI](https://mui.com/)

### Getting Started

## Roadmap

### Todo
**Responsive Fixes**
- [ ] Fix responsive styles on small phones
  - [x] Pokedex - refactor generation select into separate component
  - [x] Pokedex - header bar too tall 
  - [x] Pokedex - random button does not fit
  - [x] Pokemon - Data fields need more horizontal spacing. ex. between height and weight

**Optimizations and Refinements**
- [ ] refactor styles into MUI styled
- [ ] separate styles into scoped js stylesheets
- [x] move dynamic background colors into JS object in variable file
  - [x] refactor pokecard css into js
- [x] refactor loading component css into js
- [ ] convert common styles to variables
- [ ] pokedexNav - switch from event listener to const theme = useTheme();
  const lgBreak = useMediaQuery(theme.breakpoints.only("md"));
- [ ] create hover state for return to pokedex page from pokemon detail(header)
- [ ] do not ask for previous pokemon name on bulbasarur (0). currently causing axios 404.
- [ ] do not ask for next pokemon name on calyrex (898). currently causing axios 404.
- [ ] rendering optimizations
- [ ] fetch optimizations

**Style Tweaks**
- [ ] add padding under right column in pokemon view

**Feature Adddition**
- [ ] Add loading state for generation filter
  - [ ] investigate having the filtered state be derived from url param. this could allow the back button to return to the previously filterd state.
  - [ ] url params and router should fix the annoying filter from all to single generation slowness.

- [ ] Data Store 
  - [ ] user auth
  - [ ] select favorites

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

