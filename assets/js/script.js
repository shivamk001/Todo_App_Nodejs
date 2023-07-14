const input=document.getElementById('description')


input.addEventListener('click',()=>{
    //console.log('Clicked')
    input.style.border="none"
})

//display all tasks
function displayAllTasks(tasks){
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
async function getAllTasks(callback){
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
        }
     })
    
}

//delete a task
function deleteTask(e){
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
        }
    })
}

//delete all tasks
function deleteAllTasks(){
    //console.log('DELETE ALL TASKS')
    $.ajax({
        url: 'http://localhost:8000/task/deleteAll',
        type: 'DELETE',
        success: function(data){
            //console.log(data)
            $(`#displayTasks`).empty()
        }
    })
}

//sort
async function sortBy(e){
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
async function displayCategorywise(e){
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
async function displayStatuswise(e){
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
function changeStatus(e){
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

$(document).ready(function(){

    //to create a new task
    $('#createTaskForm').submit(function(event){
        let formData={
            description: $('#description').val(),
            category: $('#category').val(),
            date: $('#date').val()
        }
        $('#createTaskForm').trigger("reset");
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/task/add',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            dataType: 'json',
            encode: true
        }).done(function(data){
            //console.log('Task Created:',data)

            //getAllTasks((d)=>{displayAllTasks(d)})
            sortBy()
        })

        event.preventDefault();
    })

    $('#changeStatusForm').submit(function(event){
        let value=$("input[type='radio'][name='status']:checked").val()
        event.preventDefault();
        let id=$('#changeStatusForm').attr('data-id')
        //console.log(value, id)
        $('#changeStatusBox').hide();
        $('.checkbox').prop('checked', false);
        $('#changeStatusForm').trigger("reset");
        if(value!=undefined){
            $.ajax({
                type: 'PATCH',
                url: 'http://localhost:8000/task/edit',
                data: JSON.stringify({status: value, id: id}),
                contentType: 'application/json',
                dataType: 'json',
                encode: true
            }).done(function(data){
                console.log('Task Updated:',data)

                //getAllTasks((d)=>{displayAllTasks(d)})
                sortBy()
            })
        }
    })


    //GET ALL THE TASKS WHEN PAGE RELOADS TO DISPLAY THE TASKS
    getAllTasks((data)=>{displayAllTasks(data)})

    //to delete a task,
    //using event-delegation to make sure the delete functionality works
    $('#displayTasks').on('click', '.delete-button', deleteTask)

    //to select a task
    $('#displayTasks').on('change', '.checkbox', changeStatus)

    //to delete all tasks
    $('#delete-all-tasks').click(deleteAllTasks)

    //when an option is changed call sortBy function 
    $('#sortby').change(sortBy)

    //when an option is changed in display drop down
    $('#displaycategorywise').change(displayCategorywise)

    //when an option is changed in display drop down
    $('#displaystatuswise').change(displayStatuswise)

    // $('#changeStatusBox').click(()=>{
    //     //$('#changeStatusBox').hide();
    //     //$('.checkbox').prop('checked', true);
    // })

    $('#closeButton').click(()=>{
        $('#changeStatusBox').hide();
        $('.checkbox').prop('checked', false);
    })
})

