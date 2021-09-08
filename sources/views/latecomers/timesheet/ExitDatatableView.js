import {JetView} from "webix-jet";
import {
	configs,
	onItemDblClickHandler,
	onKeyPressHandler,
	onItemClickHandler,
	onAfterSelectHandler,
	OnBeforeDropHandler,
	foundByRelID
} from "jet-views/latecomers/timesheet/config";
import {exitCollection} from "../../../models/exitCollection";
import {enterCollection} from "../../../models/enterCollection";

export default class ExitDatatableView extends JetView {
	config() {
		return {
			...configs,
			id: "exit:datatable",
			on: {
				onItemDblClick: onItemDblClickHandler,
				onItemClick: onItemClickHandler("exit:editWindow"),
				onAfterSelect: onAfterSelectHandler({
					slider_h: "exit:slider_h",
					slider_m: "exit:slider_m"
				}),
				onKeyPress: onKeyPressHandler(exitCollection),
				// onBeforeDrop: onBeforeDropHandler(
				// 	exitCollection,
				// 	{ACTION: "ВЫХОД"}
				// ),
				onBeforeDrop: OnBeforeDropHandler(
					exitCollection,
					enterCollection,
					{ACTION: "ВЫХОД"},
					{ACTION: "ВХОД"}
				),
				onEditorChange(cell, value) {
					const item = this.getItem(cell.row);
					const {REL_ID} = item;
					const {enter} = foundByRelID(REL_ID);
					
					const $$enter = $$("enter:datatable");
					
					const ent = $$enter.getItem(enter.id);
					
					$$enter.updateItem(enter.id, {
						...ent,
						NOTE: value
					});
					
				},
				onDataUpdate(id, data, old) {
					const item = this.getItem(id);
					const {REL_ID} = item;
					const {enter, exit} = foundByRelID(REL_ID);
					
					const $$enter = $$("enter:datatable");
					const $$exit = $$("exit:datatable");
					
					$$enter.removeRowCss(enter.id, "latecomers-active");
					$$exit.removeRowCss(exit.id, "latecomers-active");
					
					$$enter.addRowCss(enter.id, "latecomers-vacation");
					$$exit.addRowCss(exit.id, "latecomers-vacation");
				},
				onAfterAdd(id, indx) {
					console.log(id, indx);
				}
			}
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		webix.extend(_$view, webix.ProgressBar);
		// _$view.showProgress();
		//
		_$view.parse(exitCollection);
		// 	.finally(() => _$view.hideProgress());
	}
	
}