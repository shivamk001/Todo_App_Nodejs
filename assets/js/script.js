import { sortBy, changeStatus, changeStatusForm, deleteAllTasks, deleteTask, displayCategorywise, displayStatuswise, getAllTasks, createTask, closeButton } from "./functions.js"


$(document).ready(function(){

    //to create a new task
    $('#createTaskForm').on('submit', createTask)

    $('#changeStatusForm').submit(changeStatusForm)


    //GET ALL THE TASKS WHEN PAGE RELOADS TO DISPLAY THE TASKS
    getAllTasks()

    //to delete a task,
    //using event-delegation to make sure the delete functionality works
    $('#displayTasks').on('click', '.delete-button', deleteTask)

    //to select a task
    $('#displayTasks').on('change', '.checkbox', changeStatus)

    $('#get-all-tasks').on('click', getAllTasks)

    //to delete all tasks
    $('#delete-all-tasks').click(deleteAllTasks)

    //when an option is changed call sortBy function 
    $('#sortby').change(sortBy)

    //when an option is changed in display drop down
    $('#displaycategorywise').change(displayCategorywise)

    //when an option is changed in display drop down
    $('#displaystatuswise').change(displayStatuswise)

    $('#closeButton').click(closeButton)

})

