import {JetView} from "webix-jet";

export class ExcelExportIconView extends JetView {
	config() {
		return {
			view: "icon",
			icon: "mdi mdi-microsoft-excel",
			tooltip: "Скачать в Excel",
			click: function () {
				const $$enter = $$("enter:datatable");
				const $$exit = $$("exit:datatable");
				const $$excel = $$("excel:export");
				
				const leftOrderCopy = webix.copy($$enter.data.order);
				const leftPullCopy = webix.copy($$enter.data.pull);
				const rightOrderCopy = webix.copy($$exit.data.order);
				const rightPullCopy = webix.copy($$exit.data.pull);
				
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