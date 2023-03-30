# Ignore Vision

![Latest Release Download Count](https://img.shields.io/github/downloads/manuelVo/foundryvtt-ignore-vision/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge)

[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fignore-vision&colorB=006400&style=for-the-badge)](https://forge-vtt.com/bazaar#package=ignore-vision)

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FmanuelVo%2Ffoundryvtt-ignore-vision%2Fmaster%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibility.verified&colorB=orange&style=for-the-badge)

![Latest Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FmanuelVo%2Ffoundryvtt-ignore-vision%2Fmaster%2Fsrc%2Fmodule.json&label=Latest%20Release&prefix=v&query=$.version&colorB=red&style=for-the-badge)

[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fignore-vision%2Fshield%2Fendorsements&style=for-the-badge)](https://www.foundryvtt-hub.com/package/ignore-vision/)

![GitHub all releases](https://img.shields.io/github/downloads/manuelVo/foundryvtt-ignore-vision/total?style=for-the-badge)

[![Translation status](https://weblate.foundryvtt-hub.com/widgets/ignore-vision/-/287x66-black.png)](https://weblate.foundryvtt-hub.com/engage/ignore-vision/)

- Adds a toggle to GM's token control menu, that allows them to ignore the vision of tokens. This makes it possible to see the entire map while moving tokens with vision around. This is managed from scene control setting

- The vision mode is toggled by a keybinding (default: `CTRL+I`). The light bulb icon of the lighting controls button indicates whether it's active (<img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/eye-slash.svg" width="16px" height="16px" style="filter: invert(100%);">: inactive; <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/eye.svg" width="16px" height="16px" style="filter: invert(100%);">: active).

- The module provides the feature to disables the vision limitation when dragging a token as GM. Useful for not show the map to player when you move some token on the map. This is managed from a module setting.

- The module provides the feature to remove token movement animations for the GM. Useful if you hate to see the movement of the token on the map. This is managed from a module setting.

**NOTE:** This module work very well with the module [GM Vision](https://github.com/dev7355608/gm-vision)

## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/manuelVo/foundryvtt-ignore-vision/master/src/module.json`
4.  Click 'Install' and wait for installation to complete
5.  Don't forget to enable the module in game using the "Manage Module" button

### libWrapper

This module uses the [libWrapper](https://github.com/ruipin/fvtt-lib-wrapper) library for wrapping core methods. It is a hard dependency and it is recommended for the best experience and compatibility with other modules.

## Known Issue\Limitation

## Api


## [Changelog](./CHANGELOG.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/manuelVo/foundryvtt-ignore-vision/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## License

This package is under an [MIT license](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

## Acknowledgements

Bootstrapped with League of Extraordinary FoundryVTT Developers  [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types).

## Credit

Thanks to anyone who helps me with this code! I appreciate the user community's feedback on this project!
