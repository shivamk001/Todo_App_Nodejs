import { sortBy, changeStatus,deleteAllTasks, deleteTask, displayAllTasks, displayCategorywise, displayStatuswise, getAllTasks } from "./functions.js"


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
            sortBy()
            new Noty({
                type: 'success',
                text: data.message,
                layout: 'topRight',
                theme: 'nest',
                timeout: 2000,
                progressBar: true,
                closeWith: ['click']
            }).show()
        }).fail(function(err){
            new Noty({
                type: 'error',
                text: err.message,
                layout: 'topRight',
                theme: 'nest',
                timeout: 2000,
                progressBar: true,
                closeWith: ['click']
            }).show()
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
                //console.log('Task Updated:',data)

                //getAllTasks((d)=>{displayAllTasks(d)})
                sortBy()
                new Noty({
                    type: 'success',
                    text: data.message,
                    layout: 'topRight',
                    theme: 'nest',
                    timeout: 2000,
                    progressBar: true,
                    closeWith: ['click']
                }).show()
            }).fail(function(err){
                new Noty({
                    type: 'error',
                    text: err.message,
                    layout: 'topRight',
                    theme: 'nest',
                    timeout: 2000,
                    progressBar: true,
                    closeWith: ['click']
                }).show()
            })
        }
    })

    // $('#createAccountForm').submit(function(event){
    //     console.log('Create account form', window.location.pathname, $('#createAccountForm').attr('action'))
    //     let formData={
    //         name: $('#name').val(),
    //         email: $('#email').val(),
    //         password: $('#password').val(),
    //         confirmpassword: $('#confirmpassword').val()
    //     }
        
    //     $.ajax({
    //         url: "http://localhost:8000/user/createAccount",
    //         method: "POST",
    //         data: JSON.stringify(formData),
    //         contentType: 'application/json',
    //         dataType: 'json',
    //         encode: true
    //     }).done(function(data){
    //         console.log('Signup Successfully', data)
    //         window.location.assign('/')
    //     })
    //     event.preventDefault();
    // })

    $('#loginUserForm').submit((e)=>{
        console.log('Login form submitted')
        //e.preventDefault()
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

    $('#closeButton').click(()=>{
        $('#changeStatusBox').hide();
        $('.checkbox').prop('checked', false);
    })

    $('#signupButton').click(()=>{
        console.log('clicked')
        //$('body').load('views/signup.ejs #createAccountForm')
    })
})

