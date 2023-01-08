import CONSTANTS from "./constants.js";
import { handleKeybinding } from "./main.js";
export const registerSettings = function () {
	game.settings.register(CONSTANTS.MODULE_NAME, "disableVisionOnDragAsGM", {
		name: `${CONSTANTS.MODULE_NAME}.setting.disableVisionOnDragAsGM.name`,
		hint: `${CONSTANTS.MODULE_NAME}.setting.disableVisionOnDragAsGM.hint`,
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});

	game.settings.register(CONSTANTS.MODULE_NAME, "noTokenAnimation", {
		name: `${CONSTANTS.MODULE_NAME}.setting.noTokenAnimation.name`,
		hint: `${CONSTANTS.MODULE_NAME}.setting.noTokenAnimation.hint`,
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});
};

export const registerKeyBindings = function () {
	game.keybindings.register(CONSTANTS.MODULE_NAME, "toggleVision", {
		name: `${CONSTANTS.MODULE_NAME}.keybinding.toggleVision.name`,
		name: `${CONSTANTS.MODULE_NAME}.keybinding.toggleVision.hint`,
		editable: [{ key: "KeyI" }],
		restricted: true,
		onDown: handleKeybinding,
	});
};
