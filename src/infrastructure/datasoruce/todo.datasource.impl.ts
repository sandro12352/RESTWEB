import { prisma } from "../../data/mysql";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource{
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data:createTodoDto!
        });
        return TodoEntity.fromObject(todo);
    }
    
    async getAll(): Promise<TodoEntity[]> {
       const todos = await prisma.todo.findMany();
        return todos.map(todo=>TodoEntity.fromObject(todo));
    }

    async findById(id: number): Promise<TodoEntity | undefined> {
        const todo = await prisma.todo.findFirst({
            where:{id}
        })
        if(!todo) throw `Todo with id ${id} not found`;
        return TodoEntity.fromObject(todo);
    }

    async updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | undefined> {
        const todo = await this.findById(updateTodoDto.id)
        
        const updateTodo = await prisma.todo.update({
            where:{id:updateTodoDto.id},
            data:updateTodoDto!.values
        })
        
        return TodoEntity.fromObject(updateTodo);


    }

    async delete(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deleted =await prisma.todo.delete({
            where:{id:id},
        });
        return TodoEntity.fromObject(deleted);
    }

}