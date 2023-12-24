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
const sc = require("http-status-codes");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { error } = require("console");
const app = express();
const basepath = "./files";
// app.use(express.text);
const port = 3000;

app.get("/", function (request, response) {
    response.send("hello from file server");
});

app.get("/files/", function (request, response) {
    const filesPromise = getFilesPromiseByPath(basepath);
    filesPromise.then((files) => {
        response.status(sc.StatusCodes.OK).json(files);
    });
    filesPromise.catch((error) => {
        console.error(error.message, error);
        response
            .status(sc.StatusCodes.INTERNAL_SERVER_ERROR)
            .json("error while fetching");
    });
});

app.get("/files/:filename", (request, response) => {
    const filePath = basepath + "/" + request.params.filename;
    const fileContentPromise = getFileContentPromiseByPath(filePath);
    fileContentPromise.then((data) => {
        response.status(sc.StatusCodes.OK).send(data);
    });
});

app.listen(port, function () {
    console.log(`server started on port: ${port}`);
});

async function getFilesPromiseByPath(path) {
    let promise = new Promise((resolve, reject) => {
        let filesToReturn = [];
        fs.readdir(path, function (error, files) {
            if (error) {
                console.error(`Error reading files at ${path}`, error);
                reject(error);
            } else {
                files.map((file) => {
                    filesToReturn.push(file);
                });
                resolve(filesToReturn);
            }
        });
    });

    return promise;
}

async function getFileContentPromiseByPath(path) {
    let promise = new Promise((resolve, reject) => {
        // let filesToReturn = [];
        fs.readFile(path, "utf-8", (error, data) => {
            if (error) {
                console.error(`Error reading files at ${path}`, error);
                reject(error);
            } else resolve(data);
        });
    });

    return promise;
}
module.exports = app;
