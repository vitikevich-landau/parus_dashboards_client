import {JetView} from "webix-jet";
import {debounce} from "../utils";
import {API_SERVICE_URL} from "../config";

export default class ChartView extends JetView {
  constructor(app, config) {
    super(app, config);
    
    this.lastUsedRow = null;
    this.onMouseMovingEvent = null;
    this.isItemTaken = false;
    
    this.onMouseMovingHandler = debounce(function (ev) {
      // console.log(this.onMouseMovingEvent);
      try {
        const row = this.locate(ev).row;
        if (row !== this.lastUsedRow) {
          this.removeRowCss(this.lastUsedRow, "hover");
        }
        this.addRowCss(row, "hover");
        this.lastUsedRow = row;
      } catch (er) {
      }
    }, 15);
    
  }
  
  config() {
    return {
      view: "datatable",
      id: "dt",
      url: API_SERVICE_URL + "/kitchen-attendant",
      save: `rest->${API_SERVICE_URL}/kitchen-attendant/change`,
      columns: [
        // {id: "index", header: "#", width: 50},
        {
          id: "NUM",
          header: {text: "Очередь"},
          width: 95,
          sort: "int",
        },
        {
          id: "FULLNAME",
          header: ["ФИО"/*, {content: "textFilter"}*/],
          minWidth: 270,
          fillspace: true,
          editor: "text",
          sort: "string",
        },
        {
          id: "IS_ACTIVE",
          header: "Дежурный",
          width: 110,
          template: "{common.radio()}",
          sort: "int",
        },
        {
          id: "SKIPPED",
          header: "Освобождение от дежурства",
          width: 240,
          sort: "int",
          // template: "{common.checkbox()}",
          template: function custom_checkbox(obj, common, value) {
            if (value) {
              return "<input class='webix_table_checkbox' type='checkbox' checked />";
            } else {
              return "<input class='webix_table_checkbox' type='checkbox' " + (obj.IS_ACTIVE ? "disabled='disabled'" : "") + "'/>";
            }
            
          }
        },
        {
          id: "LAST_ACTIVE",
          header: "Последнее дежурство",
          width: 200,
          format: function (value) {
            const splitted = value ? value.split("T") : [];
            
            if (splitted.length) {
              const parsed = new Date(splitted[0]);
              // return parsed.toLocaleDateString();
              return webix.Date.dateToStr("%d.%m.%Y")(parsed);
            }
            
            return "";
          },
          sort: "string"
        },
      ],
      headermenu: {
        width: 250,
        autoheight: true,
        autowidth: true,
        // scroll:true
      },
      scroll: false,
      select: true,
      // css: "webix_shadow_medium webix_header_border ",
      editable: true,
      editaction: "dblclick",
      drag: "order",
      dragColumn: "order",
      resizeColumn: {size: 12},
      on: {
        onBeforeLoad: function () {
          webix.extend(this, webix.ProgressBar);
    
          this.showProgress();
        },
        onAfterLoad: function () {
          this.hideProgress();
    
          /***
           *  Set datatable rows color
           * */
          $$("dt").eachRow(function (row) {
            const current = this.getItem(row);
            const {IS_ACTIVE, SKIPPED} = current;
      
            if (IS_ACTIVE) {
              this.addRowCss(row, "datatable-active");
            }
            if (SKIPPED) {
              this.addRowCss(row, "datatable-skipped");
            }
          });
        },
        onCheck: function (row, column, state) {
          /***
           *  Set rows color
           * */
          switch (column) {
            case "IS_ACTIVE":
              webix.dp(this).save(row);
              /***
               *  Delete previous classes
               * */
              this.eachRow(r => {
                this.removeCss(r, "datatable-active");
              });
        
              this.addRowCss(row, "datatable-active");
        
              break;
            case "SKIPPED":
              if (state) {
                this.addRowCss(row, "datatable-skipped");
              } else {
                this.removeRowCss(row, "datatable-skipped");
              }
        
              break;
          }
        },
        onHeaderClick: function (id, e, target) {
          let state = this.getState().sort;
          if (state && state.dir === "desc") {
            // this.sort("id", "asc");
            this.sort({
              as: "int",
              dir: "asc",
              by: "NUM" // имя поля
            });
            this.markSorting();
            this.setState(state);
      
            return false;
          }
        },
        "data->onStoreUpdated": function () {
          /***
           *  Dynamic indexes
           * */
          this.data.each(function (obj, i) {
            obj.index = i + 1;
          });
        },
        onBeforeDrag: (ctx, ev) => {
          /***
           *  Fix hover bug
           * */
          this.isItemTaken = true;
          ctx.from.detachEvent(this.onMouseMovingEvent);
        },
        onAfterDrop: (ctx, ev) => {
          const row = ctx.from.getItem(ctx.start);
          const {NUM, index} = row;
          
          if (NUM !== index) {
            webix.ajax()
              .post(
                API_SERVICE_URL + "/kitchen-attendant/change-order",
                {NUM, index}
              )
              .then(response => {
                return response.json();
              })
              .then(json => {
                console.log(json);
                ctx.from.clearAll();
  
                // console.log(ctx.from.config.url.source);
                
                return ctx.from.load(API_SERVICE_URL + "/kitchen-attendant");
              })
              .then(responce => {
                return responce.json();
              })
              .then(json => {
                webix.message("Данные обновлены");
              });
          }
        },
      },
      onMouseMove: {},
    };
  }
  
  init(_$view, _$) {
    super.init(_$view, _$);
    
    webix.event(document.body /*document.querySelector(".webix_dtable")*/, webix.env.mouse.up, e => {
      // console.log(this.itemTaken);
      
      if (this.isItemTaken) {
        this.isItemTaken = false;
        this.onMouseMovingEvent = _$view.attachEvent("onMouseMoving", this.onMouseMovingHandler);
      }
    });
    
    this.onMouseMovingEvent = _$view.attachEvent("onMouseMoving", this.onMouseMovingHandler);
  }
}