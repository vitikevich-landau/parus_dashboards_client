import {JetView} from "webix-jet";
import {
	configs,
	onAfterSelectHandler,
	OnBeforeDropHandler,
	onItemClickHandler,
	onItemDblClickHandler,
	onKeyPressHandler
} from "jet-views/latecomers/timesheet/config";
import {enterCollection} from "../../../models/enterCollection";
import {exitCollection} from "../../../models/exitCollection";

export default class EnterDatatableView extends JetView {
	config() {
		const {columns} = configs;
		const [fullnameColumn] = columns;
		const cols = [
			fullnameColumn, {
				id: "NOTE",
				header: "Примечание",
				fillspace: true,
				// editor: "text"
			},
			...columns.slice(2)
		];
		
		return {
			...configs,
			columns: cols,
			id: "enter:datatable",
			on: {
				onItemDblClick: onItemDblClickHandler,
				onItemClick: onItemClickHandler("enter:editWindow"),
				onAfterSelect: onAfterSelectHandler({
					slider_h: "enter:slider_h",
					slider_m: "enter:slider_m"
				}),
				onKeyPress: onKeyPressHandler(enterCollection),
				// onBeforeDrop: onBeforeDropHandler(
				// 	enterCollection,
				// 	{ACTION: "ВХОД"}
				// ),
				onBeforeDrop: OnBeforeDropHandler(
					enterCollection,
					exitCollection,
					{ACTION: "ВХОД"},
					{ACTION: "ВЫХОД"}
				),
				
			},
		};
		
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		webix.extend(_$view, webix.ProgressBar);
		// _$view.showProgress();
		//
		_$view.parse(enterCollection);
		// 	.finally(() => _$view.hideProgress());
	}
	
}