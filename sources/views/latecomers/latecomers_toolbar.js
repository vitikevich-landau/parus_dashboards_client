import {addPickedDateToDtItems, generateColumns} from "jet-views/latecomers/functions";
import {API_SERVICE_URL} from "../../config";

export default {
  view: "toolbar",
  paddingX: 10,
  cols: [
    {
      view: "datepicker",
      id: "datepicker",
      /*label:"Текущий месяц",*/
      width: 130,
      stringResult: false,
      format: "%M %Y",
      value: new Date(),
      suggest: {
        view: "suggest", type: "calendar", body: {
          view: "calendar",
          type: "month",
          icons: true,
          minDate: new Date(2021, 1, 1),
          maxDate: new Date(new Date().getFullYear(), 11, 1),
        }
      },
      on: {
        onChange: function (newValue, oldValue, config) {
          /***
           *  - Удаляем столбцы
           *  - Генерим новые, в завасимости от выбранного месяца
           *  - Загружаем данные из базы по выбранному месяцу
           * */
          
          const latecomers$$ = $$("latecomers");
          const columns = latecomers$$.config.columns;
          const pickedMonth = newValue.getMonth() + 1;
          const pickedYear = newValue.getFullYear();
          
          const days = new Date(
            pickedYear,
            pickedMonth,
            0
          ).getDate();
          
          /***
           *  Remove
           * */
          columns.splice(1, columns.length);
          /***
           *  Cache first
           * */
          const first = columns[0];
          /***
           *  Generate new Columns
           * */
          latecomers$$.config.columns = [
            first,
            ...generateColumns(days)
          ];
          
          latecomers$$.refreshColumns();
          
          /***
           *  Update datatable
           * */
          latecomers$$.clearAll();
          
          /***
           *  Load data from DB
           * */
          latecomers$$.load(() => webix.ajax().get(
            `${API_SERVICE_URL}/latecomers/${pickedMonth}/${pickedYear}`
          ));
          
          
        }
      },
    },
    {},
    {
      view: "icon",
      icon: "mdi mdi-pdf-box",
      tooltip: "Скачать в PDF",
      click: function () {
        const pickerValue = $$("datepicker").getValue();
        const date = webix.Date.dateToStr("%F %Y")(pickerValue);
        
        webix.toPDF("latecomers", {
          // title:true,
          filterHTML: false,
          styles: true,
          autowidth: true,
          docHeader: "Журнал опозданий на " + date,
          filename: "Журнал опозданий на " + date
        });
      }
    },
    {
      view: "icon",
      icon: "mdi mdi-microsoft-excel",
      tooltip: "Скачать в Excel",
      click: function () {
        const pickerValue = $$("datepicker").getValue();
        const date = webix.Date.dateToStr("%F %Y")(pickerValue);
  
        webix.toExcel("latecomers", {
          filename: "Журнал опозданий на " + date,
          spans:true,
          styles:true,
        });
      }
    },
    {width: 15},
    {
      view: "button",
      label: "Сохранить",
      width: 100,
      css: "webix_primary",
      click: function (id, event) {
        /***
         *  lock button before send
         * */
        this.disable();
        
        const data = addPickedDateToDtItems($$("latecomers"), $$("datepicker"));
        
        webix.ajax().post(
          API_SERVICE_URL + "/latecomers/",
          data
        )
          .then(response => {
            
            /***
             *  unlock button before send
             * */
            return response.json();
          })
          .then(json => {
            console.log(json);
            webix.message({type:"success", text:"Сохранено"});
          })
          .catch(() => {
            webix.message({type:"error", text:"Ошибка соединения с сервером"});
          })
          .finally(() => {
            console.log("finally");
            
            this.enable();
          })
      }
    }
  ],
};