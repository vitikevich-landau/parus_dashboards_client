import {format} from "../../../utils/functions";

const slider = {
	view: "slider",
	title: v => format(v.value),
	min: 0
};

const slider_h = {
	...slider,
	id: "exit:slider_h",
	max: 23,
	on: {
		onItemClick: onClickHandler((v, [_, m]) => `${v}:${m}`),
		onSliderDrag: onClickHandler((v, [_, m]) => `${v}:${m}`)
	},
	
};
const slider_m = {
	...slider,
	id: "exit:slider_m",
	max: 59,
	on: {
		onItemClick: onClickHandler((v, [h, _]) => `${h}:${v}`),
		onSliderDrag: onClickHandler((v, [h, _]) => `${h}:${v}`)
	}
};

const form = {
	view: "form",
	id: "exit:form",
	scroll: false,
	elements: [
		slider_h,
		slider_m
	]
};

export const timeEditorPopup = {
	view: "popup",
	id: `exit:editWindow`,
	width: 250,
	body: form
};

function onClickHandler(action) {
	return function () {
		const $$table = $$("exit:datatable");
		const value = this.getValue();
		const sid = $$table.getSelectedId();
		const cell = $$table.getItem(sid.row);
		const time = webix.i18n.timeFormatStr(cell.TM);
		const [h, m] = time.split(":");
		
		/***
		 * 	To change row color
		 * */
		if (this.config.id === "exit:slider_h") {
			$$table.callEvent("onAfterEditStop", [
					{value, old: +h}, {column: "TM", row: sid.row}, undefined
				]
			);
		} else {
			$$table.callEvent("onAfterEditStop", [
					{value, old: +m}, {column: "TM", row: sid.row}, undefined
				]
			);
		}
		
		
		$$table.updateItem(
			sid.row,
			{
				...cell,
				DT: webix.Date.datePart(cell.DT, true),
				TM: webix.i18n.timeFormatDate(action(value, [h, m]))
			}
		);
	};
}