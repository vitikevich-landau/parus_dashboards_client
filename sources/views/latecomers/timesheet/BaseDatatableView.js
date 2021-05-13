import {JetView} from "webix-jet";
import {format} from "../../../utils/functions";

export default class BaseDatatableView extends JetView {
	constructor(app, config) {
		super(app, config);
		
		this.icons = {
			today:  //default "today" icon
				{
					template: function () {
						return "<span class='webix_cal_icon_today webix_cal_icon'>"
							+ webix.i18n.calendar.today
							+ "</span>";
					},
					on_click: {
						"webix_cal_icon_today": function () {
							this.setValue(new Date());
							this.callEvent("onTodaySet", [this.getSelectedDate()]);
						}
					}
				},
			clear:  //default "clear" icon
				{
					template: function () {
						return "<span class='webix_cal_icon_clear webix_cal_icon'>"
							+ webix.i18n.calendar.clear
							+ "</span>";
					},
					on_click: {
						"webix_cal_icon_clear": function () {
							this.setValue("");
							this.callEvent("onDateClear", [this.getSelectedDate()]);
						}
					}
				}
		};
	}
	
	onKeyPressHandler(dataStore) {
		return function (code, e) {
			if (code === 46) {
				if (this.getEditState()) {
					return;
				}
				/***
				 * 	Close all opened editors
				 * */
				this.editCancel();
				
				const selected = this.getSelectedId();
				if (selected) {
					const next = this.getNextId(selected);
					
					webix.confirm({
						title: "Внимание!",
						type: "confirm-warning",
						text: "Это приведёт к удалению из БД. Удалить запись?"
					})
						.then(() => {
							dataStore.remove(selected);
							
							if (next) {
								this.select(next);
							}
							
							this.getBody().focus();
						});
				}
			}
		};
	}
	
	onBeforeDropHandler(dataStore, options) {
		return function (ctx, e) {
			const {from, source} = ctx;
			const now = new Date;
			
			dataStore.add({
				ID: webix.uid(),
				FULLNAME: from.getItem(source[0]).FULLNAME,
				DT: now,
				TM: now,
				...options
			}, 0);
			
			this.select(dataStore.getFirstId());
			
			return false;
		};
	}
	
	onHeaderClickHandler(id, e, target) {
		const state = this.getState().sort;
		if (state && state.dir === "desc") {
			this.sort({
				as: "int",
				dir: "asc",
				by: "id"
			});
			this.markSorting();
			this.setState(state);
			
			return false;
		}
	}
	
	onItemClickHandler(editor_id) {
		return function (id, e, target) {
			if (id.column === "TM") {
				const $$editor = $$(editor_id);
				$$editor.show(e);
				$$editor.getBody(e).focus();
			} else if (id.column !== "NOTE") {
				this.editCell(id.row, id.column);
			}
		};
	}
	
	config() {
		return {
			view: "datatable",
			columns: [
				{
					id: "FULLNAME",
					header: ["ФИО"],
					// fillspace: true,
					adjust: "data",
					sort: "string"
				},
				{
					id: "NOTE",
					header: "Примечание",
					fillspace: true,
					// adjust: "header",
					editor: "text"
				},
				{
					id: "ACTION",
					header: ["Действие"]
				},
				{
					// width: 140,
					adjust: "data",
					id: "DT",
					header: ["Дата",],
					editor: "date",
					sort: "string",
					format: webix.Date.dateToStr("%d.%m.%Y"),
					css: {cursor: "pointer"},
				},
				{
					width: 80,
					id: "TM",
					header: ["Время",],
					format: webix.Date.dateToStr("%H:%i"),
					sort: (a, b) => {
						const left = `${format(a.TM.getHours())}:${format(a.TM.getMinutes())}`;
						const right = `${format(b.TM.getHours())}:${format(b.TM.getMinutes())}`;
						
						return left > right ? 1 : (left < right ? -1 : 0);
					},
					css: {cursor: "pointer"},
					// fillspace: true,
					// adjust:"data",
				}
			],
			editable: true,
			drag: "target",
			editaction: "custom",
			select: true,
			css: "unselectable",
			resizeColumn: {headerOnly: true, size: 12},
			// scrollX: false,
			on: {
				onHeaderClick: this.onHeaderClickHandler,
				onAfterEditStop: function (state, editor, ignoreUpdate) {
				},
				onItemDblClick: function (id, e, node) {
					if (id.column === "NOTE") {
						this.editCell(id.row, id.column);
					}
				}
			}
		};
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		
		/***
		 * 	disable clear button
		 * */
		webix.editors.$popup = {
			date: {
				view: "popup",
				id: "date:popup",
				body: {
					view: "calendar",
					icons: [this.icons.today],
				}
			},
		};
	}
	
}