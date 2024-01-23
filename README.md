# README

The canvas-panel-playground is a simple implementation of the canvas/panel architecture.

### What is this repository for?

This repo is designed to be an easy-to-follow example, showcase at the barebones how the canvas/panel architecture can be used to create a highly configurable framework agnostic application. It also showcases how to built panels and what the capabilities of the @synanetics/panel-library are.

### How do I get set up?

#### Startup

From root, `npm run installall` and then `npm run build:components`. This will build the components/panels and make it available to the library to serve. If you want to watch your changes as you actively develop panels, run the command `npm run watch:components`.

Then, run `docker compose up`.

You should then have:

- the **library** running at http://localhost:8082 (e.g. http://localhost:8082/metadata)
- the **test-portal server** (for the registry) running at http://localhost:8081 (e.g. POST to http://localhost:8081/search)
- the **test-portal client** (canvas) running at http://localhost:8080

### Components

This playground is made up of a library and a test portal.

#### Library

A panel library is a server that serves panels to a user interface. Panels are typically served as static JavaScript files loaded via SystemJS in the user interface. The library may also serve other libraries, such as React or MUI, which are JavaScript files containing code shared between multiple panels. This allows panels to reuse the library code already available, reducing the bundle size. The library also exposes a metadata API endpoint, providing information about the panels contained within the library, such as the attributes the panels require to operate and contextual events the panels might trigger, to allow users of the panels to know how to set them up to work.

You will find the JavaScript panels under library/components.

The library currently uses a pre-built docker image which contains an implementation of the library.

#### Test-Portal

The test portal is a really simple implementation of the canvas. It contains a canvas which renders two panels. The syn-canvas element is provided with a library-root which is used to specify the API endpoint of the registry from which the Canvas should search for the Panel details (which in this case is the test-portal/server)
