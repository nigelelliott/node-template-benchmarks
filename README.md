# node-template-benchmarks
A performance comparison of various Node.js template engines

## Setup

1. `npm install`
2. `npm start`
3. Comparison page will be running on localhost

Note: the project requires io.js or Node.js (version 4.0 or greater) to run.

## Analysis

This small project was put together in order to assess how using React on the server performs relative to the other template solutions, and also show the speed improvements that can be made by using various React optimizations.

The following table shows the render time of a single component (React) or template (others) using each of the different engines.  The average time is the result after 10 runs.  Unsurprisingly React is slower than the other basic template engines, but we are still able to see a significant performance increase by using the minified build, and another slight gain using the new JavaScript class syntax in ES6.

Note: the latest version of React (0.14) now introduces the concept of stateless components which render faster again - see comparison below

![Performance comparison of a flat template structure](https://cloud.githubusercontent.com/assets/1560485/10372452/be02937c-6ddf-11e5-86a0-d6d97f4d036a.png)

The next table shows the performance rendering a deeper nested structure of React components which is closer to how a real page would be composed.  In this example the same number of components are rendered as before but the performance is slightly improved (the same result was observed on repeated runs).

![Performance comparison of a deep nested template structure](https://cloud.githubusercontent.com/assets/1560485/10372518/0da5f45a-6de0-11e5-9895-dd42122889cb.png)
