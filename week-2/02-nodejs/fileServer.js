/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
import express from "express";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/files',(req,res)=>{
    fs.readdir(__dirname + '/files/',(err,files)=>{
      console.log(files);
        res.status(200).send(JSON.stringify(files));
    });
});

app.get('/file',(req,res)=>{
  console.log(__dirname + `/files/${req.query.filename}`);
    fs.readFile(__dirname + `/files/${req.query.filename}`,(err,data)=>{
      res.status(200).send(JSON.stringify(data));
    });
});

app.listen(PORT, ()=>{
  console.log(`server up at ${PORT}`);
})