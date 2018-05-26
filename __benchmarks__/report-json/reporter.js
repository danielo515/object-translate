const {platform} = require(`benchmark`);
const nVersion = `N${platform.version}`;
const {version} = require(`../../package`);
const report = require(`../report`);
const {promisify} = require(`util`);
const {writeFile: _writeFile} = require(`fs`);
const {join} = require(`path`);
const writeFile = promisify(_writeFile);
const curDir = x => join(__dirname, x);

module.exports = runner => {

  // Handle runner events.
  let currentFile, currentSuite;
  const stats = {platform, files: []};
  runner.on(`run.start`, () => {
    stats.started = new Date();
  }).on(`file.start`, file => {
    currentFile = {
      name: file,
      suites: [],
    };
    stats.files.push(currentFile);
  }).on(`suite.start`, suite => {
    currentSuite = {
      name: suite.name,
      benchmarks: [],
    };
    currentFile.suites.push(currentSuite);
  }).on(`suite.complete`, suite => {

    // Add the name(s) of the fastest benchmark(s).
    currentSuite.fastest = suite.filter(`fastest`).map(`name`);
    // Handle benchmark statistics.
    currentSuite.benchmarks = suite.map(bench => {
      delete bench.stats.sample;
      return {
        name: bench.name,
        hz: bench.hz,
        aborted: bench.aborted,
        stats: bench.stats,
      };
    });
  }).on(`run.complete`, () => {
    stats.ended = new Date();
    report[nVersion] = Object.assign({}, report[nVersion], {[version]: stats});
    writeFile(curDir(`../report.json`), JSON.stringify(report, null, 2), `utf8`).then(console.log(`Benchmark Finished`));
  });
};
