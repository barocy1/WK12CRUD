
$(document).ready(function() {
    // Fetch tasks from the API
    function getTasks() {
        $.get("http://localhost:3000/tasks", function(tasks) {
            $("#taskList").empty();
            tasks.forEach(function(task) {
                $("#taskList").append(`
                    <li class="list-group-item">
                        ${task.title}
                        <button class="btn btn-danger btn-sm float-end deleteTask" data-id="${task.id}">Delete</button>
                    </li>
                `);
            });
        });
    }

    // Get initial tasks
    getTasks();

    // Handle form submission to create new task
    $("#taskForm").submit(function(event) {
        event.preventDefault();
        const taskTitle = $("#taskTitle").val();
        $.post("http://localhost:3000/tasks", { title: taskTitle }, function() {
            $("#taskTitle").val("");
            getTasks();
        });
    });

    // Handle task deletion
    $("#taskList").on("click", ".deleteTask", function() {
        const taskId = $(this).data("id");
        $.ajax({
            url: `http://localhost:3000/tasks/${taskId}`,
            type: "DELETE",
            success: function() {
                getTasks();
            }
        });
    });
});

