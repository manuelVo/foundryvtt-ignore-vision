import CONSTANTS from "./constants.js";
import { registerKeyBindings, registerSettings } from "./settings.js";

let isMouseDown = false;
let isTokenWithSight = false;
let ignoreVisionToggle;

Hooks.once("init", () => {
	window.ignoreVision = false;

	registerSettings();
	registerKeyBindings();

	// libWrapper.register(CONSTANTS.MODULE_NAME, "SightLayer.prototype.tokenVision", tokenVision, "MIXED");
	libWrapper.register(CONSTANTS.MODULE_NAME, "CanvasVisibility.prototype.tokenVision", tokenVision, "MIXED");

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

Hooks.once("ready", () => {
	// DO NOTHING
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
			visible: game.user.isGM
		};
	}
	const tokenControls = controls.find((group) => group.name === "token").tools;
	tokenControls.push(ignoreVisionToggle);
});

Hooks.on("preUpdateToken", (tokenDoc, change, options) => {
	if (game.settings.get(CONSTANTS.MODULE_NAME, "noTokenAnimationAsGM") && game.user.isGM) {
		options.animate = false;
	}
});

export function handleKeybinding() {
	if (!game.user.isGM || game.settings.get("core", "noCanvas")) {
		return false;
	}
	const newToggleState = !ignoreVision;
	ignoreVisionToggle.active = newToggleState;
	ui.controls.render();
	handleToggle(newToggleState);

	return true;
}

function handleToggle(toggled) {
	ignoreVision = toggled;
	canvas.perception.schedule({
		sight: {
			initialize: true,
			refresh: true,
			forceUpdateFog: true
		},
		lighting: { refresh: true },
		sounds: { refresh: true },
		foreground: { refresh: true }
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

	isMouseDown = true;

	//Check to see if any of the controlled tokens use sight
	//Check to see if any token is interactive
	for (let t of canvas.tokens.controlled) {
		if (t.interactive && t.document.sight.enabled) {
			isTokenWithSight = true;
			break;
		}
	}

	return wrapped.apply(this, args);
}

async function onDragLeftMoveHandler(wrapped, ...args) {
	if (!game.user.isGM || !canvas.scene.tokenVision || !isMouseDown || !isTokenWithSight) {
		return wrapped.apply(this, args);
	}

	canvas.scene.tokenVision = false;
	canvas.perception.refresh();

	return wrapped.apply(this, args);
}

function endDragHandler() {
	if (!game.user.isGM || !isMouseDown) {
		return;
	}
	isMouseDown = false;

	if (isTokenWithSight) {
		canvas.scene.tokenVision = true;
		canvas.perception.refresh();
		isTokenWithSight = false;
	}
}

async function onDragLeftDropHandler(wrapped, ...args) {
	endDragHandler();
	return wrapped.apply(this, args);
}

async function onDragLeftCancelHandler(wrapped, ...args) {
	endDragHandler();
	return wrapped.apply(this, args);
}
