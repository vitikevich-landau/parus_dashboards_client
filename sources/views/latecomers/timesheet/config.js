import calendar_icons from "jet-views/latecomers/calendar_icons";
import {loadData} from "../../../models/config";

const {icons: {today}} = calendar_icons;

export const date = {
	view: "popup",
	id: "date:popup",
	body: {
		view: "calendar",
		icons: [today],
	}
};

const columns = [
	{
		id: "FULLNAME",
		header: ["ФИО"],
		adjust: "data",
		sort(a, b) {
			console.log(a, b);
		}
	},
	{
		id: "NOTE",
		header: "Примечание",
		fillspace: true,
		editor: "text"
	},
	{
		id: "ACTION",
		header: ["Действие"]
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
	// scrollX: false,
	columns
};

export function onItemDblClickHandler(id, e, node) {
	if (id.column === "NOTE") {
		this.editCell(id.row, id.column);
	}
}

export function onKeyPressHandler(dataStore) {
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

export function onBeforeDropHandler(dataStore, options) {
	return function (ctx, e) {
		const {from, source, to} = ctx;
		const now = new Date;
		
		if (from.config.id === "employees_list") {
			dataStore.add({
				ID: webix.uid(),
				FULLNAME: from.getItem(source[0]).FULLNAME,
				DT: now,
				TM: now,
				...options
			}, 0);
			
			this.select(dataStore.getFirstId());
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
	collection
		.load(loadData(url))
		.catch(() =>
			webix.message({type: "error", text: "Ошибка соединения с сервером"})
		)
		.finally(() => $$view.hideProgress());
}