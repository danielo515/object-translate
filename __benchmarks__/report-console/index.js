const Suite = require(`benchmarked`);
const suite = new Suite({
  cwd: __dirname, // optionally define a base directory for code and fixtures
  fixtures: `../fixtures/*.js`, // path or glob pattern to fixtures
  code: `src/*.js`, // path or glob pattern to code files
});

// run the benchmarks
suite.run();
