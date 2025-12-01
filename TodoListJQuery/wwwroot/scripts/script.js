"use strict";

(function () {
    const todoList = [];

    function deleteTodo(e) {
        const listElement = $(e.target).closest("li");
        const todoId = listElement.attr("id");
        todoList.splice(parseInt(todoId.replace("todo-", "")), 1);
        listElement.remove();
    }

    function saveEditedTodo(e) {
        const listElement = $(e.target).closest("li");
        const todoTextArea = listElement.find(".todo-text textarea");
        const todoText = todoTextArea.val().trim();
        const editedEmptyTodoErrorMessage = listElement.find(".edited-empty-todo-error-message");

        if (!todoText) {
            editedEmptyTodoErrorMessage.removeClass("d-none");
            return;
        }

        const todoId = listElement.attr("id");
        todoList[parseInt(todoId.replace("todo-", ""))] = todoText;
        $(".todo-list").empty();
        renderTodoList();
    }

    function cancelFromEdit(e) {
        $(".todo-list").empty();
        renderTodoList();
    }

    function goToEditTodo(e) {
        const listElement = $(e.target).closest("li");
        const todoText = listElement.find(".todo-text").text();
        listElement.empty();

        const editMarkup = $(`
            <div class="todo-container row g-2 d-flex align-items-center">
                <span class="edited-empty-todo-error-message col-12 mb-1 d-none text-danger">Невозможно сохранить пустую заметку</span>
                <div class="todo-text col-12 col-lg-9 mt-2">
                    <textarea id="todo" class="edit-todo-textarea form-control" placeholder="Введите задачу"></textarea>
                </div>

                <div class="manage-buttons-container col-12 col-lg-3 d-flex justify-content-lg-end justify-content-start flex-nowrap">
                    <button class="cancel-button btn btn-danger me-1">Отменить</button>
                    <button class="save-button btn btn-primary">Сохранить</button>
                </div>
            </div>
        `);

        editMarkup.find(".edit-todo-textarea").val(todoText);
        editMarkup.find(".cancel-button").click(cancelFromEdit);
        editMarkup.find(".save-button").click(saveEditedTodo);

        listElement.append(editMarkup);
    }

    function saveNewTodo(todo) {
        if (!todo) {
            $(".empty-todo-error-message").removeClass("d-none");
            return;
        }

        todoList.push(todo);
        renderTodoList();
    }

    function renderTodoList() {
        todoList.forEach((todo, i) => {
            const listElement = $(`
                <li id="todo-${i}" class="list-group-item pe-1">
                    <div class="todo-container row g-2 d-flex align-items-center">
                        <span class="edited-empty-todo-error-message col-12 mb-1 d-none text-danger">Невозможно сохранить пустую заметку</span>
                        <span class="todo-text col-12 col-lg-9"></span>

                        <div class="manage-buttons-container col-12 col-lg-3 d-flex justify-content-lg-end justify-content-start flex-nowrap">
                            <button class="delete-button btn btn-danger me-1">Удалить</button>
                            <button class="edit-button btn btn-primary">Редактировать</button>
                        </div>
                    </div>
                </li>
            `);

            listElement.find(".todo-text").text(todo);
            listElement.find(".delete-button").click(deleteTodo);
            listElement.find(".edit-button").click(goToEditTodo);

            $(".empty-todo-error-message").addClass("d-none");
            const todoListElement = $(".todo-list");
            listElement.appendTo(todoListElement);
        });
    }

    $(() => {
        $(".todo-form").submit(() => {
            const todoInput = $("#todo-input");
            saveNewTodo(todoInput.val().trim());
            todoInput.val("");

            return false;
        }); 
    });
})();
