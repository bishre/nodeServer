'use strict';

const http = require('http');
// const fs = require('fs');
const path = require('path');
const url=require('url');

const {sendFile, sendJson, sendFlavors}=require(path.join(__dirname,'fileHandler.js'));

const config = require(path.join(__dirname, 'config.json'));

// console.log(config);
// console.log(config.port);

const homePath=path.join(__dirname, 'home.html');
const faviconPath=path.join(__dirname, 'favicon.png');
// const stylePath=path.join(__dirname, 'styles.css');

const coders=require(path.join(__dirname, 'coders.json'));

const server=http.createServer((req, res)=>{
  let route=url.parse(req.url).pathname;

  if (route==='/') {
    sendFile(res,homePath);
  }
  else if(route==='/all'){
    sendJson(res);
  }
  else if (route.startsWith('/styles')){
    sendFile(res,path.join(__dirname,route),{type:'text/css',encoding:'utf8'});
  }
  else if (route.startsWith('/images')){
    sendFile(res,path.join(__dirname, route.substr(1)),
    {type:'image/png',encoding:'binary'});
  }
  else if (route.startsWith('/js')){
    sendFile(res, path.join(__dirname, route),
      {type:'text/javascript', encoding:'utf8'});
  }
  else {
    res.end();
  }
});

server.listen(config.port, config.host, ()=>{
  console.log(`Server ${config.host} is running at the port ${config.port}`);
})
