console.log('JS is loaded');

$(document).ready(readyNow);

function readyNow(){
    console.log('JQ is loaded');
    $('#addTaskBtn').on('click', addTask);  
    getTasks();
    //click handler for deleteBtn
    $('#tasks').on('click', '#deleteBtn', function () {
        let taskId = $(this).data('taskid');
        console.log('Delete task with id', taskId);
        if(confirm('Are you sure you want to delete this task?')){
            deleteTask(taskId);
        }//end if
    });//end deleteBtn
    //click handler for editBtn
    $('#tasks').on('click', '#editBtn', function () {
        let taskId = $(this).data('taskid');
        console.log('Update task with id', taskId);
        updateTask(taskId);
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
    if ($('#taskIn').val()===''){
        alert('Please complete all fields');
        //end if
    }else{
    //new task object
    const taskToAdd = {
        task: $('#taskIn').val(),
        completed: 'N'//defaults new task to be entered as incomplete
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
    $('#taskIn').focus();//return focus to task input
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
    //empty tasks table
    $('#tasks').empty();
    for (task of tasks) {
        //append new row to table for each task
        let $tr = $('<tr></tr>');
        if(task.completed === 'Y'){//checks if task is completed and adds check mark
            $tr.append(`<td>✔️</td`);
        }else{
            $tr.append(`<td>☐</td`);//adds empty box if not completed
        }
        $tr.append(`<td>${task.task}</td>`);
        //add edit and delete buttons to DOM
        $tr.append(`<td><button class="btn btn-success" id="editBtn" data-taskid="${task.id}">Mark Completed</button></td>`);
        $tr.append(`<td><button class="btn btn-danger" id="deleteBtn" data-taskid="${task.id}">Delete</button></td>`);
        $('#tasks').append($tr);
        //check if task is completed and update DOM
        if (task.completed === 'Y') {
            $tr.css('background-color', 'rgb(0, 153, 51)');
            $tr.css('color', 'white');
        }
    }//end loop
}//end appendToDom