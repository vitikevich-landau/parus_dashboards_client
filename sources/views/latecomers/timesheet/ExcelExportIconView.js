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
				
				const enterOrder = webix.copy($$enter.data.order);
				const enterPull = webix.copy($$enter.data.pull);
				const exitOrder = webix.copy($$exit.data.order);
				const exitPull = webix.copy($$exit.data.pull);
				
				const fEnter = enterOrder.map(v => enterPull[v]);
				const fExit = exitOrder.map(v => exitPull[v]);
				
				console.log(fEnter);
				
				const part1 = [];
				const part2 = [];
				
				fExit.forEach(v => {
					const tmp = {};
					
					for (const vKey in v) {
						if (!/id/i.test(vKey)) {
							tmp[vKey] = v[vKey];
						}
					}
					
					part2.push(tmp);
				});
				
				fEnter.forEach(v => {
					const tmp = {};
					
					for (const vKey in v) {
						if (!/id/i.test(vKey)) {
							tmp[`${vKey}-ADD`] = v[vKey];
						}
					}
					
					part1.push(tmp);
				});
				
				const merged = [];
				for (let i = 0; i < part1.length; i++) {
					merged.push(Object.assign(part2[i], part1[i]));
				}
				
				merged.forEach(v => $$excel.add(v));
				
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