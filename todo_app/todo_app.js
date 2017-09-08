/*global veloxScriptLoader, VeloxAppController, todoMainController, todoWelcomeController, taskController*/

var todoSchema = {
    project: {
        columns : [
            {name: "name", type: "text"},
        ]
    },
    task: {
        columns : [
            {name: "id", autoGen: "uuid", type: "text"},
            {name: "name", type: "text"},
            {name: "status", type: "select", values: ["todo", "done", "inprogress"]},
            {name: "projectId", type: "select", values: {"1": "Create a JS Framework", "2": "Save the world"}}
        ],
        pk: ["id"]
    },
} ;

var todoData = {
    projects : [
        {
            id: 1,
            name: "Create a JS Framework",
            todo: [
                { id: 1, name: "Create beautiful website", status: "todo", actor: "John" }
            ],
            inprogress: [
                { id: 2, name: "Write the doc", status: "inprogress", actor: "Bob" },
            ],
            done: [
                { id: 3, name: "Write some code", status: "done", actor: "Bob" },
                { id: 4, name: "Test the code", status: "done", actor: "Alice" },
            ]
        },
        {
            id: 2,
            name: "Save the world",
            todo: [
                { id: 5, name: "Do a selfie", status: "todo", actor: "John" }
            ],
            inprogress: [
                { id: 6, name: "Call the super-hero", status: "inprogress", actor: "Bob" },
            ],
            done: [
                { id: 7, name: "Choose a super-hero", status: "done", actor: "Alice" },
            ]
        }
    ]
} ;


function TodoApp(){
    var app = new VeloxAppController() ;
    var version = "0.0.1" ;

    // VeloxWebView.fieldsSchema.configure({
    //     schema: todoSchema,
    //     //automatically add label to fields
    //     addLabelToFields : true
    // }) ;

    VeloxWebView.fields.addDecorator(function bootstrap3decorator(element, fieldType){
        if(element.parentElement && element.parentElement.className.indexOf("navbar-form") !== -1){
            //don't touch nav bar
            return;
        }
        if(fieldType === "select"){
            //for select, just add form-group class
            element.classList.add("form-group") ;
            return ;
        }
        if(fieldType === "upload" || fieldType === "pdf"){
            return; //do nothing on upload and pdf fields
        }
        var input = element.getElementsByTagName("input")[0] ;
        if(input){
            //add boostrap form input control classes
            if(input.type === "checkbox"){
                element.className += " checkbox" ;
            }else{
                element.className += " form-group" ;
                input.className += " form-control" ;
            }
        }else{
            //by default add the form-group class
            element.className += " form-group" ;
        }
    }) ;

    VeloxFormController.setOptions({
        buttonsHTML: '<button id="btBack" class="btn btn-default" data-emit><i class="fa fa-chevron-left"></i>&nbsp;</button>'+
            ' <button id="btCreate" class="btn btn-primary" data-emit data-i18n="form.create"></button>'+
            ' <button id="btModify" class="btn btn-primary" data-emit data-i18n="form.modify"></button>'+
            ' <button id="btCancel" class="btn btn-default"data-emit data-i18n="form.cancel"></button>'+
            ' <button id="btValidate" class="btn btn-success" data-emit data-i18n="form.validate"></button>'+
            ' <button id="btDelete" class="btn btn-danger" data-emit data-i18n="form.delete"></button> '
    }) ;

    veloxScriptLoader.load(
        [ 
          {
             name: "todo-main", type: "js", version: version,
             cdn: "todo_app/controllers/main.js",
         },
          {
             name: "todo-welcome", type: "js", version: version,
             cdn: "todo_app/controllers/welcome.js",
         },
         {
            name: "todo-task", type: "js", version: version,
            cdn: "todo_app/controllers/task.js",
        }
        ]
       , function(){

        app.registerController(todoMainController) ;
        app.registerController(todoWelcomeController) ;
        app.registerController(taskController) ;

        app.navigate() ;
    });
}