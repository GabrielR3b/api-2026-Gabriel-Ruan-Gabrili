import express from "express";
const app = express();
app.listen(3000, () => {
console.log("Server running on localhost:3000");
});

app.get("/", (req, res) => {
res.send({message: "Servidor em Execução", success: true });
});

app.get("/equipe", (req, res) => {
res.send([
{nome: "Fulano", curso: "TI"},
{nome: "Fulano", curso: "TI"},
{nome: "Ciclano", curso: "TI"},
]);
});
