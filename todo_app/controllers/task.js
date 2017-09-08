/*global VeloxGridAndFormController, todoData*/

var taskController = new VeloxGridAndFormController("task", { 
    grid: {
        directory: "todo_app/views",
        name: "taskGrid",
        containerParent: "todo_tasks",
    },
    form: {
        directory: "todo_app/views",
        name: "taskForm",
        containerParent: "todo_tasks",
        defaultData: {
            status: "todo"
        }
    }   

}) ;

taskController.gridController.searchRecords = function(callback){
    var tasks = [] ;
    todoData.projects.forEach(function(p){
        p.todo.concat(p.inprogress).concat(p.done).forEach(function(t){
            t.projectId = p.id ;
            tasks.push(t) ;
        }) ;
    }) ;
    callback(null,tasks) ;
} ;

taskController.formController.saveRecords = function(records, callback){
    var task = records[0].record ;
    todoData.projects.some(function(p){
        if(p.id == task.projectId){
            var updated = p[task.status].some(function(t){
                if(t.id == task.id){
                    Object.keys(task).forEach(function(k){ t[k] = task[k] ;}) ;
                    return true ;
                }
            }) ;
            if(!updated){
                p[task.status].push(task) ;   
            }
            return true ;
        }
    }) ;
    callback(null, task) ;
} ;

taskController.formController.deleteRecord = function(task, callback){
    todoData.projects.some(function(p){
        if(p.id == task.projectId){
            p[task.status].some(function(t, i){
                if(t.id == task.id){
                    p[task.status].splice(i, 1) ;
                    return true ;
                }
            }) ;
            return true ;
        }
    }) ;
    callback() ;
} ;