const input=document.getElementById('description')


input.addEventListener('click',()=>{
    console.log('Clicked')
    input.style.border="none"
})
$(document).ready(function(){
    $('form').submit(function(event){
        var formData={
            description: $('#description').val(),
            category: $('#category').val(),
            date: $('#date').val()
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/task/add',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            dataType: 'json',
            encode: true
        }).done(function(data){
            console.log('Task Created:',data)

            let div=$('<div>', { id: task._id })
            div.append($("<p>", {text: 'Task: '+task.description}))
            div.append($("<p>", {text: 'Due Date: '+task.dueDate.substring(0, 10)}))
            div.append($("<small>", {text: '  Category: '+task.category}))
            $('#displayTasks').append(div)
        })

        event.preventDefault();
    })


    //GET ALL THE TASKS WHEN PAGE RELOADS TO DISPLAY THE TASKS
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/task/all',
        async: false
    }).done(function(data){
        console.log('ALL TASKS:', data)
        let tasks=data.allTasks

        tasks.forEach(task=>{
            let div=$('<div>', { id: task._id })
            div.append($("<h4>", {text: 'Task: '+task.description}))
            div.append($("<p>", {text: 'Due Date: '+task.dueDate.substring(0, 10)}))
            div.append($("<small>", {text: '  Category: '+task.category}))
            $('#displayTasks').append(div)
        })
    })
})

