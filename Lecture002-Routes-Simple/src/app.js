import express from "express";
import { listaDeLivros } from "src/fake_data.js";

const app = express();

// Habilitar JSON
app.use(express.json());

// Teste
console.log(listaDeLivros);

// GET - listar todos os livros
app.get("/api/livros", (req, res) => {
  try {
    if (!listaDeLivros || listaDeLivros.length === 0) {
      return res.status(404).json({
        message: "Nenhum livro encontrado",
      });
    }

    res.status(200).json(listaDeLivros);
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});

// GET - buscar livro por ID
app.get("/api/livros/:livroId", (req, res) => {
  try {
    const livroId = Number(req.params.livroId);

    if (isNaN(livroId)) {
      return res.status(400).json({
        message: "ID inválido!",
      });
    }

    const livro = listaDeLivros.find(
      (livro) => livro.id === livroId
    );

    if (!livro) {
      return res.status(404).json({
        message: "Livro não encontrado!",
      });
    }

    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});

// POST - criar livro
app.post("/api/livros", (req, res) => {
  try {
    const { titulo, ano, disponivel, exemplares } = req.body;

    const novoLivro = {
      id: listaDeLivros.length + 1,
      titulo,
      ano,
      disponivel,
      exemplares,
    };

    listaDeLivros.push(novoLivro);

    return res.status(201).json({
      message: "Novo livro cadastrado!",
      livro: novoLivro,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});

// PUT - atualizar livro completo
app.put("/api/livros/:livroId", (req, res) => {
  try {
    const livroId = Number(req.params.livroId);

    const { titulo, ano, disponivel, exemplares } = req.body;

    const livroIndex = listaDeLivros.findIndex(
      (livro) => livro.id === livroId
    );

    if (livroIndex === -1) {
      return res.status(404).json({
        message: "Livro não encontrado!",
      });
    }

    listaDeLivros[livroIndex] = {
      id: livroId,
      titulo,
      ano,
      disponivel,
      exemplares,
    };

    return res.status(200).json({
      message: "Livro atualizado!",
      livro: listaDeLivros[livroIndex],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});

// DELETE - remover livro
app.delete("/api/livros/:livroId", (req, res) => {
  try {
    const livroId = Number(req.params.livroId);

    const livroIndex = listaDeLivros.findIndex(
      (livro) => livro.id === livroId
    );

    if (livroIndex === -1) {
      return res.status(404).json({
        message: "Livro não encontrado!",
      });
    }

    const [deletedLivro] = listaDeLivros.splice(
      livroIndex,
      1
    );

    return res.status(200).json({
      message: "Livro deletado!",
      livro: deletedLivro,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});

// PATCH - atualizar parcialmente
app.patch("/api/livros/:livroId", (req, res) => {
  try {
    const livroId = Number(req.params.livroId);

    const {
      titulo,
      ano,
      disponivel,
      exemplares
    } = req.body;

    const livroIndex = listaDeLivros.findIndex(
      (livro) => livro.id === livroId
    );

    if (livroIndex === -1) {
      return res.status(404).json({
        message: "Livro não encontrado!",
      });
    }

    if (titulo !== undefined)
      listaDeLivros[livroIndex].titulo = titulo;

    if (ano !== undefined)
      listaDeLivros[livroIndex].ano = ano;

    if (disponivel !== undefined)
      listaDeLivros[livroIndex].disponivel = disponivel;

    if (exemplares !== undefined)
      listaDeLivros[livroIndex].exemplares = exemplares;

    return res.status(200).json({
      message: "Livro atualizado!",
      livro: listaDeLivros[livroIndex],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
});

// Iniciar servidor (sempre no final)
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on localhost:3000");
});