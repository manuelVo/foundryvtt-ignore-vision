import { libWrapper } from "./libwrapper_shim.js";

let ignoreVisionToggle;

Hooks.once("init", () => {
	window.ignoreVision = false;
	libWrapper.register("ignore-vision", "SightLayer.prototype.tokenVision", tokenVision, "MIXED");
});

Hooks.on("getSceneControlButtons", controls => {
	if (!ignoreVisionToggle) {
		ignoreVisionToggle = {
			name: "ignoreVision",
			title: game.i18n.localize("ignore-vision.toggle"),
			icon: "far fa-eye-slash",
			toggle: true,
			active: ignoreVision,
			onClick: handleToggle,
			visible: game.user.isGM,
		};
	}
	const tokenControls = controls.find(group => group.name === "token").tools;
	tokenControls.push(ignoreVisionToggle);
});

function handleToggle(toggled) {
	ignoreVision = toggled;
	canvas.perception.schedule({
		sight: {
			initialize: true,
			refresh: true,
			forceUpdateFog: true,
		},
		lighting: { refresh: true },
		sounds: { refresh: true },
		foreground: { refresh: true },
	});
}

function tokenVision(wrapped) {
	if (ignoreVision && game.user.isGM) {
		return false;
	}
	return wrapped();
}
