console.log('JS is loaded');

$(document).ready(readyNow);

let counter = 0;


function readyNow(){
    console.log('JQ is loaded');
    $('#addTaskBtn').on('click', addTask);  
    getTasks();
    //click handler for deleteBtn
    $('#tasks').on('click', '#deleteBtn', function () {
        let taskId = $(this).data('taskid');
        console.log('Delete task with id', taskId);
        deleteTask(taskId);
    });//end deleteBtn
    $('#tasks').on('click', '#editBtn', function () {
        let taskId = $(this).data('taskid');
        console.log('Update task with id', taskId);
        updateTask(taskId);
        //$(this).parent().parent().css('background-color', 'green');
    });//end updateTask
}//end readyNow

function getTasks(){
console.log('in getTasks');
//ajax call to server
    $.ajax({
        method: `GET`,
        url: `/tasks`
    }).then(function (response) {
        //console.log('back from GET with', response);   
        appendToDom(response);
    })
}//end getTasks

function addTask(){
    console.log('addTaskBtn clicked');
    //test if fields are complete
    if ($('#taskIn').val()==='' || $('#completedIn').val()===''){
        alert('Please complete all fields');
        //end if
    }else{
    //new task object
    const taskToAdd = {
        task: $('#taskIn').val(),
        completed: $('#completedIn').val()
    }//end taskToAdd
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd,
    }).then(function (response) {
        console.log('back from POST with', response);
        getTasks();
        //clear inputs
        $('#taskIn').val('');
        $('#completedIn').val('');
    }).catch(function (error) {
        //errors
        console.log('Error in POST', error)
    });
}//end else
}//end addTask

function deleteTask(taskId){
    console.log('in deleteTask with ID', taskId);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function (response) {
        getTasks();
    })
}//end deleteTask

function updateTask(taskId){
console.log('editBtn clicked with ID', taskId);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function (response) {
        getTasks();
    })
}//end updateTask

function appendToDom(tasks){
    // Remove books that currently exist in the table
    $('#tasks').empty();
    counter = 0
    for (task of tasks) {
        counter++;
        // For each task, append a new row to our table
        let $tr = $('<tr></tr>');
        $tr.append(`<td>${counter}</td>`);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td>${task.completed}</td>`);
        $tr.append(`<td><button class="btn btn-success" id="editBtn" data-taskid="${task.id}">Mark Completed</button></td>`);
        $tr.append(`<td><button class="btn btn-danger" id="deleteBtn" data-taskid="${task.id}">Delete</button></td>`);
        $('#tasks').append($tr);
        if (task.completed === 'Y') {
            $tr.css('background-color', 'rgb(0, 153, 51)');
            $tr.css('color', 'white');
        }
    }//end loop
}//end appendToDom