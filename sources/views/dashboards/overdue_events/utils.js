export const GAGE_ANIMATE_DELAY = 350;

export function removeRows(viewId) {
	const $$view = $$(viewId);
	$$view.removeView("firstRow");
	$$view.removeView("secondRow");
	$$view.removeView("catch_error");
}

export function addRow(viewId, rowId) {
	$$(viewId).addView({
		id: rowId,
		type: "wide",
		cols: []
	});
}

export function addGage(data, viewId) {
	data.forEach(v => {
		const gage = {
			id: webix.uid(),
			view: "gage",
			value: 0,
			placeholder: v.PLACEHOLDER.toLocaleDateString(),
			minRange: v.MINRANGE,
			maxRange: v.MAXRANGE,
			label: v.LABEL,
			width: 150,
			height: 180,
		};
		
		$$(viewId).addView(gage);
		
		webix.delay(
			() => $$(gage.id).setValue(v.VALUE),
			null,
			null,
			GAGE_ANIMATE_DELAY
		);
	});
}