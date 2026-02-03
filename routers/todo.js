import express from 'express';
import { getTodos,addTodos,updateTodos,deleteTodo } from '../controllers/todo.js';

const todoRouter= express.Router();

todoRouter.get('/',getTodos );
todoRouter.post('/add', addTodos);
todoRouter.put('/update/:id', updateTodos);
todoRouter.delete('/delete/:id',deleteTodo );

export default todoRouter;