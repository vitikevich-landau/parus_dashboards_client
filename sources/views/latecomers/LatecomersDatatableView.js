import {JetView} from "webix-jet";
import {addPickedDateToDtItems, generateColumns} from "jet-views/latecomers/functions";
import {API_SERVICE_URL} from "../../config";

export default class LatecomersDatatableView extends JetView {
	config() {
		const datepicker$$ = $$("datepicker");
		
		const date = datepicker$$.getValue();
		const year = date.getFullYear();
		const monthNum = date.getMonth() + 1;
		const days = new Date(year, monthNum, 0).getDate();
		
		return {
			view: "datatable",
			id: "latecomers",
			url: `${API_SERVICE_URL}/latecomers`,
			save: function (id, operation, update) {
				this.showProgress({type: "bottom"});
				const data = addPickedDateToDtItems(this, $$("datepicker"));
				webix
					.ajax()
					.post(`${API_SERVICE_URL}/latecomers`, data)
					.then(response => response.json())
					.then(json => console.log(json))
					.catch(() => webix.message({type: "error", text: "Ошибка соединения с сервером"}))
					.finally(() => this.hideProgress())
				;
			},
			css: "webix_header_border webix_data_border",
			select: "row",
			editable: true,
			editaction: "dblclick",
			leftSplit: 1,
			resizeColumn: {headerOnly: true, size: 12},
			columns: [
				{
					id: "FULLNAME",
					header: "ФИО",
					fillspace: true,
					minWidth: 270,
					sort: "string",
					resize: true
				},
				...generateColumns(days)
			],
			on: {
				onBeforeLoad: function () {
					webix.extend(this, webix.ProgressBar);
					
					this.showProgress();
				},
				onAfterLoad: function () {
					this.hideProgress();
					
					/***
					 *  Change column width after data load
					 *e
					 *  Глюк с мерцинием
					 * */
					const cols = this
						.config
						.columns
						.map(v => v.id)
						.filter(v => v[0] === "D");
					
					cols.forEach(v => {
						this.getColumnConfig(v).adjust = true;
						this.refreshColumns();
					});
					
				},
				onHeaderClick: function (id, e, target) {
					let state = this.getState().sort;
					if (state && state.dir === "desc") {
						this.sort({
							as: "int",
							dir: "asc",
							by: "id" // имя поля
						});
						
						this.markSorting();
						this.setState(state);
						
						return false;
					}
				},
				onItemClick: function (id, event, node) {
					const pickedMon = $$("datepicker")
						.getValue()
						.getMonth() + 1;
					const currMon = new Date().getMonth() + 1;
					const currDay = new Date().getDate();
					
					/***
					 * Change cells color
					 * */
					this.data.each((object, index) => {
						Object.keys(object).forEach(
							v => {
								this.removeCellCss(object.id, v, "webix_row_select");
								this.removeCellCss(object.id, v, "bordered");
								
								if (id.column !== "FULLNAME"
									&& (currMon !== pickedMon || !id.column.includes(currDay))) {
									this.addCellCss(object.id, id.column, "webix_row_select");
								}
								
								if (object.id === id.row) {
									this.addCellCss(object.id, v, "webix_row_select");
								}
							}
						);
					});
					
					this.addCellCss(id.row, id.column, "bordered");
					
					/***
					 * Change header color
					 * */
					this.config.columns.forEach(v => {
						if (currMon !== pickedMon
							|| !v.header[0].text.includes(currDay)) {
							v.header[0].css = "";
						}
					});
					
					if (currMon !== pickedMon
						|| !id.column.includes(currDay)) {
						this.getColumnConfig(id.column)
							.header[0].css = {background: "#c9eaf5"};
					}
					
					this.refreshColumns();
					
					
					// this.data.each((object, index) => {
					// 	const cols = Object.keys(object);
					// 	cols.forEach(v => {
					// 		this.removeCellCss(object.id, v, "latecomers-selected-cell");
					// 	});
					// });
					//
					// this.addCellCss(id.row, id.column, "latecomers-selected-cell");
					
				},
				onAfterEditStop: function (state, editor, ignoreUpdate) {
					if (!state.value && !state.old) {
						return;
					}
					
					this.adjustColumn(editor.column);
				}
			},
		};
	}
	
	_update(view) {
		const url = view.data.url;
		view.clearAll();
		view.load(url);
	}
	
	init(_$view, _$) {
		super.init(_$view, _$);
		const MILLISECONDS = 1000;
		const SECONDS = 60;
		const MINUTES = 15;
		
		this.refreshDataInterval = setInterval(
			this._update,
			MINUTES * SECONDS * MILLISECONDS,
			_$view
		);
	}
	
	destroy() {
		super.destroy();
		
		clearInterval(this.refreshDataInterval);
	}
	
}