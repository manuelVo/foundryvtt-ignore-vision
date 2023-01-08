import CONSTANTS from "./constants.js";
export const registerSettings = function () {
	game.settings.register(CONSTANTS.MODULE_NAME, "disableVisionOnDragAsGM", {
		name: `${CONSTANTS.MODULE_NAME}.setting.disableVisionOnDragAsGM.name`,
		hint: `${CONSTANTS.MODULE_NAME}.setting.disableVisionOnDragAsGM.hint`,
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});
};
