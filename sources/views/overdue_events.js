import ControlSidebar from "jet-views/dashboards/overdue_events/ControlSidebar";
import {JetView} from "webix-jet";
import GageView from "jet-views/dashboards/overdue_events/GageView";


export default class OverdueEventsView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "toolbar",
					elements: [
						{},
						{
							view: "icon",
							icon: "mdi mdi-menu",
							click: () => {
								const $$controls = $$("overdue_events:control_panel");
								
								if ($$controls.isVisible()) {
									$$controls.hide();
								} else {
									$$controls.show();
								}
							}
						},
					]
				},
				{
					cols: [
						{
							rows: [
								{
									cols: [
										GageView,
									],
								},
								{
									// template: "Another widgets here"
								}
							]
						},
						// {view: "resizer"},
						ControlSidebar
					],
				},
			]
		};
	}
}

