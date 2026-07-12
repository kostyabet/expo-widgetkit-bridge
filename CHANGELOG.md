# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] — 2026-07-12

### Added
- `isLockScreenSupported()` — runtime guard for iOS 16+ (where the three `accessory*` widget families become available).
- `getLockScreenConfigurations()` — installed widgets filtered to the accessory families (`accessoryCircular`, `accessoryRectangular`, `accessoryInline`).
- `getHomeScreenConfigurations()` — installed widgets excluding accessory families.
- `hasWidget(kind)` — quick boolean lookup for a specific widget `kind`.
- `getFamiliesForKind(kind)` — list of families the user has installed for a given `kind`.

## [0.1.2] — 2026-07-12

### Fixed
- Move the podspec into `ios/` so `expo-modules-autolinking` discovers it. Previously the top-level podspec was skipped by `listFilesInDirectories`, causing `Cannot find native module 'ExpoWidgetkitBridge'` at runtime.

## [0.1.1] — 2026-07-10

### Changed
- Added a hero illustration to the README.

## [0.1.0] — 2026-07-08

### Added
- Initial release.
- `reloadAllTimelines()` — reload every WidgetKit timeline in the app.
- `reloadTimelines(kind)` — reload a single widget kind.
- `getCurrentConfigurations()` — enumerate the widgets the user has installed.

[Unreleased]: https://github.com/kostyabet/expo-widgetkit-bridge/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/kostyabet/expo-widgetkit-bridge/releases/tag/v0.2.0
[0.1.2]: https://github.com/kostyabet/expo-widgetkit-bridge/releases/tag/v0.1.2
[0.1.1]: https://github.com/kostyabet/expo-widgetkit-bridge/releases/tag/v0.1.1
[0.1.0]: https://github.com/kostyabet/expo-widgetkit-bridge/releases/tag/v0.1.0
