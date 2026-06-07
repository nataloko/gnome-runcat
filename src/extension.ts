import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js'
import { panel as MainPanel } from 'resource:///org/gnome/shell/ui/main.js'
import type { Button as PanelMenuButton } from 'resource:///org/gnome/shell/ui/panelMenu.js'

import RunCatIndicator from './indicator.js'
import {
	gioSettingsKeys,
	panelPositionToBoxName,
	type PanelPositionOption,
} from './constants.js'


export default class RunCatExtension extends Extension {
	#indicator: PanelMenuButton | null = null
	// #settingsChangedId: number | null = null // Removed live update logic

	enable() {
		this.#indicator = new RunCatIndicator(this)

		const settings = this.getSettings()

		const position = settings.get_enum(
			gioSettingsKeys.PANEL_POSITION,
		) as PanelPositionOption

		const boxName = panelPositionToBoxName[position]

		MainPanel.addToStatusArea('runcat-indicator', this.#indicator, 0, boxName)
	}

	disable() {
		// No settings listener to disconnect
		this.#indicator?.destroy()
		this.#indicator = null
	}
}
