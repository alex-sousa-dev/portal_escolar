const db = require('./src/config/database');
db.query(`
CREATE TABLE IF NOT EXISTS livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    categoria VARCHAR(100),
    descricao TEXT,
    nome_arquivo VARCHAR(255),
    tamanho INT,
    pdf_path VARCHAR(255),
    data_adicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`, (err) => {
    if(err) console.error(err);
    else console.log('Tabela livros criada');
    process.exit();
});
