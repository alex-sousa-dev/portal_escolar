const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/public/professor.html');
let content = fs.readFileSync(file, 'utf8');

// Replace localStorage get with fetch to /api/livros
content = content.replace(`let livrosDB = JSON.parse(localStorage.getItem('cesas_livros') || '[]');`, `let livrosDB = [];

async function carregarLivrosDoBackend() {
  try {
    const res = await fetch('/api/livros');
    if (res.ok) {
      const data = await res.json();
      livrosDB = data.map(l => ({
        id: l.id,
        titulo: l.titulo,
        autor: l.autor,
        categoria: l.categoria,
        descricao: l.descricao,
        tamanho: l.tamanho,
        dataAdicionado: new Date(l.data_adicionado).toLocaleDateString('pt-BR'),
        pdfPath: l.pdf_path
      }));
      renderLivros();
    }
  } catch (e) {
    console.error('Erro ao carregar livros:', e);
  }
}
document.addEventListener('DOMContentLoaded', carregarLivrosDoBackend);`);

content = content.replace(/async function adicionarLivro\(\)\s*\{[\s\S]*?setTimeout\(\(\) => \{ fecharUploadLivro\(\); renderLivros\(\); \}, 1000\);\s*\}/m, `async function adicionarLivro() {
  const titulo = document.getElementById('livro-titulo').value.trim();
  const autor  = document.getElementById('livro-autor').value.trim();
  const cat    = document.getElementById('livro-categoria').value;
  const desc   = document.getElementById('livro-descricao').value.trim();
  const msg    = document.getElementById('msg-livro');

  if(!titulo){ msg.textContent = '⚠ Informe o título do livro.'; msg.style.color='#C0392B'; return; }
  
  const formData = new FormData();
  formData.append('titulo', titulo);
  formData.append('autor', autor || 'Desconhecido');
  formData.append('categoria', cat);
  formData.append('descricao', desc);
  if (typeof livroArquivoAtual !== 'undefined' && livroArquivoAtual) {
    formData.append('pdf', livroArquivoAtual);
  }

  msg.textContent = 'Enviando...';
  msg.style.color = 'var(--muted)';

  try {
    const res = await fetch('/api/livros', {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      msg.textContent = '✓ Livro adicionado ao acervo com sucesso!';
      msg.style.color = '#4A7A55';
      await carregarLivrosDoBackend();
      setTimeout(() => { fecharUploadLivro(); }, 1000);
    } else {
      const err = await res.json();
      msg.textContent = 'Erro: ' + (err.error || 'Falha no upload');
      msg.style.color = '#C0392B';
    }
  } catch(e) {
    msg.textContent = 'Erro de conexão';
    msg.style.color = '#C0392B';
  }
}`);

content = content.replace(/function abrirLivro\(id\)\{[\s\S]*?w\.document\.close\(\);\s*\}/m, `function abrirLivro(id){
  const livro = livrosDB.find(l => l.id === id);
  if(!livro || !livro.pdfPath){ alert('PDF não disponível.'); return; }
  window.open(livro.pdfPath, '_blank');
}`);

content = content.replace(/function deletarLivro\(id, e\)\{[\s\S]*?renderLivros\(\);\s*\}/m, `async function deletarLivro(id, e){
  e.stopPropagation();
  const livro = livrosDB.find(l => l.id === id);
  if(!confirm(\`Remover "\${livro?.titulo}" do acervo?\`)) return;
  try {
    const res = await fetch(\`/api/livros/\${id}\`, { method: 'DELETE' });
    if(res.ok) {
      livrosDB = livrosDB.filter(l => l.id !== id);
      renderLivros();
    } else {
      alert('Erro ao deletar');
    }
  } catch(e) {
    alert('Erro de conexão');
  }
}`);

content = content.replace(/\$\{l\.pdfBase64 \?/g, '${l.pdfPath ?');

fs.writeFileSync(file, content, 'utf8');
