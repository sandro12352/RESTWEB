import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoRepository{

    abstract create(createTodoDto:CreateTodoDto):Promise<TodoEntity>;


    abstract getAll():Promise<TodoEntity[]>;

    abstract findById(id:number):Promise<TodoEntity | undefined>;

    abstract updateTodo(updateTodoDto:UpdateTodoDto):Promise<TodoEntity|undefined>;

    abstract delete(id:number):Promise<TodoEntity>;


}