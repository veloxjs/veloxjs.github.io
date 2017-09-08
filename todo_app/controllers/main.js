/*global VeloxViewController, VeloxWebView*/

var todoMainController = new VeloxViewController({
    directory : "todo_app/views",
    name: "main",
    route: "",
    container: "todo_app"
}) ;


todoMainController.prepareDataOnEnter = function(){
    return {
        lang: VeloxWebView.i18n.getLang() 
    };
};

todoMainController.onLang = function(){
    this.view.updateData(); 
    VeloxWebView.i18n.setLang(this.data.lang) ;
} ;

todoMainController.onMenuTask = function(){
    this.navigate("task/list") ;
} ;

todoMainController.onHome = function(){
    this.navigate("/") ;
} ;


todoMainController.stack = function(){
    //never stack the main view because its contains others
} ;
    

