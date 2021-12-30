# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2021-12-29

### Added

- More config parameters.

### Changed

- Removed web scraping title checking.

## [0.1.1] - 2021-12-25

### Added

- Customized config parameters.

## [0.1.0] - 2021-12-24

### Added

- Automate all steps from search to paste.

### Changed

- Use Semantic Scholar API.
- Remove `clip` command.
- Renamed `Search` command to `loopup`.

## [0.0.3] - 2021-12-22

### Added

- Prioritize journal over preprint DOIs, if there is any.

## [0.0.2] - 2021-12-21

### Changed

- Split `clip` into two parts: sync paste citekey and async paste BibTeX.

### Added

- Find DOI based on Crossref API and BibTeX title.

## [0.0.1] - 2021-12-20

### Changed

- Renamed project to `easybib`.
- Remove popup message for clip command.

### Added

- Auto search bib file or create a new one.
- Copy & paste BibTeX citekey to cursor.

## [0.0.1] - 2021-12-19

### Added

- `search` command to trigger Google Scholar search.
- `clip` command to copy bib text to local ref.bib file.
