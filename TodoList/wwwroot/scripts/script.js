"use strict";

(function () {
    function deleteTodo(e) {
        $(e.target).closest("li").remove();
    }

    function saveEditedTodo(e) {
        const listElement = $(e.target).closest("li");
        const todoTextarea = listElement.find(".todo-text textarea");
        const todoText = todoTextarea.val();
        listElement.find(".todo-text").remove();

        listElement.find(".todo-container").prepend(
            `<span class="todo-text col-9 my-auto">${todoText}</span>`
        );

        listElement.find(".delete-cancel-btn")
            .off()
            .click(deleteTodo)
            .text("Удалить");

        listElement.find(".edit-save-btn")
            .off()
            .click(goToEditTodo)
            .text("Редактировать");
    }

    function cancelFromEdit(e) {
        const listElement = $(e.target).closest("li");
        const todoText = listElement.find(".todo-text textarea").text();
        listElement.find(".todo-text").remove();

        listElement.find(".todo-container").prepend(
            `<span class="todo-text col-9 my-auto">${todoText}</span>`
        );

        listElement.find(".delete-cancel-btn")
            .off()
            .click(deleteTodo)
            .text("Удалить");

        listElement.find(".edit-save-btn")
            .off()
            .click(goToEditTodo)
            .text("Редактировать");
    }

    function goToEditTodo(e) {
        if ($("textarea").length != 1) {
            return;
        }

        const listElement = $(e.target).closest("li");
        const todoText = listElement.find(".todo-text").text();
        listElement.find(".todo-text").remove();

        listElement.find(".todo-container").prepend(
            `
            <div class="todo-text col-9 my-auto">
                <textarea id="todo" class="form-control m-0" placeholder="Введите задачу">${todoText}</textarea>
            </div>
            `
        );

        listElement.find(".delete-cancel-btn")
            .off()
            .click(cancelFromEdit)
            .text("Отменить");

        listElement.find(".edit-save-btn")
            .off()
            .click(saveEditedTodo)
            .text("Сохранить");
    }

    function saveTodo(todo) {
        if (!todo) {
            return;
        }

        const todoList = $(".todo-list");

        todoList.append(`
            <li class="list-group-item pe-1">
                <div class="todo-container row m-0 p-0">
                    <span class="todo-text col-9 my-auto">${todo}</span>
                    <div class="col my-auto text-end">
                        <button class="delete-cancel-btn btn btn-primary">Удалить</button>
                        <button class="edit-save-btn btn btn-primary">Редактировать</button>
                    </div>
                </div>
            </li>
        `);

        $(".delete-cancel-btn").last().click(deleteTodo);
        $(".edit-save-btn").last().click(goToEditTodo);
    }

    $(() => {
        $(".todo-form").on("submit", () => {
            saveTodo($("#todo-input").val());
            $("#todo-input").val("");

            return false;
        }); 
    });
})();
