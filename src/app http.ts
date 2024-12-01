import http from 'http'
import fs from 'fs'
const server = http.createServer( (req,res)=>{
    console.log(req.url);
    

    // res.writeHead(200,{"content-type":"text/html"});
    // res.write(`<h1>Hola ${req.url}</h1>`)
    // res.end();

    if(req.url==='/'){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8')
        res.end(htmlFile);
        return;
    }
    if(req.url?.includes('.css')){
        const htmlFile = fs.readFileSync('./public/css/style.css','utf-8')
        res.writeHead(200,{"content-type":"text/css"});
        res.end(htmlFile);
    }
    else if(req.url?.includes('.js')){
        const htmlFile = fs.readFileSync('./public/js/app.js','utf-8')
        res.writeHead(200,{"content-type":"application/javascript"});
        res.end(htmlFile);
    }
    
    
    else{
        res.writeHead(404,{"content-type":"text/html"});
        res.end();
    }

})


server.listen(3000,()=>{
    console.log('Server runing on port 3000');
})