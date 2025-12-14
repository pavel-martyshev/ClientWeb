import { errorMessage } from "./errorMessage.js";

export const todoListElement = {
    components: {
        ErrorMessage: errorMessage
    },

    data() {
        return {
            todosForEdit: [],
            showErrorMessage: false
        };
    },

    props: {
        todoList: {
            type: Array,
            require: true
        }
    },

    methods: {
        saveEditedTodo(todo, index) {
            if (!todo) {
                this.showErrorMessage = true;
                return;
            }

            this.todosForEdit = this.todosForEdit.filter(t => t != todo);
            this.$emit('save-todo', todo, index);
        }
    },

    template: `
    <ul class="list-group list-group-flush px-1">
        <li v-for="(todo, index) in todoList" class="list-group-item pe-1">
            <div class="row g-2 d-flex align-items-center">
                <template v-if="!todosForEdit.includes(todo)">
                    <span class="col-12 col-lg-9">{{ todo }}</span>

                    <div class="col-12 col-lg-3 d-flex justify-content-lg-end justify-content-start">
                        <button class="btn btn-danger me-1" @click="$emit('remove-todo', todo)">Удалить</button>
                        <button class="btn btn-primary" @click="todosForEdit.push(todo)">Редактировать</button>
                    </div>
                </template>

                <template v-else>
                    <form @submit.prevent="saveEditedTodo(todo, index)">
                        <div class="row">
                            <todo-input
                                wrapper-class="col-12 my-2"
                                placeholder-text="Введите задачу"
                                v-model="todo">
                            </todo-input>

                            <error-message v-if="showErrorMessage">Невозможно сохранить пустую заметку</error-message>

                            <div class="col-12 d-flex justify-content-lg-end justify-content-start">
                                <button class="btn btn-danger me-1" @click="todosForEdit = todosForEdit.filter(t => t != todo)">Отменить</button>
                                <button class="btn btn-primary" type="submit">Сохранить</button>
                            </div>
                        </div>
                    </form>
                </template>
            </div>
        </li>
    </ul>
    `
};