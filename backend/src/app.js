import express from "express";
const app = express();

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

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on localhost:3000");
});

app.get('/gabriel-ruan-gabrili/gabriel', (req, res) => { 
    res.json({ 
        nome: "Gabriel", 
        matricula: "20251131000248", 
        info: "Apoiador do Intercurso" 
    }); 
});