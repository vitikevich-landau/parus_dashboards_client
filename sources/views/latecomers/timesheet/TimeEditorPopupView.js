import {JetView} from "webix-jet";
import {format} from "../../../utils/functions";

export default class TimeEditorPopupView extends JetView {
	constructor(app, config, id) {
		super(app, config);
		
		this._id = id;
	}
	
	slideHandler(action) {
		const id = this._id;
		
		return function () {
			const grid = $$(id.split(":")[0]);
			
			const value = format(this.getValue());
			const sid = grid.getSelectedId();
			const cell = grid.getItem(sid.row);
			const time = webix.i18n.timeFormatStr(cell.TM);
			const [h, m] = time.split(":");
			
			/***
			 * 	Enable or disable keyboard control
			 * */
			grid.updateItem(
				sid.row,
				{...cell, TM: webix.i18n.timeFormatDate(action(value, [h, m]))}
			);
		};
	}
	
	config() {
		const slider_h = {
			view: "slider",
			id: `${this._id}:slider_h`,
			title: obj => format(obj.value),
			min: 0,
			max: 23,
			on: {
				onItemClick: this.slideHandler((v, [_, m]) => `${v}:${m}`),
				onSliderDrag: this.slideHandler((v, [_, m]) => `${v}:${m}`)
			}
		};
		
		const slider_m = {
			view: "slider",
			id: `${this._id}:slider_m`,
			title: obj => format(obj.value),
			min: 0,
			max: 59,
			on: {
				onItemClick: this.slideHandler((v, [h, _]) => `${h}:${v}`),
				onSliderDrag: this.slideHandler((v, [h, _]) => `${h}:${v}`)
			}
		};
		
		return {
			view: "popup",
			id: `${this._id}:editWindow`,
			width: 250,
			body: {
				view: "form",
				id: `${this._id}:form`,
				scroll: false,
				elements: [
					slider_h,
					slider_m
				],
			}
		};
	}
}