'use strict';

const Runner = require(`benchr`);
const reporter = require(`./reporter`);
const runOptions = {progress: false, reporter, verbose: false, maxTime: 5, minTime: 0, delay: 0};
// The json reporter uses console.log to report, so we just cheat here
new Runner(runOptions, `${__dirname}/src/_basic.js`).run();
