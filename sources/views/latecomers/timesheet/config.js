import calendar_icons from "jet-views/latecomers/calendar_icons";
import {loadData} from "../../../models/config";
import {enterCollection} from "../../../models/enterCollection";
import {exitCollection} from "../../../models/exitCollection";

const {icons: {today}} = calendar_icons;

export const date = {
	view: "popup",
	id: "date:popup",
	body: {
		view: "calendar",
		icons: [today],
	},
};

const columns = [
	{
		id: "FULLNAME",
		header: ["ФИО"],
		adjust: "data",
		// sort(a, b) {
		// 	// console.log(a, b);
		// }
		css: "activve"
	},
	{
		id: "NOTE",
		header: "Примечание",
		fillspace: true,
		editor: "text"
	},
	{
		id: "ACTION",
		header: ["Действие"],
		css: "activve"
	},
	{
		adjust: "data",
		id: "DT",
		header: ["Дата",],
		editor: "date",
		format: webix.Date.dateToStr("%d.%m.%Y"),
		css: {cursor: "pointer"},
	},
	{
		width: 80,
		id: "TM",
		header: ["Время",],
		format: webix.Date.dateToStr("%H:%i"),
		css: {cursor: "pointer"},
	}
];

export const configs = {
	view: "datatable",
	editable: true,
	drag: true,
	editaction: "custom",
	select: true,
	css: "unselectable",
	resizeColumn: {headerOnly: true, size: 12},
	navigation: false,
	// scrollX: false,
	columns
};

export function OnAfterEditStop(state, editor, ignoreUpdate) {
	const {value, old} = state;
	const {column, row} = editor;
	
	const item = this.getItem(row);
	const {REL_ID} = item;
	const {enter, exit} = foundByRelID(REL_ID);
	
	const $$enter = $$("enter:datatable");
	const $$exit = $$("exit:datatable");
	
	switch (column) {
		case "TM": {
			if (value !== old) {
				$$enter.removeRowCss(enter.id, "latecomers-active");
				$$exit.removeRowCss(exit.id, "latecomers-active");
				
				$$enter.addRowCss(enter.id, "latecomers-vacation");
				$$exit.addRowCss(exit.id, "latecomers-vacation");
			}
		}
			break;
		case "NOTE": {
			const old_ = old === undefined ? "" : old === null ? "" : old;
			
			if (value !== old_) {
				$$enter.updateItem(enter.id, {
					...$$enter.getItem(enter.id),
					NOTE: value
				});
				
				$$enter.removeRowCss(enter.id, "latecomers-active");
				$$exit.removeRowCss(exit.id, "latecomers-active");
				
				$$enter.addRowCss(enter.id, "latecomers-vacation");
				$$exit.addRowCss(exit.id, "latecomers-vacation");
			}
		}
			break;
		case "DT": {
			const value_ = webix.Date.datePart(value, true);
			
			if (!webix.Date.equal(value_, webix.Date.datePart(old, true))
			) {
				$$enter.updateItem(enter.id, {
					...$$enter.getItem(enter.id),
					DT: value_
				});
				
				$$exit.updateItem(exit.id, {
					...$$exit.getItem(exit.id),
					DT: value_
				});
				
				$$enter.removeRowCss(enter.id, "latecomers-active");
				$$exit.removeRowCss(exit.id, "latecomers-active");
				
				$$enter.addRowCss(enter.id, "latecomers-vacation");
				$$exit.addRowCss(exit.id, "latecomers-vacation");
				
				// $$enter.sort({as: "bydate", dir: "desc", by: "DT"});
				// $$exit.sort({as: "bydate", dir: "desc", by: "DT"});
				
			}
		}
			break;
	}
}

export function onItemDblClickHandler(id, e, node) {
	if (id.column === "NOTE") {
		this.editCell(id.row, id.column);
	}
}

export function onKeyPressHandler() {
	return function (code, e) {
		console.log(code);
		switch (code) {
			/***
			 *	F2 key
			 * */
			case 113: {
				const selected = this.getSelectedId();
				
				if (selected) {
					this.editCell(selected.row, "NOTE");
				}
			}
				break;
			case 36:
				if (this.getEditState()) {
					return;
				}
				selectBothItems(this, this.getFirstId());
				break;
			case 35:
				if (this.getEditState()) {
					return;
				}
				selectBothItems(this, this.getLastId());
				break;
			/****
			 * 	left
			 * */
			case 37:
				if (this.getEditState()) {
					return;
				}
				selectBothItems(this, this.getSelectedId());
				
				webix.UIManager.setFocus($$("exit:datatable"));
				break;
			/****
			 * 	right
			 * */
			case 39:
				if (this.getEditState()) {
					return;
				}
				selectBothItems(this, this.getSelectedId());
				
				webix.UIManager.setFocus($$("enter:datatable"));
				break;
			case 38:
				if (this.getEditState()) {
					return;
				}
				selectBothItems(this, this.getPrevId(this.getSelectedId()));
				break;
			case 40:
				if (this.getEditState()) {
					return;
				}
				selectBothItems(this, this.getNextId(this.getSelectedId()));
				break;
			case 46: {
				if (this.getEditState()) {
					return;
				}
				/***
				 * 	Close all opened editors
				 * */
				this.editCancel();
				
				const selected = this.getSelectedId();
				
				if (selected) {
					webix.confirm({
						title: "Внимание!",
						type: "confirm-warning",
						text: "Это приведёт к удалению из БД. Удалить запись?"
					})
						.then(() => {
							const {REL_ID} = this.getItem(selected);
							const {exit, enter} = foundByRelID(REL_ID);
							
							const next = this.getNextId(selected);
							
							if (next) {
								this.select(next);
								
								const {REL_ID} = this.getItem(next);
								const {exit, enter} = foundByRelID(REL_ID);
								
								$$("enter:datatable").select(enter.id);
								$$("exit:datatable").select(exit.id);
							}
							
							exitCollection.remove(exit.id);
							enterCollection.remove(enter.id);
							
							webix.message({
								text: `Запись: "${enter.FULLNAME}" удалена`,
								type: `debug`,
								expire: 8000
							});
							
						})
						.catch(e => console.log(e))
						.finally(() => webix.UIManager.setFocus(this));
					
				}
			}
				break;
		}
	};
}

export function OnBeforeDropHandler(sourceStore, store, sourceStoreAction, storeAction) {
	return function (ctx, e) {
		const {from, source, to} = ctx;
		const now = new Date();
		const relID = webix.uid();
		let time = null;
		
		if (from.config.id === "employees_list") {
			
			if (to.config.id === "exit:datatable") {
				time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);
			} else {
				time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
			}
			
			sourceStore.add({
				ID: webix.uid(),
				REL_ID: relID,
				FULLNAME: from.getItem(source[0]).FULLNAME,
				DT: webix.Date.datePart(now, true),
				TM: now,
				...sourceStoreAction
			}, 0);
			
			store.add({
				ID: webix.uid(),
				REL_ID: relID,
				FULLNAME: from.getItem(source[0]).FULLNAME,
				DT: webix.Date.datePart(now, true),
				TM: time,
				...storeAction
			}, 0);
			
			const $$enter = $$("enter:datatable");
			const $$exit = $$("exit:datatable");
			
			const exitFirstID = $$exit.getFirstId();
			const enterFirstID = $$enter.getFirstId();
			
			
			$$enter.select(enterFirstID);
			$$enter.showItem(enterFirstID);
			
			$$exit.select(exitFirstID);
			$$exit.showItem(exitFirstID);
			
			/***
			 * 	Colored new item
			 * */
			$$enter.addRowCss(enterFirstID, "latecomers-active");
			$$exit.addRowCss(exitFirstID, "latecomers-active");
		}
		
		return false;
	};
}

export function onItemClickHandler(timeEditWindowId) {
	return function (id, e, target) {
		const $$editor = $$(timeEditWindowId);
		
		const editor = this.getEditor();
		if (editor && editor.popupType === "date") {
			this.editCancel();
		}
		
		if (id.column === "TM") {
			$$editor.show(e);
			$$editor.getBody(e).focus();
		} else if (id.column !== "NOTE") {
			this.editCell(id.row, id.column);
		}
		
		const selected = this.getSelectedId();
		const {REL_ID} = this.getItem(selected);
		
		if (this.config.id === `enter:datatable`) {
			const [item] = $$("exit:datatable").find(v => v.REL_ID === REL_ID);
			$$(`exit:datatable`).select(item.id);
			$$(`exit:datatable`).showItem(item.id);
		} else {
			const [item] = $$("enter:datatable").find(v => v.REL_ID === REL_ID);
			$$(`enter:datatable`).select(item.id);
			$$(`enter:datatable`).showItem(item.id);
		}
		
	};
}

export function onAfterSelectHandler(slidersIds) {
	return function (data, preverse) {
		const {slider_h, slider_m} = slidersIds;
		
		const selected = this.getItem(data.id);
		const time = webix.i18n.timeFormatStr(selected.TM);
		
		const [hours, minutes] = time.split(":");
		//
		$$(slider_h).setValue(hours);
		$$(slider_m).setValue(minutes);
	};
}

export function reloadTimeSheetTables(url, collection, $$view) {
	$$view.showProgress();
	
	collection.clearAll();
	
	return collection
		.load(loadData(url))
		.finally(() => $$view.hideProgress());
}

export function foundByRelID(relID) {
	const [exit] = exitCollection.find(v => v.REL_ID === relID);
	const [enter] = enterCollection.find(v => v.REL_ID === relID);
	
	return {exit, enter};
}

function selectBothItems($$view, selected) {
	if (selected) {
		const {REL_ID} = $$view.getItem(selected);
		const {exit, enter} = foundByRelID(REL_ID);
		const $$enter = $$("enter:datatable");
		const $$exit = $$("exit:datatable");
		
		$$enter.select(enter.id);
		$$exit.select(exit.id);
		
		$$enter.showItem(enter.id);
		$$exit.showItem(exit.id);
	}
}