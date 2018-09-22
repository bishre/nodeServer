'use strict';
const http=require('http');
const fs=require('fs');
const path=require('path');
const qs = require('querystring');
const port=process.env.PORT || 3000;
const host=process.env.HOST || 'localhost';
const formPath=path.join(__dirname,'form.html');
const server=http.createServer((req,res)=>{
  if(req.method==='GET') {
    fs.readFile(formPath,'utf8',(err,data)=>{
      if(err) {
        res.statusCode=404;
        res.end(err.message);
      }
      else {
        res.writeHead(200, {
          'content-type':'text/html',
          'content-length':data.length
        });
        res.end(data);
      }
    });
  }
  else if(req.method==='POST'){
    if(req.headers['content-type'] !==
    'application/x-www-form-urlencoded') {
      res.statusCode=404;
      res.end('error');
    }
    else {
      let data=[];
      req.on('data', fragment=> data.push(fragment));
      req.on('end', ()=> {
        let tmp=qs.parse(Buffer.concat(data).toString());
        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify(tmp));
      });
    }
  }
});

server.listen(port,host,()=>
/*eslint-disable no-console */
console.log(`Server ${host} is serving at port ${port}.`)
/*eslint-enable no-console */
);
