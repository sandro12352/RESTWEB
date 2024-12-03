"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const server = http_1.default.createServer((req, res) => {
    var _a, _b;
    console.log(req.url);
    // res.writeHead(200,{"content-type":"text/html"});
    // res.write(`<h1>Hola ${req.url}</h1>`)
    // res.end();
    if (req.url === '/') {
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.end(htmlFile);
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.includes('.css')) {
        const htmlFile = fs_1.default.readFileSync('./public/css/style.css', 'utf-8');
        res.writeHead(200, { "content-type": "text/css" });
        res.end(htmlFile);
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.includes('.js')) {
        const htmlFile = fs_1.default.readFileSync('./public/js/app.js', 'utf-8');
        res.writeHead(200, { "content-type": "application/javascript" });
        res.end(htmlFile);
    }
    else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end();
    }
});
server.listen(3000, () => {
    console.log('Server runing on port 3000');
});
