import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository{



    constructor(
        private readonly datasoruce:TodoDataSource,
    ){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasoruce.create(createTodoDto)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasoruce.getAll();
    }
    findById(id: number): Promise<TodoEntity | undefined> {
       return this.datasoruce.findById(id);
    }
    updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | undefined> {
        return this.datasoruce.updateTodo(updateTodoDto);
    }
    delete(id: number): Promise<TodoEntity> {
        return this.datasoruce.delete(id);
    }

}