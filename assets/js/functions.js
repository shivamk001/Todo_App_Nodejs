const Noty=window.Noty;

//display all tasks
export function displayAllTasks(tasks){
    $(`#taskTableBody`).empty()
    //console.log('ALL TASKS:', tasks)
    //let tasks=data.allTasks

    tasks.forEach(task=>{
        let row=$('<tr>', { id: task._id }).addClass('taskRow')
        row.append($(`
            <td> <input type="checkbox" class="checkbox" data-id="${task._id}" name="checkbox"></td>
            <td><h4 style="text-align: center"> ${task.description}</h4></td>
            <td><small>${task.category}</small></td>
            <td><small>${task.status}</small></td>
            <td><p>${task.createdAt.substring(0,16)}</p></td>
            <td><p>${task.dueDate.substring(0, 10)}</p></td>
            <td><button type="button" class="delete-button" data-id="${task._id}" id="delete-button-${task._id}">X</button></td>
        `))
        $('#taskTableBody').append(row)
    })
}

//get all tasks and display the tasks
export async function getAllTasks(callback){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/task/all',
        //both passed as parameters
        //data: {sortBy: sortBy, category: category},
        //data: `sortBy=${sortBy}`,
        contentType: 'application/json',
        dataType: 'json',
        encode: true,
        success: function(data){
            callback(data.allTasks)
        },
        error: function(jqXHR, textStatus, error){
            new Noty({
                type: 'error',
                text: error,
                layout: 'topRight',
                theme: 'nest',
                timeout: 2000,
                progressBar: true,
                closeWith: ['click']
            }).show()
        }
     })
    
}

//delete a task
export function deleteTask(e){
    let data_id=e.target.getAttribute('data-id')
    //console.log('DATA_ID:', data_id)
    $.ajax({
        url: 'http://localhost:8000/task/delete',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({id: data_id}),
        success: function(data){
            //console.log(data)
            $(`#${data_id}`).remove()
            new Noty({
                type: 'success',
                text: data.message,
                layout: 'topRight',
                theme: 'metroui',
                timeout: 2000,
                progressBar: true,
                closeWith: ['click']
            }).show()
        },
        error: function(jqXHR, textStatus, error){
            new Noty({
                type: 'error',
                text: error,
                layout: 'topRight',
                theme: 'nest',
                timeout: 2000,
                progressBar: true,
                closeWith: ['click']
            }).show()
        }
    })
}

//delete all tasks
export function deleteAllTasks(){
    //console.log('DELETE ALL TASKS')
    $.ajax({
        url: 'http://localhost:8000/task/deleteAll',
        type: 'DELETE',
        success: function(data){
            //console.log(data)
            $(`#displayTasks`).empty()
            new Noty({
                type: 'success',
                text: data.message,
                layout: 'topRight',
                theme: 'nest',
                timeout: 1000,
                progressBar: true,
                closeWith: ['click']
            }).show()
        },
        error: function(jqXHR, textStatus, error){
            new Noty({
                type: 'error',
                text: error,
                layout: 'topRight',
                theme: 'nest',
                timeout: 2000,
                progressBar: true,
                closeWith: ['click']
            }).show()
        }
    })
}

//sort
export async function sortBy(e){
    //console.log('Sort by function clicked', e!=undefined?e.target.value:'latestfirst')
    let sortBy=e!=undefined?e.target.value:'latestfirst'
    //let allTasks=(await getAllTasks()).allTasks
    if(sortBy=='latestfirst'){
        //sort in desc order
        getAllTasks((allTasks)=>{
            displayAllTasks(allTasks.sort(
                (a,b)=>{return (new Date(b.createdAt))-(new Date(a.createdAt))}
            ))
        })
    }
    else{
        getAllTasks((allTasks)=>{
            displayAllTasks(allTasks.sort(
                (a,b)=>{return (new Date(a.createdAt))-(new Date(b.createdAt))}
            ))
        })
    }
}

//display by category
export async function displayCategorywise(e){
    //console.log('Display by function clicked', e.target.value)
    let category=e.target.value

    if(category!='all'){
        getAllTasks((allTasks)=>{
            //console.log('filtered tasks:', allTasks.filter(task=>{return task.category==category}))
            displayAllTasks(allTasks.filter(task=>{return task.category==category}))
        })
    }
    else{
        getAllTasks((allTasks)=>{
            displayAllTasks(allTasks)
        })
    }
}

//display by status
export async function displayStatuswise(e){
    //console.log('Display by status function clicked: ', e.target.value)
    let status=e.target.value

    if(status!='All'){
        getAllTasks((allTasks)=>{
            //console.log('filtered tasks:', allTasks.filter(task=>{return task.status==status}))
            displayAllTasks(allTasks.filter(task=>{return task.status==status}))
        })
    }
    else if(status=='All'){
        getAllTasks((allTasks)=>{
            displayAllTasks(allTasks)
        })
    }
}

//change status
export function changeStatus(e){
    if($(this).is(":checked")){
        //console.log("Checkbox is checked.");
        //$('#changeStatusBox').show()
        $('#changeStatusBox').css({
            "display": "block",
            "position": "fixed",
            "top": "50%",
            "left": "40%"
        })
        //console.log($(this).attr('data-id'))
        $('#changeStatusForm').attr('data-id', $(this).attr('data-id'))
    }
    else if($(this).is(":not(:checked)")){
        //console.log("Checkbox is unchecked.");
        $('#changeStatusBox').hide()
    }
}