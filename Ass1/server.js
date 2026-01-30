const http = require("http");

const server = http.createServer((req, res) => {

  // Example numbers
  const a = 10;
  const b = 20;

  const sum = a + b;

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Addition of ${a} and ${b} is: ${sum}`);

});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
