# Go to or pull player

![Latest Release Download Count](https://img.shields.io/github/downloads/p4535992/foundryvtt-go-to-or-pull-player/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge) 

[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fgo-to-or-pull-player&colorB=006400&style=for-the-badge)](https://forge-vtt.com/bazaar#package=go-to-or-pull-player) 

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-go-to-or-pull-player%2Fmaster%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibility.verified&colorB=orange&style=for-the-badge)

![Latest Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-go-to-or-pull-player%2Fmaster%2Fsrc%2Fmodule.json&label=Latest%20Release&prefix=v&query=$.version&colorB=red&style=for-the-badge)

[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fgo-to-or-pull-player%2Fshield%2Fendorsements&style=for-the-badge)](https://www.foundryvtt-hub.com/package/go-to-or-pull-player/)

![GitHub all releases](https://img.shields.io/github/downloads/p4535992/foundryvtt-go-to-or-pull-player/total?style=for-the-badge)

[![Translation status](https://weblate.foundryvtt-hub.com/widgets/go-to-or-pull-player/-/287x66-black.png)](https://weblate.foundryvtt-hub.com/engage/go-to-or-pull-player/)

### If you want to buy me a coffee [![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/p4535992)

A simple module for help gm to understand where the players are or should be pulled. 

The module originated as a combination of two abandoned modules [Go To Player](https://github.com/theripper93/go-to-player) and [Pull players to scene](https://github.com/Mr-Byte/pull-players-to-scene)
, which given the similarity of functions made sense to put them in the same module.

Below are the features provided by this module:

- Feature: To get the GM to a specific player (go to it's viewed scene and pan the camera to their token)
- Feature: Make pulling multiple players to a scene easier.

## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/p4535992/foundryvtt-go-to-or-pull-player/master/src/module.json`
4.  Click 'Install' and wait for installation to complete
5.  Don't forget to enable the module in game using the "Manage Module" button

### socketLib

This module uses the [socketLib](https://github.com/manuelVo/foundryvtt-socketlib) library like a dependency. It is a hard dependency and it is recommended for the best experience and compatibility with other modules.

## Known Issue\Limitation

## Feature

### Go To Player

To get the GM to a specific player (go to it's viewed scene and pan the camera to their token)

![img](wiki/go_to_player.png)

### Pull PLayers

Make pulling multiple players to a scene easier.

## Api


## [Changelog](./CHANGELOG.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/p4535992/foundryvtt-go-to-or-pull-player/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## License

- [Go To Player](https://github.com/theripper93/go-to-player) with [MIT](https://github.com/theripper93/go-to-player/blob/master/LICENSE.md)
- [Pull players to scene](https://github.com/Mr-Byte/pull-players-to-scene) with [MIT](https://github.com/Mr-Byte/pull-players-to-scene/blob/main/LICENSE)
- [Gaming Table Player](https://github.com/skepickle/foundryvtt-gaming-table-player) with [???](https://github.com/skepickle/foundryvtt-gaming-table-player)

This package is under an [MIT license](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

## Acknowledgements

Bootstrapped with League of Extraordinary FoundryVTT Developers  [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types).

## Credit

Thanks to anyone who helps me with this code! I appreciate the user community's feedback on this project!

- Ty to [theripper93](https://github.com/theripper93) for the module [Go To Player](https://github.com/theripper93/go-to-player)
- Ty to [Mr-Byte](https://github.com/Mr-Byte) for the module [Pull players to scene](https://github.com/Mr-Byte/pull-players-to-scene)
- Ty to [skepickle](https://github.com/skepickle) for the module [Gaming Table Player](https://github.com/skepickle/foundryvtt-gaming-table-player)