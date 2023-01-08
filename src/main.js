import CONSTANTS from "./constants.js";
import { registerSettings } from "./settings.js";

let ignoreVisionToggle;

Hooks.once("init", () => {
	window.ignoreVision = false;

	registerSettings();

	libWrapper.register(CONSTANTS.MODULE_NAME, "SightLayer.prototype.tokenVision", tokenVision, "MIXED");

	game.keybindings.register(CONSTANTS.MODULE_NAME, "toggleVision", {
		name: `${CONSTANTS.MODULE_NAME}.keybinding`,
		onDown: handleKeybinding,
		restricted: true,
	});

	if (game.settings.get(CONSTANTS.MODULE_NAME, "disableVisionOnDragAsGM")) {
		libWrapper.register(
			CONSTANTS.MODULE_NAME,
			"Token.prototype._onDragLeftStart",
			onDragLeftStartHandler,
			"WRAPPER"
		);

		libWrapper.register(CONSTANTS.MODULE_NAME, "Token.prototype._onDragLeftMove", onDragLeftMoveHandler, "WRAPPER");

		libWrapper.register(CONSTANTS.MODULE_NAME, "Token.prototype._onDragLeftDrop", onDragLeftDropHandler, "WRAPPER");

		libWrapper.register(
			CONSTANTS.MODULE_NAME,
			"Token.prototype._onDragLeftCancel",
			onDragLeftCancelHandler,
			"WRAPPER"
		);
	}
});

Hooks.on("getSceneControlButtons", (controls) => {
	if (!ignoreVisionToggle) {
		ignoreVisionToggle = {
			name: "ignoreVision",
			title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.toggle`),
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

async function onDragLeftStartHandler(wrapped, ...args) {
	if (!game.user.isGM || !canvas.scene.tokenVision) {
		return wrapped.apply(this, args);
	}

	inputDown = true;

	//Check to see if any of the controlled tokens use sight
	//Check to see if any token is interactive
	for (let t of canvas.tokens.controlled) {
		if (t.interactive && t.document.sight.enabled) {
			hasValidToken = true;
			break;
		}
	}

	return wrapped.apply(this, args);
}

async function onDragLeftMoveHandler(wrapped, ...args) {
	if (!game.user.isGM || !canvas.scene.tokenVision || !inputDown || !hasValidToken) {
		return wrapped.apply(this, args);
	}

	canvas.scene.tokenVision = false;
	canvas.perception.refresh();

	return wrapped.apply(this, args);
}

function endDrag() {
	if (!game.user.isGM || !inputDown) {
		return;
	}
	inputDown = false;

	if (hasValidToken) {
		canvas.scene.tokenVision = true;
		canvas.perception.refresh();
		hasValidToken = false;
	}
}

async function onDragLeftDropHandler(wrapped, ...args) {
	endDrag();
	return wrapped.apply(this, args);
}

async function onDragLeftCancelHandler(wrapped, ...args) {
	endDrag();
	return wrapped.apply(this, args);
}
