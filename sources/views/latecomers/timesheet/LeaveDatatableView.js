import BaseDatatableView from "jet-views/latecomers/timesheet/BaseDatatableView";
import {leaveCollection} from "../../../models/LeaveCollection";

export default class LeaveDatatableView extends BaseDatatableView {
	config() {
		const {on, ...configs} = super.config();
		
		return {
			id: "right",
			on: {
				...on,
				onBeforeDrop: this.onBeforeDropHandler(leaveCollection.getData(), {ACTION: "ВЫХОД"}),
				onItemClick: this.onItemClickHandler("right:editWindow"),
				onAfterSelect: function (data, preserve) {
					const selected = this.getItem(data.id);
					const time = webix.i18n.timeFormatStr(selected.TM);
					
					const [hours, minutes] = time.split(":");
					
					$$("right:slider_h").setValue(hours);
					$$("right:slider_m").setValue(minutes);
				},
				onKeyPress: this.onKeyPressHandler(leaveCollection.getData()),
				onAfterDrag: function (context, e) {
					// console.log("onDragOut");
					
					console.log(context);
					
					return false;
				}
			},
			...configs,
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(leaveCollection.getData());
	}
	
	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);

		leaveCollection.refresh();
	}
}