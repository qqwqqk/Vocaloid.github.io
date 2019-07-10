import '../style/error.css';

let h = document.createElement('h1');
h.innerHTML = "404 error";
h.className = "h";

let d = document.createElement('div');
d.innerHTML = "页面可能处于调试、开发或重构状态，暂时无法访问。";
d.className = "d";

let e = document.getElementById('root');
e.appendChild(h);
e.appendChild(d);