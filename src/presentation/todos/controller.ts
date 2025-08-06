import { Request, Response } from "express"
import { prisma } from "../../data/mysql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";



export class TodosController{

    //DI
    constructor(
        private readonly repository:TodoRepository,
    ){}


    public getTodos  = async (req:Request,res:Response)=>{
        const todos =await this.repository.getAll();
         res.json(todos);
         console.log(todos)
         return        
    }

    public getTodoById =async (req:Request,res:Response)=>{
        const id = +req.params.id;
        const todo = await prisma.todo.findFirst({
            where:{id:id}
        })
        
        if(!todo) {
            res.status(404).json({error:`Todo with id ${id} not found`}); 
            return;
        } 
        res.json(todo)
    }

    public createTodo = async (req:Request,res:Response)=>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);


        try {
            const todo = await prisma.todo.create({
                data:createTodoDto!
            })
            res.json(todo);
        } catch (error) {
            res.status(404).json({error})
            return;
        }

       

    }

    public updateTodo = async (req:Request,res:Response)=>{
        const id = +req.params.id;
        const [error,updateTodoDto] = UpdateTodoDto.create({...req.body,id});
        
        const todo = await prisma.todo.findFirst({
            where:{id}
        })
        if(!todo) {
            res.status(404).json({error:`Todo with id ${id} not found`}); 
            return;
        }  

        const  updateTodo =await prisma.todo.update({
            where:{id},
            data:updateTodoDto!.values
        })
        res.json(updateTodo);
        


        res.send(todo)
    }


    public deleteTodo =async (req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)) {
             res.status(400).json({ error: 'ID is not a valid number' });
             return;
        }
        const todo = await prisma.todo.findFirst({
            where:{id}
        })
        
        if (!todo) {
            res.status(404).json({error:`Todo with id ${id} not found`}); 
            return
        }

        const deletedTodo =await prisma.todo.delete({
            where:{id:id},
        })

        res.json(deletedTodo);
        
    
       
      
    
    }
   
}