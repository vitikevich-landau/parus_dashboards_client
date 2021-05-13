import {JetView} from "webix-jet";

export class ExcelExportIconView extends JetView {
	config() {
		return {
			view: "icon",
			icon: "mdi mdi-microsoft-excel",
			tooltip: "Скачать в Excel",
			click: function () {
				const $$left = $$("left");
				const $$right = $$("right");
				const $$excel = $$("excel:export");
				
				const leftOrderCopy = webix.copy($$left.data.order);
				const leftPullCopy = webix.copy($$left.data.pull);
				const rightOrderCopy = webix.copy($$right.data.order);
				const rightPullCopy = webix.copy($$right.data.pull);
				
				const filtered = leftOrderCopy
					.map(v => leftPullCopy[v])
					.concat(rightOrderCopy.map(v => rightPullCopy[v]));
				
				filtered.forEach(v => $$excel.add(v));
				
				webix
					.toExcel(
						$$excel,
						{
							filename: `Данные на ${new Date().toLocaleString()}`,
							// docHeader: {text: `Imported: ${filtered.length} records`}
						}
					)
					.then(r => console.log(r))
					.finally(() => $$excel.clearAll());
			}
		};
	}
	
}