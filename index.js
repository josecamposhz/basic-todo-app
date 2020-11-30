const app = new Vue({
    el: "#app",
    data: {
        newTodo: '',
        error: '',
        todos: [],
        editTodo: null,
        editIndex: -1
    },
    methods: {
        addNewTodo() {
            if (this.newTodo.length > 0) {
                this.todos.push({
                    description: this.newTodo,
                    status: false
                });
                this.newTodo = '';
                this.error = '';
            } else {
                this.error = 'Campo requerido';
            }
        },
        changeStatus(index) {
            this.todos[index].status = !this.todos[index].status;
        },
        editTask(index) {
            // Utilizamos el spread-operator para crear una copia del elemento seleccionado
            // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Spread_operator
            // Esto se realiza para evitar la referencia entre el elemento seleccionado y editTodo
            // Si solo hicieramos this.editTodo = this.todos[index], cada vez que editemos editTodo cambiara
            // automaticamente nuestro arreglo, lo cual no queremos en este caso
            this.editTodo = { ...this.todos[index] };
            // Guardamos el index para mostrar el input con el v-if en el HTML
            this.editIndex = index;
        },
        saveTask(status) {
            // Si status es true guardamos los cambios
            if (status) {
                this.todos[this.editIndex].description = this.editTodo.description;
            }
            this.editTodo = null;
            this.editIndex = -1;
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
        }
    },
})
