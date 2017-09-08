/*global VeloxViewController, VeloxWebView, todoData*/

var todoWelcomeController = new VeloxViewController({
    directory : "todo_app/views",
    name: "welcome",
    route: "",
    container: "todo_contents",
    bindObject: todoData
}) ;


todoWelcomeController.onChangeStatus = function(ev){
    var fromStatus = ev.data.fromStatus ;
    var taskId = ev.data.taskId ;
    var toStatus = ev.data.toStatus ;
    var project = ev.data.project ;    
    project[fromStatus].some(function(t, i){
        if(t.id == taskId){
            var task = project[fromStatus].splice(i, 1) ;
            task[0].status = toStatus ;
            project[toStatus].push(task[0]) ;
        }
    }) ;
    this.view.render() ;
} ;

todoWelcomeController.onCreateTask = function(ev){
    var project = ev.data.currentData ;
    var view = new VeloxWebView(
        {html: '<div data-field-def="task.name" id="name"></div><button class="btn btn-primary" data-emit id="validate" data-i18n="form.validate"></button>'}
        ) ;
    view.openInPopup({width: 200, height: 150}, function(){
        view.EL.name.focus() ;
    }) ;
    view.on("validate", function(){
        var task = view.getData() ;
        task.id = project.todo.length+project.inprogress.length+project.done.length +1 ;
        task.status = "todo" ;
        project.todo.push(task) ;
        view.closePopup() ;
        this.view.render() ;
    }.bind(this)) ;
} ;

todoWelcomeController.stack = todoWelcomeController.leave ;
todoWelcomeController.unstack = todoWelcomeController.enter ;
