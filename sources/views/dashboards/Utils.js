export class Utils {
	static monthYear() {
		const today = new Date();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		
		return {month, year};
	}
}