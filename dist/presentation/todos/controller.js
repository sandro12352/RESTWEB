"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const todos = [
    { id: 1, nombre: 'sandro', apellido: 'pachas' },
    { id: 2, nombre: 'pedro', apellido: 'espichan' },
    { id: 3, nombre: 'franco', apellido: 'diaz' },
];
class TodosController {
    //DI
    constructor() {
        this.getTodos = (req, res) => {
            res.json(todos);
            return;
        };
        this.getTodoById = (req, res) => {
            const id = +req.params.id;
            const todo = todos.find(todo => todo.id === id);
            if (!todo)
                res.status(404).json({ error: `Todo with id ${id} not found` });
            res.json(todo);
        };
        this.createTodo = (req, res) => {
            const { nombre, apellido } = req.body;
            const newTodo = {
                id: todos.length + 1,
                nombre: nombre,
                apellido: apellido,
            };
            todos.push(newTodo);
            res.send(newTodo);
        };
        this.updateTodo = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id)) {
                res.status(404).json({ error: `ID argument is not a number` });
                return;
            }
            const todo = todos.find(todo => todo.id === id);
            if (!todo) {
                res.status(404).json({ error: `Todo with id ${id} not found` });
                return;
            }
            const { nombre, apellido } = req.body;
            todo.nombre = nombre || todo.nombre,
                todo.apellido = apellido || todo.apellido;
            res.send(todo);
        };
        this.deleteTodo = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id)) {
                res.status(400).json({ error: 'ID is not a valid number' });
                return;
            }
            // Encontrar el índice del todo con el ID especificado
            const index = todos.findIndex((todo) => todo.id === id);
            // Si no se encuentra el todo, devolvemos un error 404
            if (index === -1) {
                res.status(404).json({ error: `Todo with ID ${id} not found` });
                return;
            }
            else {
                // Eliminamos el todo encontrado y enviamos la respuesta
                const deletedTodo = todos.splice(index, 1); // `splice` devuelve un array con los elementos eliminados
                res.json(deletedTodo);
                return;
            }
        };
    }
}
exports.TodosController = TodosController;
