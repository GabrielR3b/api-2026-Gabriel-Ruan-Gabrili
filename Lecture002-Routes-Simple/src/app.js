import express from "express";
import { listaDeLivros, listaDeEditoras } from "./fake_data.js";

const app = express();

// Habilitar JSON
app.use(express.json());

// Teste
console.log(listaDeLivros);
console.log(listaDeEditoras);

app.get("/", (req, res) => {
  res.send({ message: "Servidor em Execução", success: true });
});

app.get("/equipe", (req, res) => {
  res.send([
    { nome: "Gabriel", curso: "TI" },
    { nome: "Gabrili", curso: "TI" },
    { nome: "Ruan", curso: "TI" },
  ]);
});


app.get("/gabriel-ruan-gabrili/gabriel", (req, res) => {
  res.json({
    nome: "Gabriel",
    matricula: "20251131000248",
    info: "Apoiador do Intercurso",
  });
});

app.get("/gabriel-ruan-gabrili/ruan", (req, res) => {
  res.json({
    nome: "Ruan",
    matricula: "20251131000094",
    info: "Aluno de Info II",
  });
});

app.get("/gabriel-ruan-gabrili/gabrili", (req, res) => {
  res.json({
    nome: "Gabrili",
    matricula: "20251131000191",
    info: "Téc.info",
  });
});

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

/* LISTAR editoras */
app.get("/api/editoras", (req, res) => {
  res.json(listaDeEditoras);
});

/* GET - buscar editora por ID */
app.get("/api/editoras/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido!",
      });
    }

    const editora = listaDeEditoras.find(
      (editora) => editora.id === id
    );

    if (!editora) {
      return res.status(404).json({
        mensagem: "Editora não encontrada!",
      });
    }

    res.status(200).json(editora);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro interno do servidor",
      error: error.message,
    });
  }
});

/* ADICIONAR editora */
app.post("/api/editoras", (req, res) => {
  const novaEditora = req.body;

  listaDeEditoras.push(novaEditora);

  res.status(201).json({
    mensagem: "Editora adicionada com sucesso",
    editora: novaEditora,
  });
});

/* ATUALIZAR editora */
app.put("/api/editoras/:id", (req, res) => {
  const id = Number(req.params.id);
  const dadosAtualizados = req.body;

  const index = listaDeEditoras.findIndex(
    (editora) => editora.id === id
  );

  if (index !== -1) {
    listaDeEditoras[index] = {
      ...listaDeEditoras[index],
      ...dadosAtualizados,
    };

    res.json({
      mensagem: "Editora atualizada com sucesso",
      editora: listaDeEditoras[index],
    });
  } else {
    res.status(404).json({
      mensagem: "Editora não encontrada",
    });
  }
});

/* REMOVER editora */
app.delete("/api/editoras/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = listaDeEditoras.findIndex(
    (editora) => editora.id === id
  );

  if (index !== -1) {
    const removida = listaDeEditoras.splice(index, 1);

    res.json({
      mensagem: "Editora removida com sucesso",
      editora: removida,
    });
  } else {
    res.status(404).json({
      mensagem: "Editora não encontrada",
    });
  }
});

// PATCH - atualizar parcialmente editora
app.patch("/api/editoras/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido!",
      });
    }

    const { nome, cnpj } = req.body;

    const index = listaDeEditoras.findIndex(
      (editora) => editora.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        mensagem: "Editora não encontrada!",
      });
    }

    if (nome !== undefined)
      listaDeEditoras[index].nome = nome;

    if (cnpj !== undefined)
      listaDeEditoras[index].cnpj = cnpj;

    return res.status(200).json({
      mensagem: "Editora atualizada!",
      editora: listaDeEditoras[index],
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno do servidor",
      error: error.message,
    });
  }
});

// Iniciar servidor (sempre no final)
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on localhost:3000");
});