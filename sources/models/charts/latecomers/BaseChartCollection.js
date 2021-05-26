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
	
	refresh() {
		this.data.clearAll();
		return this.data.load(this.url());
	}
	
	get data() {
		return this._data;
	}
}