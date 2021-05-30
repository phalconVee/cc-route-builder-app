# Komoot Cross-country Route Builder

A basic React application that allows you to plan your own cross-country run and download it as GPX file.

You can plan your favorite route across fields and hills by just placing markers as waypoints on the map. The same waypoints show up as a list where you can re-arrange and delete them until you are happy with your route. You can then download it by simply pressing the download button.

## Prerequisite

- [NPM](https://npmjs.com/)
- [Docker](https://www.docker.com/)
- Allow location sharing when prompted for effective performance of the app.

## Demo Website

- [Click me](https://komoot-route-builder.netlify.app/) to access demo website of this application.

## Building and running

If you have docker engine running, just run the command below to get started.

```
docker-compose up
```

Oherwise, run via NPM

- Run `npm install` command in your terminal to install all the required dependencies
- Run `npm start` to run the application locally on `http://localhost:3000`
- Run `npm test` to run all the available unit tests

## Browser support

Tested in a few recent browsers:

- Firefox 81
- Safari 14
- Chrome 86

No effort has been made to ensure any backwards-compatibility with older versions.

## Libraries and tools used

- [create-react-app][] for initial setup.
- Using [Leaflet][] library for the map.
- Generated GPX file validated with [togpx][]. Converts GeoJSON to GPX.
- Using [Emotion][] library for unified theming in-case of scaling from a visual perspective.

## Limitations

- Hard-coded my personal Mapbox access token.
  Would ahave ahnadled with environemnt variables for security purpose.
- The Map component assumes it's only ever instantiated once and never removed from DOM.
  e.g. it uses a hard-coded `id` attribute.

## What did I learn

- Pretty much my first time using he Leaflet library for route building.
  Had to do some learning there.
  - Was looking at building the core components as functional components.
    But realized that a class based approach will help prsent the solution in a scalable way at least from my own view.
- I had not used the browser Drag'n'Drop API before.
  It seemed to work pretty well in Firefox,
  but then I discovered it not quite working when testing in other browsers.
  Turned out I had used the deprecated dragexit event.
  Additionally I had problems with excessive dragleave events being fired,
  which I fixed with applying `pointer-events: none` to child elements.
- Overall, it was a very intersting exercise, givig me more insights towards innovating around map based products.
