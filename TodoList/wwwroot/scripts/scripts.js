function getNewButtonElement(textContent, classList) {
    const button = document.createElement("button");
    classList.forEach(className => button.classList.add(className));
    button.textContent = textContent;

    return button;
}

function getNewDivElement(classList) {
    const div = document.createElement("div");
    classList.forEach(className => div.classList.add(className));

    return div;
}

function saveNewTodo(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const todo = formData.get("todo");

    todoList.push(todo);
    event.target.reset();

    renderTodoList();
}

function deleteTodo(event) {
    todoList.splice(event.target.closest("li").id, 1);
    renderTodoList();
}

function saveEditedTodo(event) {
    const listElement = event.target.closest("li");
    const inputElement = listElement.querySelector(".todo-input");
    todoList[listElement.id] = inputElement.value;

    renderTodoList();
}

function cancelFromEdit() {
    renderTodoList();
}

function goToEditTodo(event) {
    renderTodoList();

    const listElement = event.target.closest("li");
    const todoText = listElement.querySelector(".todo-text").textContent;
    listElement.innerHTML = "";

    const todoInput = document.createElement("textarea");
    todoInput.classList.add("todo-input");
    todoInput.type = "text";
    todoInput.name = "todo";
    todoInput.value = todoText;

    const cancelButton = getNewButtonElement("Отменить", ["dark-blue-button", "cancel-button"]);
    cancelButton.addEventListener("click", cancelFromEdit);

    const saveButton = getNewButtonElement("Сохранить", ["dark-blue-button", "save-button"]);
    saveButton.addEventListener("click", saveEditedTodo);

    const buttonsDiv = getNewDivElement(["todo-item-buttons-container"]);
    buttonsDiv.appendChild(cancelButton);
    buttonsDiv.appendChild(saveButton);

    const listItemDiv = getNewDivElement(["todo-item-content"]);
    listItemDiv.appendChild(todoInput);
    listItemDiv.appendChild(buttonsDiv);

    listElement.appendChild(listItemDiv);
}

function renderTodoList() {
    const todoListElement = document.querySelector(".todo-list");
    todoListElement.innerHTML = "";

    for (let i = 0; i < todoList.length; i++) {
        const todoSpan = document.createElement("span");
        todoSpan.classList.add("todo-text");
        todoSpan.textContent = todoList[i];

        const deleteButton = getNewButtonElement("Удалить", ["dark-blue-button", "delete-button"]);
        deleteButton.addEventListener("click", deleteTodo);

        const editButton = getNewButtonElement("Редактировать", ["dark-blue-button", "edit-button"]);
        editButton.addEventListener("click", goToEditTodo);

        const buttonsDiv = getNewDivElement(["todo-item-buttons-container"]);
        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.appendChild(editButton);

        const listItemDiv = getNewDivElement(["todo-item-content"]);
        listItemDiv.appendChild(todoSpan);
        listItemDiv.appendChild(buttonsDiv);

        const listItem = document.createElement("li");
        listItem.appendChild(listItemDiv);
        listItem.id = i;

        todoListElement.appendChild(listItem);
    }
}

(function () {
    window.todoList = window.todoList || [];

    const submitButton = document.querySelector(".todo-form");
    submitButton.addEventListener("submit", saveNewTodo);
})();
