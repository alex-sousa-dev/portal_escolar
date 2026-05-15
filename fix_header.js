const fs = require('fs');
const file = 'src/public/index.html';
let html = fs.readFileSync(file, 'utf8');

// Replace topbar and mainNav with a modern glassmorphic header
const oldHeaderRegex = /<div class="topbar">[\s\S]*?<\/nav>/;

const newHeader = `
<!-- TOPBAR MODERNIZADA -->
<div class="topbar" data-aos="fade-down">
  <div class="container">
    <div class="topbar-l">
      <span><i class="bi bi-geo-alt-fill"></i> Rua do Sol, Centro - Caxias/MA</span>
      <span><i class="bi bi-telephone-fill"></i> (99) 3521-1234</span>
    </div>
    <div class="topbar-r">
      <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
      <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
      <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
    </div>
  </div>
</div>

<!-- NAVBAR MODERNIZADA -->
<nav id="mainNav" data-aos="fade-down" data-aos-delay="100">
  <div class="container">
    <a href="/" class="nav-brand">
      <div class="nav-logo-wrap">
        <img src="images/logo-cesas.png" alt="CESAS" class="nav-logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q0YzA5OCIvPjwvc3ZnPg=='" />
      </div>
      <div class="nav-brand-text">
        <span class="nav-name">São Francisco de Assis</span>
        <span class="nav-sub">Centro Educacional</span>
      </div>
    </a>
    
    <ul class="nav-ul">
      <li><a href="#" class="nl act">Início</a></li>
      <li><a href="#noticias" class="nl">Notícias</a></li>
      <li><a href="#cursos" class="nl">Cursos</a></li>
      <li><a href="#galeria" class="nl">Galeria</a></li>
      <li><a href="#boletim" class="nl">Boletim</a></li>
      <li><a href="#cursos-livres" class="nl">Cursos Livres</a></li>
      <li><a href="#doe" class="nl">Doe</a></li>
      <li><a href="#sobre" class="nl">Sobre</a></li>
    </ul>

    <div class="nav-actions">
      <div class="nav-dd" tabindex="0">
        <button class="nav-portais modern-btn">
          <span>Portais</span> <i class="bi bi-grid-3x3-gap-fill"></i>
        </button>
        <div class="nav-dd-menu">
          <div class="dd-header">Acesso ao Sistema</div>
          <div class="dd-grid">
            <a href="professor.html" class="dd-i">
              <div class="dd-icon dd-icon-prof"><i class="bi bi-briefcase-fill"></i></div>
              <div class="dd-text"><strong>Portal do Professor</strong><span>Diário e notas</span></div>
            </a>
            <a href="admin.html" class="dd-i">
              <div class="dd-icon dd-icon-admin"><i class="bi bi-shield-lock-fill"></i></div>
              <div class="dd-text"><strong>Administração</strong><span>Gestão escolar</span></div>
            </a>
            <a href="professor.html#biblioteca" class="dd-i">
              <div class="dd-icon dd-icon-books"><i class="bi bi-book-half"></i></div>
              <div class="dd-text"><strong>Biblioteca Virtual</strong><span>Acervo PDF</span></div>
            </a>
          </div>
        </div>
      </div>

      <button class="nav-tog" onclick="toggleNav()" aria-label="Menu">
        <div class="hamburger">
          <span></span><span></span><span></span>
        </div>
      </button>
    </div>
  </div>
</nav>
`;

html = html.replace(oldHeaderRegex, newHeader);

// Update some CSS to match
const cssInject = `
/* HEADER MODERNIZADO */
.topbar {
  background: linear-gradient(90deg, var(--marrom) 0%, #3e2210 100%);
  color: rgba(255,255,255,0.8);
  font-size: 0.75rem;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.topbar-l span { margin-right: 15px; font-weight: 500; letter-spacing: 0.02em; }
.topbar-l span i { color: var(--dourado); margin-right: 4px; }
.topbar-r a { color: rgba(255,255,255,0.7); text-decoration: none; margin-left: 12px; transition: color 0.3s ease; }
.topbar-r a:hover { color: var(--dourado); }

#mainNav {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 30px rgba(0,0,0,0.03);
}
#mainNav.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  padding: 5px 0;
}
.nav-logo-wrap {
  position: relative;
  padding: 4px;
  background: linear-gradient(135deg, var(--dourado), var(--marrom));
  border-radius: 50%;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.nav-brand:hover .nav-logo-wrap { transform: rotate(-5deg) scale(1.05); }
.nav-logo { border: 2px solid #fff; }

.nav-ul .nl {
  position: relative;
  font-weight: 600;
  padding: 8px 16px;
  color: var(--text-md);
  transition: color 0.3s;
}
.nav-ul .nl::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--dourado);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
}
.nav-ul .nl:hover::after, .nav-ul .nl.act::after { width: 60%; }
.nav-ul .nl:hover, .nav-ul .nl.act { color: var(--marrom); background: transparent; }

.nav-actions { display: flex; align-items: center; gap: 1rem; }

.modern-btn {
  background: linear-gradient(135deg, var(--marrom), #8B4513);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(92,51,23,0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
}
.modern-btn::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}
.modern-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(92,51,23,0.4);
}
.modern-btn:hover::before { left: 150%; }

.nav-dd-menu {
  width: 320px;
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: 0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
}
.dd-header {
  font-family: var(--font-d);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--marrom);
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}
.dd-grid { display: flex; flex-direction: column; gap: 8px; }
.dd-i {
  background: var(--creme);
  border: 1px solid transparent;
}
.dd-i:hover {
  background: #fff;
  border-color: var(--border);
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

/* HAMBURGER ANIMATION */
.hamburger {
  width: 24px; height: 20px;
  position: relative;
  display: flex; flex-direction: column; justify-content: space-between;
}
.hamburger span {
  display: block; width: 100%; height: 2px;
  background: var(--marrom); border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.nav-tog.open .hamburger span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
.nav-tog.open .hamburger span:nth-child(2) { opacity: 0; }
.nav-tog.open .hamburger span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
`;

html = html.replace('</style>', cssInject + '\n</style>');

fs.writeFileSync(file, html, 'utf8');
