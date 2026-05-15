const fs = require('fs');
const file = 'src/public/index.html';
let html = fs.readFileSync(file, 'utf8');

if(!html.includes('aos.css')) {
  html = html.replace('</head>', '  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>');
}
if(!html.includes('aos.js')) {
  html = html.replace('</body>', '  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n  <script>AOS.init({duration: 800, once: true});</script>\n</body>');
}

fs.writeFileSync(file, html, 'utf8');
