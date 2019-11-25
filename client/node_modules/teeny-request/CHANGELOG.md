# Changelog

### [5.3.1](https://www.github.com/googleapis/teeny-request/compare/v5.3.0...v5.3.1) (2019-10-29)


### Bug Fixes

* correctly set compress/gzip option when false ([#95](https://www.github.com/googleapis/teeny-request/issues/95)) ([72ef307](https://www.github.com/googleapis/teeny-request/commit/72ef307364de542af3ef8581572b1897fca2bcf4))

## [5.3.0](https://www.github.com/googleapis/teeny-request/compare/v5.2.1...v5.3.0) (2019-10-09)


### Bug Fixes

* **deps:** update dependency https-proxy-agent to v3 ([#89](https://www.github.com/googleapis/teeny-request/issues/89)) ([dfd52cc](https://www.github.com/googleapis/teeny-request/commit/dfd52cc))


### Features

* agent pooling ([#86](https://www.github.com/googleapis/teeny-request/issues/86)) ([b182f51](https://www.github.com/googleapis/teeny-request/commit/b182f51))

### [5.2.1](https://www.github.com/googleapis/teeny-request/compare/v5.2.0...v5.2.1) (2019-08-14)


### Bug Fixes

* **types:** make types less strict for method ([#76](https://www.github.com/googleapis/teeny-request/issues/76)) ([9f07e98](https://www.github.com/googleapis/teeny-request/commit/9f07e98))

## [5.2.0](https://www.github.com/googleapis/teeny-request/compare/v5.1.3...v5.2.0) (2019-08-13)


### Bug Fixes

* if scheme is http:// use an HTTP agent ([#75](https://www.github.com/googleapis/teeny-request/issues/75)) ([abdf846](https://www.github.com/googleapis/teeny-request/commit/abdf846))
* remove unused logging ([#71](https://www.github.com/googleapis/teeny-request/issues/71)) ([4cb4967](https://www.github.com/googleapis/teeny-request/commit/4cb4967))
* undefined headers breaks compatibility with auth ([#66](https://www.github.com/googleapis/teeny-request/issues/66)) ([12901a0](https://www.github.com/googleapis/teeny-request/commit/12901a0))


### Features

* support lazy-reading from response stream ([#74](https://www.github.com/googleapis/teeny-request/issues/74)) ([f6db420](https://www.github.com/googleapis/teeny-request/commit/f6db420))
* support reading from the request stream ([#67](https://www.github.com/googleapis/teeny-request/issues/67)) ([ae23054](https://www.github.com/googleapis/teeny-request/commit/ae23054))


### Reverts

* do not pipe fetch response into user stream ([#72](https://www.github.com/googleapis/teeny-request/issues/72)) ([6ec812e](https://www.github.com/googleapis/teeny-request/commit/6ec812e))

### [5.1.3](https://www.github.com/googleapis/teeny-request/compare/v5.1.2...v5.1.3) (2019-08-06)


### Bug Fixes

* duplex stream does not implement methods like _read ([#64](https://www.github.com/googleapis/teeny-request/issues/64)) ([22ee26c](https://www.github.com/googleapis/teeny-request/commit/22ee26c))

### [5.1.2](https://www.github.com/googleapis/teeny-request/compare/v5.1.1...v5.1.2) (2019-08-06)


### Bug Fixes

* **types:** expand method and header types ([#61](https://www.github.com/googleapis/teeny-request/issues/61)) ([c04d2f1](https://www.github.com/googleapis/teeny-request/commit/c04d2f1))

### [5.1.1](https://www.github.com/googleapis/teeny-request/compare/v5.1.0...v5.1.1) (2019-07-23)


### Bug Fixes

* support lowercase proxy env vars ([#56](https://www.github.com/googleapis/teeny-request/issues/56)) ([0b3e433](https://www.github.com/googleapis/teeny-request/commit/0b3e433))

## [5.1.0](https://www.github.com/googleapis/teeny-request/compare/v5.0.0...v5.1.0) (2019-07-19)


### Features

* support forever option ([#54](https://www.github.com/googleapis/teeny-request/issues/54)) ([746d70e](https://www.github.com/googleapis/teeny-request/commit/746d70e))

## [5.0.0](https://www.github.com/googleapis/teeny-request/compare/v4.0.0...v5.0.0) (2019-07-15)


### ⚠ BREAKING CHANGES

* this is our first release since moving into googleapis org; in the theme of "better safe than sorry" we're releasing as 5.0.0.

### Bug Fixes

* export types independent of @types/request ([#44](https://www.github.com/googleapis/teeny-request/issues/44)) ([fbe2b77](https://www.github.com/googleapis/teeny-request/commit/fbe2b77))


### Reverts

* revert 4.0.0 release in favor of 5.0.0 release ([#52](https://www.github.com/googleapis/teeny-request/issues/52)) ([f24499e](https://www.github.com/googleapis/teeny-request/commit/f24499e))
