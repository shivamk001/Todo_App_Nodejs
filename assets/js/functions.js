

const Noty=window.Noty;
let allTasks;

//display all tasks
export function displayAllTasks(tasks){
    console.log('tasks:', tasks)
    $(`#taskTableBody`).empty()
    //console.log('ALL TASKS:', tasks)
    //let tasks=data.allTasks

    tasks.forEach(task=>{
        //console.log(task)
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
export async function getAllTasks(e){
    console.log('CLICKED')
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/user/authenticated/task/all',
        //both passed as parameters
        //data: {sortBy: sortBy, category: category},
        //data: `sortBy=${sortBy}`,
        contentType: 'application/json',
        dataType: 'json',
        encode: true,
        success: function(data){
            allTasks=data.allTasks
            displayAllTasks(allTasks)
            
        },
        error: function(jqXHR, textStatus, error){
            console.log('40 function:', jqXHR)
            console.log('40 function:', textStatus)
            console.log('40 function:', error)
            let text=jqXHR.status==401?'Session expired. Logout and login again': error
            new Noty({
                type: 'error',
                text: text,
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
        url: 'http://localhost:8000/user/authenticated/task/delete',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({id: data_id}),
        success: function(data){
            //console.log(data)
            $(`#${data_id}`).remove()
            console.log('68 function:', data.message)
            new Noty({
                type: 'success',
                text: data.message,
                layout: 'topRight',
                theme: 'metroui',
                timeout: 2000,
                progressBar: true,
                closeWith: ['click']
            }).show()
            getAllTasks()
        },
        error: function(jqXHR, textStatus, error){
            console.log('80 function:', error)
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
        url: 'http://localhost:8000/user/authenticated/task/deleteAll',
        type: 'DELETE',
        success: function(data){
            //console.log(data)
            $(`#displayTasks`).empty()
            console.log('103 function:', data.message)
            new Noty({
                type: 'success',
                text: data.message,
                layout: 'topRight',
                theme: 'nest',
                timeout: 1000,
                progressBar: true,
                closeWith: ['click']
            }).show()
            getAllTasks()
        },
        error: function(jqXHR, textStatus, error){
            console.log('115 function:', error)
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
    console.log('Sort by function clicked', e!=undefined?e.target.value:'latestfirst')
    let sortBy=e!=undefined?e.target.value:'latestfirst'
    console.log('ALLTASKS LENGTH:', allTasks.length, sortBy)
    //let allTasks=(await getAllTasks()).allTasks
    if(sortBy=='latestfirst'){
        //sort in desc order
        // getAllTasks((allTasks)=>{
        //     displayAllTasks(allTasks.sort(
        //         (a,b)=>{return (new Date(b.createdAt))-(new Date(a.createdAt))}
        //     ))
        // })
        console.log('Sort Latest First')
        displayAllTasks(allTasks.sort((a,b)=>{return (new Date(b.createdAt))-(new Date(a.createdAt))}))
    }
    else{
        // getAllTasks((allTasks)=>{
        //     displayAllTasks(allTasks.sort(
        //         (a,b)=>{return (new Date(a.createdAt))-(new Date(b.createdAt))}
        //     ))
        // })
        console.log('Sort Oldest First')
        displayAllTasks(allTasks.sort((a,b)=>{return (new Date(a.createdAt))-(new Date(b.createdAt))}))
    }
}

//display by category
export async function displayCategorywise(e){
    //console.log('Display by function clicked', e.target.value)
    let category=e.target.value
    console.log('DISPLAYCATEGORYWISE')
    if(category!='all'){
        // getAllTasks((allTasks)=>{
        //     //console.log('filtered tasks:', allTasks.filter(task=>{return task.category==category}))
        //     displayAllTasks(allTasks.filter(task=>{return task.category==category}))
        // })
        console.log('DISPLAY CATEGORYWISE filtered tasks:', allTasks.filter(task=>{return task.category==category}))
        displayAllTasks(allTasks.filter(task=>{return task.category==category}))
    }
    else{
        // getAllTasks((allTasks)=>{
        //     displayAllTasks(allTasks)
        // })
        console.log('DISPLAY ALL')
        displayAllTasks(allTasks)
    }
}

//display by status
export async function displayStatuswise(e){
    //console.log('Display by status function clicked: ', e.target.value)
    let status=e.target.value
    console.log('DISPLAYSTATUSWISE')
    if(status!='All'){
        // getAllTasks((allTasks)=>{
        //     console.log('filtered tasks:', allTasks.filter(task=>{return task.status==status}))
        //     displayAllTasks(allTasks.filter(task=>{return task.status==status}))
        // })
        console.log('filtered tasks:', allTasks.filter(task=>{return task.status==status}))
        displayAllTasks(allTasks.filter(task=>{return task.status==status}))
    }
    else if(status=='All'){
        // getAllTasks((allTasks)=>{
        //     displayAllTasks(allTasks)
        // })
        displayAllTasks(allTasks)
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