'use strict';

const fs=require('fs');
const path=require('path');

//read=(filepath, encoding)=>{...}
function read(filePath, encoding) {
  return new Promise((resolve, reject)=>{
    fs.readFile(filePath, encoding, (err,data)=>{
      if(err){
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
}

const sendFile=function(res, filePath,
  options={
    type:'text/html',
    encoding:'utf8'
  }){
  read(filePath,options.encoding)
    .then(data => {
      res.writeHead(200, {
        'content-type':options.type,
        'content-length':data.length
      });
      res.end(data,options.encoding);
    })
    .catch(err=>{
      res.setStatusCode=404;
      res.end(err.message);
    });
};

//const sendJson=function(res, flavor){...}
const sendJson=(res)=>{
  read(path.join(__dirname, 'coders.json'),'utf8')
  .then(data=>JSON.parse(data))
  .then(coders=>{
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(coders));
  })
  .catch(err=>{
    res.setStatusCode=404;
    res.end(err.message);
  });
};

const sendFlavors= res =>{
  read(path.join(__dirname, 'iceCream.json'), 'utf8')
  .then(data=>JSON.parse(data))
  .then(iceCreams=>Object.keys(iceCreams))
  .then(flavors=>{
    res.writeHead(200, {'content-type':'application/json'});
    res.end(JSON.stringify(flavors));
  })
  .catch(err=>{
    res.setStatusCode=404;
    res.end(err.message);
  });
}

module.exports={
  sendFile,
  sendJson,
  sendFlavors
};
