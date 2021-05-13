import {employees} from "../models/employees";

export const format = v => v < 10 ? "0" + v : v;

export function throttle(func, ms) {
	let isThrottled = false,
		savedArgs,
		savedThis;
	
	function wrapper() {
		if (isThrottled) { // (2)
			savedArgs = arguments;
			savedThis = this;
			return;
		}
		
		func.apply(this, arguments); // (1)
		
		isThrottled = true;
		
		setTimeout(function () {
			isThrottled = false; // (3)
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}
	
	return wrapper;
}

export const toDateFilter = (obj, to) =>
	to ? webix.filters.date.lessOrEqual(
		webix.Date.datePart(obj.DT, true), to
	) : true;

export const fromDateFilter = (obj, from) =>
	webix.filters.date.greaterOrEqual(
		webix.Date.datePart(obj.DT, true), from
	);

export const employeesFilter = obj => Object
	.values(employees.data.pull)
	.filter(v => v.$checked)
	.some(v => v.FULLNAME === obj.FULLNAME);