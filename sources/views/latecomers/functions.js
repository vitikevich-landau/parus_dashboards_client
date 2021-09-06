export const options = [
	{id: "ОП", value: "ОП", desc: "Опоздание"},
	{id: "ОП(УВ)", value: "ОП(УВ)", desc: "Уважительно"},
	{id: "ОТ", value: "ОТ", desc: "Отпуск"},
	{id: "Н", value: "Н", desc: "Прогул"},
	{id: "БОЛ", value: "БОЛ", desc: "Больничный"},
	{id: "КОМ", value: "КОМ", desc: "Командировка"},
	{id: "УД", value: "УД", desc: "Удалённая работа"},
];

function markCurrentDayColumn(colName) {
	/***
	 *  Подсветка дня, только текущего месяца и года
	 *
	 * */
	const datepicker = $$("datepicker").getValue();
	const pickYear = datepicker.getFullYear();
	const pickMonth = datepicker.getMonth() + 1;
	
	const currDate = new Date();
	const currYear = currDate.getFullYear();
	const currMonth = currDate.getMonth() + 1;
	const currDay = currDate.getDate();
	
	if (pickYear === currYear && pickMonth === currMonth) {
		if (currDay === colName) {
			return "#ddFFdd";
		}
	}
	
	return "";
}

function changeCellColor(v) {
	switch (v) {
		case "ОП":
			return "latecomers-bad";
		case "ОП(УВ)":
			return "latecomers-good";
		case "Н":
			return "latecomers-empty";
		case "ОТ":
			return "latecomers-vacation";
	}
}

/***
 *  Добавить выбранную дату в табличным данным
 * */
export function addPickedDateToDtItems(latecomers$$, datepicker$$) {
	const values = Object.values(latecomers$$.data.pull);
	const pickedValue = datepicker$$.getValue();
	
	/***
	 *  Change empty string to null
	 * */
	values.forEach(v => {
		const keys = Object.keys(v);
		
		keys.forEach(k => {
			if (v[k] === "") {
				v[k] = null;
			}
		});
	});
	
	const withDate = values.map(v => ({
		...v,
		M: pickedValue.getMonth() + 1,
		Y: pickedValue.getFullYear()
	}));
	
	const data = {};
	for (let i = 0; i < withDate.length; i++) {
		data[i + 1] = withDate[i];
	}
	
	return data;
}


/***
 *  Генерирует столбцы в зависимости от количества дней в месяце
 * */
export function generateColumns(days) {
	return Array.from(
		Array(days),
		(_, i) => (
			{
				id: `D${i + 1}`,
				header: {
					text: `0${i + 1}`.slice(-2),
					css: {
						background: markCurrentDayColumn(i + 1),
						"-webkit-user-select": "none",
						"-moz-user-select": "none",
						"-ms-user-select": "none",
						"-o-user-select": "none",
						"user-select": "none",
					}
				},
				width: 42,
				// adjust: true,
				optionslist: true,
				options,
				editor: "multiselect",
				cssFormat: changeCellColor,
				css: {
					"text-align": "center",
					background: markCurrentDayColumn(i + 1),
					"-webkit-user-select": "none",
					"-moz-user-select": "none",
					"-ms-user-select": "none",
					"-o-user-select": "none",
					"user-select": "none",
					color: "blue"
					// color: "#476cee"
				},
				suggest: {
					view: "checksuggest",
					// id: "sgggg",
					button: true,
					width: 225,
					body: {
						template: obj => `${obj.value} - <span class="options-suggest">${obj.desc}</span>`,
						yCount: 10
					},
					on: {
						onShow() {
							/***
							 *  Disable browser context menu
							 * */
							this.$view.oncontextmenu = () => false;
						}
					}
				},
			}
		)
	);
}

export default function reloadLatecomersTable(url, $$view) {
	$$view.showProgress();
	$$view.clearAll();
	$$view
		.load(url)
		.catch(() => webix.message({type: "error", text: "Ошибка соединения с сервером"}))
		.finally(() => $$view.hideProgress());
}