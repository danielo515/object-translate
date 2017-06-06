<a name="1.0.0"></a>
# [1.0.0](https://github.com/danielo515/object-translate/compare/v0.1.2...v1.0.0) (2017-06-05)


### Bug Fixes

* **Falsy values are now properly returned:** Now only undefined will trigger the fallback to default ([c3d050e](https://github.com/danielo515/object-translate/commit/c3d050e))


### BREAKING CHANGES

* **Falsy values are now properly returned:** If no path or alternatives array is provided when a function processor is provided,
then null will be returned. Previously the node was leaving with an object with an undefined processor
property, which was not very useful


<a name="0.1.2"></a>
## [0.1.2](https://github.com/danielo515/object-translate/compare/v0.1.1...v0.1.2) (2017-03-15)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/danielo515/object-translate/compare/v0.1.0...v0.1.1) (2017-01-12)



<a name="0.1.0"></a>
# 0.1.0 (2017-01-12)



