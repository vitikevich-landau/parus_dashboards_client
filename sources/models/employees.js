import {API_SERVICE_URL} from "../config";

export const employees = new webix.DataCollection({
	url: `${API_SERVICE_URL}/employees`,
	// url() {
	// 	const promise = webix.ajax(`${API_SERVICE_URL}/employees`);
	//
	// 	return promise.then(response => {
	// 		const data = response.json();
	//
	// 		/***
	// 		 * 		Подмешать нужные данные к пришедшим с сервера
	// 		 *
	// 		 * */
	// 		data.unshift({
	// 			FULLNAME: "-",
	// 			ID: 25,
	// 			ROWNUM: 25,
	// 			value: "-",
	// 		});
	//
	// 		/***
	// 		 * 		Запихнуть данные в промис
	// 		 * */
	// 		return new Promise(resolve => resolve(data));
	// 	});
	// }
});