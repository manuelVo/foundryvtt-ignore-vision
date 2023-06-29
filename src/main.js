import { libWrapper } from "./libwrapper_shim.js";

let ignoreVisionToggle;

Hooks.once("init", () => {
	window.ignoreVision = false;
	libWrapper.register(
		"ignore-vision",
		"CanvasVisibility.prototype.tokenVision",
		tokenVision,
		"MIXED"
	);

	game.keybindings.register("ignore-vision", "toggleVision", {
		name: "ignore-vision.keybinding",
		onDown: handleKeybinding,
		restricted: true,
	});
});

Hooks.on("getSceneControlButtons", (controls) => {
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
	const tokenControls = controls.find((group) => group.name === "token").tools;
	tokenControls.push(ignoreVisionToggle);
});

function handleKeybinding() {
	const newToggleState = !ignoreVision;
	ignoreVisionToggle.active = newToggleState;
	ui.controls.render();
	handleToggle(newToggleState);
}

function handleToggle(toggled) {
	ignoreVision = toggled;
	canvas.effects.visibility.refresh();
}

function tokenVision(wrapped) {
	if (ignoreVision && game.user.isGM) {
		return false;
	}
	return wrapped();
}
