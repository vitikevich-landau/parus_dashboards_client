import BaseDatatableView from "jet-views/latecomers/timesheet/BaseDatatableView";
import {arrivalCollection} from "../../../models/ArrivalCollection";

export default class ArrivalDatatableView extends BaseDatatableView {
	config() {
		const {on, ...configs} = super.config();
		
		return {
			id: "left",
			on: {
				...on,
				onBeforeDrop: this.onBeforeDropHandler(arrivalCollection.getData(), {ACTION: "ВХОД"}),
				onItemClick: this.onItemClickHandler("left:editWindow"),
				onAfterSelect: function (data, preserve) {
					const selected = this.getItem(data.id);
					const time = webix.i18n.timeFormatStr(selected.TM);
					
					const [hours, minutes] = time.split(":");
					//
					$$("left:slider_h").setValue(hours);
					$$("left:slider_m").setValue(minutes);
				},
				onKeyPress: this.onKeyPressHandler(arrivalCollection.getData())
			},
			...configs
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		_$view.parse(arrivalCollection.getData());
		
	}
	
	urlChange(_$view, _$url) {
		super.urlChange(_$view, _$url);
		
		arrivalCollection.refresh();
	}
	
	ready(_$view, _$url) {
		super.ready(_$view, _$url);

		// /***
		//  * 	Add popups to App
		//  * */
		// this._leftPopup = new TimeEditorPopupView(
		// 	this.app,
		// 	"Arrival time editor",
		// 	"left"
		// );
		//
		// webix.ui(
		// 	this._leftPopup.config()
		// );
	}
	
	// destroy() {
	// 	super.destroy();
	//
	// 	// console.log(this.getSubView("left"));
	// 	this._leftPopup.destroy();
	// }
}