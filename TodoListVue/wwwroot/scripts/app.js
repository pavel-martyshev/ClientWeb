import { todoInput } from "./components/todoInput.js";
import { todoListElement } from "./components/todoListElement.js";
import { errorMessage } from "./components/errorMessage.js";

const app = Vue.createApp({
    data() {
        return {
            todoList: [],
            newTodo: "",

            showErrorMessage: false
        };
    },

    methods: {
        saveTodo(todo, index) {
            if (this.newTodo) {
                this.todoList.push(this.newTodo.trim());
                this.newTodo = "";
                this.showErrorMessage = false;

                return;
            }

            if (todo && index !== undefined) {
                this.todoList[index] = todo.trim();
                this.showErrorMessage = false;
                return;
            }

            this.showErrorMessage = true;
        },

        removeTodo(todo) {
            this.todoList = this.todoList.filter(t => t !== todo);
        }
    }
});

app.component("TodoInput", todoInput);
app.component("ErrorMessage", errorMessage);
app.component("TodoListElement", todoListElement);

app.mount("#app");
