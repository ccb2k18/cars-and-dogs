const http = require("http");
const fs = require("fs");


const serveFile = (pathToFile, res, type="text/html") => {
    fs.readFile(`${__dirname}/${pathToFile}`, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write(`An internal server error occurred.`);
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": `${type}` });
            res.write(data);
            res.end();
        }
    });
};

const serve404NotFound = (res) => {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.readFile(`${__dirname}/public/views/404notfound.html`, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write("An internal server error occurred.");
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
};


http.createServer(function (req, res) {
    if (req.url === "/cars") {
        serveFile("/public/views/cars.html", res);
    } else if (req.url === "/dogs") {
        serveFile("/public/views/dogs.html", res);
    } else if (req.url === "/cars/new") {
        serveFile("/public/views/newcar.html", res);
    } else if (req.url.startsWith("/public/styles/")) {
        serveFile(req.url, res, "text/css");
    } else if (req.url.startsWith("/public/images/")) {
        serveFile(req.url, res, "image/jpg");
    } else {
        serve404NotFound(res);
    }
}).listen(7077);