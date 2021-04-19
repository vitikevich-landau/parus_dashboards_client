import {JetView, plugins} from "webix-jet";
import { createState, link } from "jet-restate";


export default class TopView extends JetView {
  config() {
    const toolbar = {
      view: "toolbar",
      css: "webix_dark",
      elements: [
        {view: "icon", icon: "mdi mdi-menu", click: () => $$("sidebar:menu").toggle()},
        {view: "label", label: "PARUS BUSINESS"},
        {},
        // {view: "icon", icon: "mdi mdi-comment", badge: 4},
        // {view: "icon", icon: "mdi mdi-bell", badge: 10}
      ]
    };
    
    const sidebar = {
      view: "sidebar",
      id: "sidebar:menu",
      css: "webix_sidebar webix_dark",
      width: 220,
      scroll: "auto",
      data: [
        {
          id: "start",
          icon: "mdi mdi-view-dashboard",
          value: "Панель Мониторинга",
        },
        {
          id: "tables", icon: "mdi mdi-table", value: "Таблицы с данными", data: [
            {id: "data", value: "График дежурства"},
            {id: "latecomers", value: "Табель"},
          ]
        },
        // {
        //   id: "layouts",
        //   icon: "mdi mdi-view-column",
        //   value: "Layouts",
        //   data: [
        //     {id: "accordions", value: "Accordions"},
        //     {id: "portlets", value: "Portlets"}
        //   ]
        // }
      ]
    };
    
    return {
      rows: [
        toolbar,
        {
          cols: [
            sidebar,
            {$subview: true}
          ]
        }
      ],
    };
  }
  
  _init(view, url) {
    super._init(view, url);
    
    /***
     *  Menu plugin
     * */
    this.use(plugins.Menu, "sidebar:menu");
    /***
     *  Set custom scroll bar
     * */
    // webix.CustomScroll.init();
    /***
     *  Set Locale
     * */
    webix.i18n.setLocale("ru-RU");
  
    // const state = createState({
    //   pickedDate: new Date(),
    // });
  
    // this.setParam("some_my_param", state);
    
    // this.show("latecomers", { target:"left", params: { state }})
  }
  
}