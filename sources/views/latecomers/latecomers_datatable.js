import {JetView} from "webix-jet";
// import {latecomersCollection} from "../../models/records";
import {generateColumns} from "jet-views/latecomers/functions";
import {API_SERVICE_URL} from "../../config";

export default class LatecomersDatatableView extends JetView {
  
  constructor(app, config) {
    super(app, config);
    
    // this._selectedCell = null;
  }
  
  config() {
    const datepicker$$ = $$("datepicker");
    
    const date = datepicker$$.getValue();
    const year = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    // const monthName = date.toLocaleString('default', {month: 'short'});
    const days = new Date(year, monthNum, 0).getDate();
    
    return {
      view: "datatable",
      id: "latecomers",
      // data: latecomersCollection,
      url: API_SERVICE_URL + "/latecomers",
      css: "webix_header_border webix_data_border",
      // multiselect: true,
      select: "row",
      editable: true,
      editaction: "dblclick",
      leftSplit: 1,
      resizeColumn: {headerOnly: true, size: 12},
      columns: [
        {
          id: "FULLNAME",
          header: "ФИО",
          fillspace: true,
          minWidth: 270,
          sort: "string",
          resize: true
        },
        ...generateColumns(days)
      ],
      on: {
        onBeforeLoad: function () {
          webix.extend(this, webix.ProgressBar);
          
          this.showProgress();
        },
        onAfterLoad: function () {
          this.hideProgress();
          
          /***
           *  Change column width after data load
           *e
           *  Глюк с мерцинием
           * */
          const cols = this
            .config
            .columns
            .map(v => v.id)
            .filter(v => v[0] === "D");
          
          cols.forEach(v => {
            this.getColumnConfig(v).adjust = true;
            this.refreshColumns();
          });
          
        },
        onHeaderClick: function (id, e, target) {
          let state = this.getState().sort;
          if (state && state.dir === "desc") {
            this.sort({
              as: "int",
              dir: "asc",
              by: "id" // имя поля
            });
            
            this.markSorting();
            this.setState(state);
            
            return false;
          }
        },
        onItemClick: function (id, event, node) {
          // this._selectedCell = id;
          
          this.data.each((object, index) => {
            const cols = Object.keys(object);
            cols.forEach(v => {
              this.removeCellCss(object.id, v, "latecomers-selected-cell")
            });
          });
          
          this.addCellCss(id.row, id.column, "latecomers-selected-cell");
          
        },
        onAfterEditStop: function (state, editor, ignoreUpdate) {
          if (!state.value && !state.old) {
            return;
          }
          
          this.adjustColumn(editor.column);
        }
      },
    };
  }
  
  init(_$view, _$) {
    super.init(_$view, _$);
    
    

    
  }
  
  
}