import CONSTANTS from "./constants.js";
import { handleKeybinding } from "./main.js";
export const registerSettings = function () {
	game.settings.register(CONSTANTS.MODULE_NAME, "disableVisionOnDragAsGM", {
		name: `${CONSTANTS.MODULE_NAME}.setting.disableVisionOnDragAsGM.name`,
		hint: `${CONSTANTS.MODULE_NAME}.setting.disableVisionOnDragAsGM.hint`,
		scope: "world",
		config: true,
		default: false,
		type: Boolean
	});

	game.settings.register(CONSTANTS.MODULE_NAME, "noTokenAnimationAsGM", {
		name: `${CONSTANTS.MODULE_NAME}.setting.noTokenAnimationAsGM.name`,
		hint: `${CONSTANTS.MODULE_NAME}.setting.noTokenAnimationAsGM.hint`,
		scope: "world",
		config: true,
		default: false,
		type: Boolean
	});

	// game.settings.register(moduleName, "hiddenCanLight", {
	// 	name: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.hiddenCanLight"),
	// 	hint: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.hiddenCanLightHint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	choices: {
	// 		Yes: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.hiddenCanLightYES"),
	// 		No: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.hiddenCanLightNO"),
	// 	},
	// 	default: "Yes",
	// });

	// game.settings.register(moduleName, "hiddenCanSee", {
	// 	name: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.hiddenCanSee"),
	// 	hint: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.hiddenCanSeeHint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	choices: {
	// 		Yes: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.hiddenCanSeeYES"),
	// 		No: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.hiddenCanSeeNO"),
	// 	},
	// 	default: "Yes",
	// });

	// game.settings.register(moduleName, "blindTokensControllable", {
	// 	name: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.blindTokensControllable"),
	// 	hint: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.blindTokensControllableHint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	choices: {
	// 		Yes: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.blindTokensControllableYES"),
	// 		No: game.i18n.localize(CONSTANTS.MODULE_NAME + ".setting.blindTokensControllableNO"),
	// 	},
	// 	default: "Yes",
	// 	onChange: (value) => {
	// 		API.blindControllable = value;
	// 	},
	// });
};

export const registerKeyBindings = function () {
	game.keybindings.register(CONSTANTS.MODULE_NAME, "toggleVision", {
		name: `${CONSTANTS.MODULE_NAME}.keybinding.toggleVision.name`,
		name: `${CONSTANTS.MODULE_NAME}.keybinding.toggleVision.hint`,
		// editable: [{ key: "KeyI" }],
		// Ctrl + I
		editable: [{ key: "KeyI", modifiers: [KeyboardManager.MODIFIER_KEYS.CONTROL] }],
		restricted: true,
		onDown: handleKeybinding
	});
};
