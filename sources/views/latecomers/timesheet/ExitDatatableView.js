import {JetView} from "webix-jet";
import {
	configs,
	onItemDblClickHandler,
	onKeyPressHandler,
	onItemClickHandler,
	onAfterSelectHandler,
	OnBeforeDropHandler,
	OnAfterEditStop
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
				onAfterEditStop: OnAfterEditStop,
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