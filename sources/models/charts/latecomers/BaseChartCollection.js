export class BaseChartCollection {
	constructor(chartId) {
		this._data = new webix.DataCollection({
			on: {
				onBeforeLoad: () => {
					webix.delay(() => {
						webix.extend($$(chartId), webix.ProgressBar);
						$$(chartId).showProgress();
					});
				},
				onAfterLoad: () => {
					$$(chartId).hideProgress();
				}
			}
		});
	}
	
	url() {
	}
	
	refresh(day, month, year) {
		this.data.clearAll();
		return this.data.load(this.url(day, month, year));
	}
	
	get data() {
		return this._data;
	}
}