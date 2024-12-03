import express, { Router } from 'express'
import path from 'path';

interface Options{
    PORT:number,
    routes:Router,
    PUBLIC_PATH?:string,
}


export class Server{

    private readonly port:number;
    private readonly publicPath:string;
    private readonly routes:Router;
    private app = express();

    constructor(options:Options){
        const {PORT,PUBLIC_PATH='public',routes } = options
        this.port = PORT;
        this.publicPath = PUBLIC_PATH;
        this.routes = routes;
    }
    

    async start(){

        //middlewares
        this.app.use(express.json());
   


        //Public folder
        this.app.use(express.static(this.publicPath))


        //Routes
        this.app.use(this.routes);



        //SPA
        this.app.get('*',(req,res)=>{
           const indexPath =path.join(__dirname + `../../../${this.publicPath}/index.html`) 
            res.sendFile(indexPath)
        })

        this.app.listen(`${this.port}`,()=>{
            console.log(`Server runing in port:${this.port}`);
        })
    }

}