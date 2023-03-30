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

	game.settings.register(MODULE_ID, SETTING_NAME, {
		name: game.i18n.localize("NTVA.SettingName"),
		hint: game.i18n.localize("NTVA.SettingHint"),
		scope: "world",
		type: String,
		choices: {
			foundry: game.i18n.localize("NTVA.SettingFoundry"),
			disableAll: game.i18n.localize("NTVA.SettingDisableAll"),
			disableGM: game.i18n.localize("NTVA.SettingDisableGM")
		},
		default: "foundry",
		config: true,
		onChange: (value) => {
			parseSetting(value);
		}
	});
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
