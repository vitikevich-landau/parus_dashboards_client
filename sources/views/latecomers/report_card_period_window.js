import {options} from "jet-views/latecomers/functions";
import {employees} from "../../models/employees";
import calendar_icons from "jet-views/latecomers/calendar_icons";
import {API_SERVICE_URL} from "../../config";

const {icons} = calendar_icons;
const {clear} = icons;

const pushedOptions = options.map(v => `${v.value} - ${v.desc}`);
pushedOptions.push("-");

export default {
	view: "window",
	id: "window:period",
	position: "center",
	modal: true,
	move: true,
	close: true,
	head: "Задать период (типы дней)",
	body: {
		view: "form",
		id: "period:form",
		width: 475,
		elements: [
			{
				id: "start_date",
				view: "datepicker",
				label: "С: ",
				name: "start_date",
				labelWidth: 100,
				required: true,
				on: {
					onChange: (newV, oldV, cfg) =>
						$$("end_date").getPopup().getBody().config.minDate
							= newV === null
							? undefined : webix.Date.add(
								webix.Date.datePart(newV, true),
								1,
								"day",
								true
							),
				},
				icons: [
					//default "today" icon
					{},
					//default "clear" icon
					clear
				]
			},
			{
				id: "end_date",
				view: "datepicker",
				label: "По: ",
				name: "end_date",
				labelWidth: 100,
				required: true,
				on: {
					onChange: (newV, oldV, config) =>
						$$("start_date").getPopup().getBody().config.maxDate
							= newV === ""
							? undefined : newV === null
								? undefined : webix.Date.add(
									webix.Date.datePart(newV, true),
									-1,
									"day",
									true
								),
					
				},
				icons: [
					//default "today" icon
					{},
					//default "clear" icon
					clear
				]
			},
			{
				view: "richselect",
				label: "Сотрудник: ",
				labelWidth: 100,
				name: "employee",
				options: employees,
				required: true,
			},
			{
				view: "richselect",
				label: "Тип дня: ",
				labelWidth: 100,
				name: "day_type",
				options: {
					template: "#id#",
					data: pushedOptions
				},
				required: true,
				on: {
					onChange(newV, oldV, cfg) {
						if (newV === "-") {
							$$("weekends").disable();
						} else {
							$$("weekends").enable();
						}
					}
				}
			},
			{
				view: "checkbox",
				id: "weekends",
				name: "weekends",
				label: "Пропускать выходные: ",
				value: 0,
				labelWidth: 170,
			},
			{
				cols: [
					{},
					{
						view: "button",
						value: "OK",
						css: "webix_primary",
						click() {
							const form = this.getFormView();
							if (form.validate()) {
								const values = form.getValues();
								const {employee: empID} = values;
								const foundedEmployee = employees.find(v => v.id === +empID);
								
								if (foundedEmployee.length) {
									const {FULLNAME} = foundedEmployee[0];
									const {start_date, end_date, day_type} = values;
									const data = {
										...values,
										start_date: webix.Date.datePart(start_date, true),
										end_date: webix.Date.datePart(end_date, true),
										employee: FULLNAME,
										day_type: day_type.split("-")[0].trim()
									};
									
									if (day_type === "-") {
										webix.confirm({
											title: `Удалить выбранный период?`,
											text: `с ${start_date.toLocaleString().split(",")[0]} по ${end_date.toLocaleString().split(",")[0]}`,
											ok: "Ок",
											cancel: "Отмена",
											type: "confirm-error"
										})
											.then(() => {
												sandToServer($$("window:period"), $$("latecomers"), data);
											});
									} else {
										const $$window = $$("window:period");
										
										disableWindow($$window);
										
										const start = `${start_date.getDate()}.${start_date.getMonth() + 1}.${start_date.getFullYear()}`;
										const end = `${end_date.getDate()}.${end_date.getMonth() + 1}.${end_date.getFullYear()}`;
										
										webix
											.ajax()
											.get(`${API_SERVICE_URL}/latecomers/check-period/${start}/${end}/${FULLNAME}`)
											.then(response => response.json())
											.then(json => {
												const [isFound] = json;
												
												if (!isFound) {
													sandToServer($$("window:period"), $$("latecomers"), data);
												} else {
													enableWindow($$window);
													
													webix.message({type: "error", text: "В указанном периоде присутствуют данные"});
												}
												
											})
											.catch(() => {
												enableWindow($$window);
												
												webix.message({type: "error", text: "Ошибка соединения с сервером"});
											});
									}
									
								}
								
							} else {
								webix.message("Заполните все обязательные поля!", "debug");
							}
						}
					},
					{
						view: "button",
						value: "Очистить",
						css: "webix_danger",
						click() {
							const form = this.getFormView();
							form.clear();
							form.clearValidation();
							form.validate();
						}
					},
				]
			},
		],
		on: {
			onChange() {
				this.validate();
			}
		}
	},
	on: {
		onHide() {
			const $$form = $$("period:form");
			
			$$form.clear();
			$$form.clearValidation();
		},
		onShow: () => $$("period:form").validate()
	}
};

function disableWindow($$window) {
	$$window.showProgress();
	$$window.disable();
}

function enableWindow($$window) {
	$$window.enable();
	$$window.hideProgress();
}


function sandToServer($$window, $$latecomers, data) {
	disableWindow($$window);
	
	webix
		.ajax()
		.post(`${API_SERVICE_URL}/latecomers/period`, data)
		.then(response => response.json())
		.then(json => {
			const $$datepicker = $$("datepicker");
			const pickedDate = $$datepicker.getValue();
			const month = pickedDate.getMonth() + 1;
			const year = pickedDate.getFullYear();
			
			$$window.hide();
			
			$$latecomers.clearAll();
			$$latecomers.load(`${API_SERVICE_URL}/latecomers/${month}/${year}`);
			
			console.log(json);
		})
		.catch(() => webix.message({type: "error", text: "Ошибка соединения с сервером"}))
		.finally(() => enableWindow($$window))
	;
}