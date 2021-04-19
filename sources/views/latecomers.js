import LatecomersDatatableView from "jet-views/latecomers/latecomers_datatable";
import latecomers_toolbar from "jet-views/latecomers/latecomers_toolbar";
import {JetView} from "webix-jet";

export default class Latecomers extends JetView {
  config() {
    return {
      rows: [
        latecomers_toolbar,
        LatecomersDatatableView
      ],
    }
  }
  
  init(_$view, _$) {
    super.init(_$view, _$);
    
  }
}