import http from 'http';

const server = http.createServer((req, res) => {
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);

    if(req.url === '/'){
        res.end('Home Page!');
    }
    else if(req.url === '/about'){
        res.end('About Me!');
    }
    else{
        res.end('404 Not Found!');
    }
});

server.listen(3000, () => {
    console.log("Server running at https://localhost:3000")
});