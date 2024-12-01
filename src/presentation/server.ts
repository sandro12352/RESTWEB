import express from 'express'
import path from 'path';

interface Options{
    PORT:number,
    PUBLIC_PATH?:string,
}


export class Server{

    private readonly port:number;
    private readonly publicPath:string;
    private app = express();

    constructor(options:Options){
        const {PORT,PUBLIC_PATH='public' } = options
        this.port = PORT;
        this.publicPath = PUBLIC_PATH;
    }
    

    async start(){

        //middlewares

        //Public folder
        this.app.use(express.static(this.publicPath))

        this.app.get('*',(req,res)=>{
           const indexPath =path.join(__dirname + `../../../${this.publicPath}/index.html`) 
            res.sendFile(indexPath)
        })

        this.app.listen(`${this.port}`,()=>{
            console.log(`Server runing in port:${this.port}`);
        })
    }

}