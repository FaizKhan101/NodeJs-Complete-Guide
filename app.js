const http = require("http");
const fs = require("fs")

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method

  if (url === "/") {
    res.write(
      '<html><head><title>My first page</title></head><body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Submit</button></form></body></html>'
    );
    return res.end()
  }

  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY")
    res.statusCode = 302
    res.setHeader("Location", "/")
    return res.end()
  }

  res.write('<html><head><title>My first page</title></head><body><h1>Hello From Node Server.</h1></body></html>')
});

server.listen(3000);
