console.log('JS is loaded');

$(document).ready(readyNow);


function readyNow(){
    console.log('JQ is loaded');
    $('#addTaskBtn').on('click', addTask);  
    getTasks();
}//end readyNow

function addTask(){
    console.log('addTaskBtn clicked');
}//end addTask

function getTasks(){
console.log('in getTasks');
//ajax call to server
    $.ajax({
        method: `GET`,
        url: `/tasks`
    }).then(function (response) {
        console.log('back from GET with', response);   
        appendToDom(response);
    })
}//end getTasks

function appendToDom(){
    // Remove books that currently exist in the table
    $('#tasks').empty();
    for(task of tasks){
        // For each book, append a new row to our table
        let $tr = $('<tr></tr>');
        $tr.data('task', task);
        $tr.append(`<td>${task.id}</td>`);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td>${task.completed}</td>`);
        $tr.append(`<td><button class="editBtn">Mark Completed</button></td>`);
        $tr.append(`<td><button class="deleteBtn" data-taskid="${task.id}">Delete</button></td>`);
        $('#tasks').append($tr);
    }//end loop
}