# Centro Educacional São Francisco de Assis — Portal v5

## Novidades desta versão

### 🎨 Visual
- Tema franciscano completo (marrom, dourado, verde) em todas as páginas
- Imagens reais: mascote, estátua e foto da escola
- Redes sociais reais (Facebook e Instagram) configuradas

### 📋 Portal do Professor — Novas Funções
- **3 abas**: Notas | Frequência | Alunos
- **Lançamento de notas** por disciplina com prévia em tempo real
- **Consultar boletim** com impressão direta
- **Chamada (frequência)**: criar lista de alunos, marcar presente/falta, salvar
- **Relatório de frequência** por matrícula com barra de % e impressão
- **Lista de todos os alunos** com busca por nome/matrícula e impressão

### 📚 Cursos Livres — Público
- Seção no site principal com cards de cursos disponíveis
- **Inscrição online** com modal de preenchimento de dados
- **Comprovante imprimível** gerado imediatamente após inscrição

### 🔧 Painel Admin — Novas Funções
- **Gerenciar Cursos Livres**: criar, ativar/desativar
- **Buscar inscrição** por e-mail ou CPF
- **Emitir certificado** imprimível (layout oficial)
- **Gerar comprovante** de inscrição
- **Lista de inscritos por curso** com impressão

---

## Configuração do Banco de Dados

### 1. Restaurar banco original
```bash
psql -U postgres -c "CREATE DATABASE escola_bd;"
pg_restore -U postgres -d escola_bd escola_bd.sql
```

### 2. Executar migração v5
```bash
psql -U postgres -d escola_bd -f escola_bd_v5_migrations.sql
```

## Instalar dependências
```bash
npm install
```
> O pacote `uuid` foi adicionado para geração de códigos de certificado.

## Iniciar o servidor
```bash
node src/index.js
# ou com nodemon:
npx nodemon src/index.js
```

## Acesso
- **Site**: http://localhost:3000
- **Admin**: http://localhost:3000/admin.html
- **Professor**: http://localhost:3000/professor.html

## Novas Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/frequencias | Registrar chamada |
| GET | /api/frequencias/:matricula | Frequência do aluno |
| GET | /api/frequencias?disciplina_id=&data= | Lista de chamada por disciplina/data |
| GET | /api/cursos | Listar cursos ativos (público) |
| GET | /api/cursos/admin/todos | Listar todos os cursos (admin) |
| POST | /api/cursos | Criar novo curso |
| PUT | /api/cursos/:id | Atualizar/desativar curso |
| POST | /api/cursos/inscrever | Inscrição pública |
| GET | /api/cursos/inscricao/:id | Buscar inscrição por ID |
| GET | /api/cursos/:curso_id/inscritos | Inscritos de um curso |
| GET | /api/cursos/admin/buscar?termo= | Buscar por e-mail ou CPF |
| PUT | /api/cursos/inscricao/:id/cancelar | Cancelar inscrição |
| POST | /api/cursos/inscricao/:id/certificado | Emitir certificado |
| GET | /api/boletins/todos | Listar todos os alunos com média |

---

*Desenvolvido por alunos de ADS – UniFacema 2026 · Kledson, Hian, Carlos, Alex, André*

## ⚠️ IMPORTANTE — Após baixar a v7

### Substituição do bcrypt por bcryptjs
O pacote `bcrypt` (nativo C++) foi substituído por `bcryptjs` (puro JavaScript)
para garantir compatibilidade com Node.js v24 e qualquer sistema.

**Execute obrigatoriamente antes de iniciar:**
```bash
npm install
```

### Diagnosticar professores com senha inválida
Se professores não conseguem logar, execute no PostgreSQL:
```bash
psql -U postgres -d escola_bd -f reset_professores.sql
```
Isso mostrará todos os professores e o tipo de senha armazenada.
