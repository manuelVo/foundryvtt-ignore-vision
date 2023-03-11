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

	// =========================================================
	/*
	libWrapper.register(
		CONSTANTS.MODULE_NAME,
		"TokenLayer.prototype._getCycleOrder",
		function (wrapped, ...args) {
			let observable = wrapped(...args);
			if (game.settings.get(CONSTANTS.MODULE_NAME, "blindTokensControllable") == "No") {
				observable = observable.filter((t) => {
					return tokenHasSight(t);
				});
			}
			return observable;
		},
		"WRAPPER"
	);

	libWrapper.register(
		CONSTANTS.MODULE_NAME,
		"Token.prototype.control",
		function (wrapped, ...args) {
			if (
				!game.user.isGM &&
				canvas.sight.tokenVision &&
				!this.hasSight &&
				game.settings.get(CONSTANTS.MODULE_NAME, "blindTokensControllable") == "No"
			) {
				this._controlled = true;
				// calling the wrapped function will cause clicking a blind owned token to be act like clicking on an unowned token.
				wrapped(...args);
				this._controlled = false;
				return this._controlled;
			}
			return wrapped(...args);
		},
		"WRAPPER"
	);

	libWrapper.register(
		CONSTANTS.MODULE_NAME,
		"Token.prototype.isVisible",
		function (wrapped) {
			const blindTokensControllable =
				game.settings.get(CONSTANTS.MODULE_NAME, "blindTokensControllable") == "Yes";
			if (!game.user.isGM && this._controlled && !tokenHasSight(this) && !blindTokensControllable) {
				this.release();
			}

			if (wrapped()) {
				return true;
			}
			if (this._controlled) {
				return true;
			}
			if (!game.user.isGM) {
				if (this.actor) {
					let canObserve = tokenTestPerm(this, game.user, "OBSERVER");
					if (
						canObserve &&
						(blindTokensControllable || !canvas.sight.tokenVision || this._isVisionSource())
					) {
						return true;
					}
				}
			}
			return false;
		},
		"MIXED"
	);
	*/
	/*
	libWrapper.register(CONSTANTS.MODULE_NAME, "Token.prototype._isVisionSource", seeWrapper, "MIXED");
	*/
});

Hooks.once("ready", () => {
	// =========================================================
	/*
	libWrapper.register(CONSTANTS.MODULE_NAME, "Token.prototype.updateSource", lightwrapper, "WRAPPER");

	libWrapper.register(CONSTANTS.MODULE_NAME, "Token.prototype.updateLightSource", lightwrapper, "WRAPPER");
	canvas.perception.initialize();
	*/
});

Hooks.on("getSceneControlButtons", (controls) => {
	// const lighting = controls.find(c => c.name === "lighting");
	// if (!lighting) {
	// 	return;
	// }

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

// function seeWrapper(wrapped, ...args) {
// 	const computerSaysYes = wrapped(); // always chain wrapper even if we may never use the result - on the chance another module needs it's version executed

// 	if (game.settings.get(CONSTANTS.MODULE_NAME, "hiddenCanSee") == "No") {
// 		return computerSaysYes;
// 	}
// 	// if (
// 	// 	computerSaysYes &&
// 	// 	(this.data._id == XXX.lastControlledToken?.data._id || !canvas.sight.tokenVision)
// 	// ) {
// 	// 	return true;
// 	// }

// 	if (!canvas.sight.tokenVision || !this.hasSight) {
// 		return false; // deliberately ignore hidden status on this line
// 	}
// 	if (game.user.isGM) {
// 		if (this._controlled) return true;
// 	} else {
// 		if (!tokenHasSight(this)) {
// 			return false;
// 		}
// 	}

// 	return false;
// }

// function lightwrapper(wrapped, ...args) {
// 	if (this.data.hidden && this.emitsLight && game.settings.get(CONSTANTS.MODULE_NAME, "hiddenCanLight") == "Yes") {
// 		this.data.hidden = false;
// 		const wrappedresult = wrapped(...args);
// 		this.data.hidden = true;
// 		return wrappedresult;
// 	} else {
// 		return wrapped(...args);
// 	}
// }
