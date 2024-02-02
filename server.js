const http = require("http"); //servidor HTTP
const express = require("express");
const app = express();

const servidorHTTP = http.createServer(app);
const io = require("socket.io")(servidorHTTP); //socket é o canal de identificação do usuário com meu servidor

app.use(express.static("public")); //arquivos estáticos - html, css...- que o servidor espera receber estão na public

io.addListener("connection", (socket) => {
  console.log("um usuário acabou de conectar");
  socket.addListener("nova mensagem", (msg) => {
    io.emit("nova mensagem", msg);
  });
});

servidorHTTP.listen(4040, '192.168.1.38'); //localhost:4040 vai acessar o chat em tempo real ou com o IPv4 192.168.1.38:4040
