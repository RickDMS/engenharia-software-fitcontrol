(function () {
  "use strict";
  var KEY = "fitcontrol:v1";
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (t) { var d = document.createElement("div"); d.textContent = t == null ? "" : t; return d.innerHTML; };
  var money = function (v) { return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  var iso = function (d) { return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
  var today = function () { return iso(new Date()); };
  var br = function (s) { return s.split("-").reverse().join("/"); };
  var digits = function (s) { return String(s || "").replace(/\D/g, ""); };
  var MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  function validCpf(c) {
    c = digits(c);
    if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
    for (var t = 9; t < 11; t++) {
      var s = 0;
      for (var i = 0; i < t; i++) s += Number(c[i]) * (t + 1 - i);
      if (((s * 10) % 11) % 10 !== Number(c[t])) return false;
    }
    return true;
  }
  function maskCpf(v) {
    v = digits(v).slice(0, 11);
    return v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  function maskTel(v) {
    v = digits(v).slice(0, 11);
    return v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  }

  // ---- "banco de dados" (localStorage) com dados de exemplo ----
  function seed() {
    var n = new Date(), m = [], id = 1;
    function add(cpf, off, status) {
      var d = new Date(n.getFullYear(), n.getMonth() + off, 10);
      var venc = iso(d);
      m.push({ id: id++, cpf: cpf, ref: venc.slice(0, 7), venc: venc, valor: 120, status: status, pagoEm: status === "Paga" ? (off === 0 ? today() : venc) : null });
    }
    for (var o = -5; o <= 0; o++) add("52998224725", o, "Paga");
    for (o = -5; o <= -2; o++) add("11144477735", o, "Paga");
    add("11144477735", -1, "Pendente"); add("11144477735", 0, "Pendente");
    return {
      alunos: [
        { nome: "Ana Souza (exemplo)", cpf: "52998224725", tel: "", email: "", ativo: true },
        { nome: "Bruno Lima (exemplo)", cpf: "11144477735", tel: "", email: "", ativo: true },
        { nome: "Carla Mendes (exemplo)", cpf: "93541134780", tel: "", email: "", ativo: false }
      ],
      mensalidades: m, acessos: []
    };
  }
  function load() {
    try { var d = JSON.parse(localStorage.getItem(KEY)); if (d && d.alunos) return d; } catch (e) {}
    var s = seed(); save(s); return s;
  }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  function status(m) { return m.status === "Paga" ? "Paga" : (m.venc < today() ? "Vencida" : "Pendente"); }
  function emAtraso(db, cpf) { return db.mensalidades.filter(function (m) { return m.cpf === cpf && status(m) === "Vencida"; }); }
  function chip(st) { var c = { Paga: "ok", Vencida: "bad", Pendente: "warn" }[st]; return '<span class="chip ' + c + '">' + st + "</span>"; }
  function say(el, text, kind) { el.className = "msg " + kind; el.textContent = text; el.hidden = false; }

  // ---- páginas ----
  var pages = {
    login: function () {
      var f = $("#form-login"), out = $("#login-msg");
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = f.email.value.trim();
        if (!/^\S+@\S+\.\S+$/.test(email) || !f.senha.value) { say(out, "Informe um e-mail válido e a senha.", "bad"); return; }
        var dest = { recepcionista: "cadastrar-aluno.html", gerente: "dashboard.html", aluno: "meu-treino.html" };
        location.href = dest[f.perfil.value];
      });
      $("#esqueci").addEventListener("click", function (e) {
        e.preventDefault();
        var email = f.email.value.trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) { say(out, "Digite seu e-mail para receber o link de recuperação.", "bad"); return; }
        say(out, "Enviamos um link de recuperação para " + email + ". (simulação)", "ok");
      });
    },
    cadastro: function () {
      var f = $("#form-aluno"), out = $("#cad-msg");
      f.cpf.addEventListener("input", function () { f.cpf.value = maskCpf(f.cpf.value); });
      f.tel.addEventListener("input", function () { f.tel.value = maskTel(f.tel.value); });
      function lista() {
        var db = load();
        $("#lista-alunos").innerHTML = db.alunos.map(function (a) {
          return "<tr><td>" + esc(a.nome) + "</td><td>" + maskCpf(a.cpf) + "</td><td>" + (a.ativo ? '<span class="chip ok">Ativo</span>' : '<span class="chip warn">Inativo</span>') + "</td></tr>";
        }).join("");
      }
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        ["nome", "cpf", "nasc", "tel", "email", "end"].forEach(function (k) { $("#err-" + k).textContent = ""; });
        var ok = true, db = load();
        function bad(k, t) { $("#err-" + k).textContent = t; ok = false; }
        if (f.nome.value.trim().split(/\s+/).length < 2) bad("nome", "Informe o nome completo.");
        if (!validCpf(f.cpf.value)) bad("cpf", "CPF inválido.");
        else if (db.alunos.some(function (a) { return a.cpf === digits(f.cpf.value); })) bad("cpf", "O CPF não pode estar duplicado.");
        if (!f.nasc.value) bad("nasc", "Informe a data de nascimento.");
        if (digits(f.tel.value).length < 10) bad("tel", "Telefone inválido.");
        if (!/^\S+@\S+\.\S+$/.test(f.email.value)) bad("email", "E-mail inválido.");
        if (!f.end.value.trim()) bad("end", "Informe o endereço.");
        if (!ok) { say(out, "Corrija os campos destacados.", "bad"); return; }
        db.alunos.push({ nome: f.nome.value.trim(), cpf: digits(f.cpf.value), nasc: f.nasc.value, tel: f.tel.value, email: f.email.value.trim(), end: f.end.value.trim(), ativo: true });
        save(db); f.reset(); lista(); say(out, "Aluno cadastrado com sucesso.", "ok");
      });
      f.addEventListener("reset", function () { out.hidden = true; });
      lista();
    },
    pagamento: function () {
      var f = $("#form-busca"), box = $("#resultado"), out = $("#pg-msg"), cpf = null;
      function render() {
        var db = load(), a = db.alunos.filter(function (x) { return x.cpf === cpf; })[0];
        var ms = db.mensalidades.filter(function (m) { return m.cpf === cpf; }).sort(function (x, y) { return x.ref < y.ref ? -1 : 1; });
        box.hidden = false;
        $("#aluno-nome").textContent = a.nome;
        $("#mens").innerHTML = ms.length ? ms.map(function (m) {
          var st = status(m);
          return "<tr><td>" + m.ref.split("-").reverse().join("/") + "</td><td>" + br(m.venc) + "</td><td>" + money(m.valor) + "</td><td>" + chip(st) + "</td><td style='text-align:right'>" +
            (st === "Paga" ? "" : '<button class="btn sm" data-id="' + m.id + '">Registrar pagamento</button>') + "</td></tr>";
        }).join("") : '<tr><td colspan="5">Nenhuma mensalidade gerada para este aluno.</td></tr>';
      }
      f.addEventListener("submit", function (e) {
        e.preventDefault(); out.hidden = true;
        var q = f.q.value.trim().toLowerCase(), dq = digits(q), db = load();
        var a = db.alunos.filter(function (x) { return (dq && x.cpf.indexOf(dq) === 0) || x.nome.toLowerCase().indexOf(q) >= 0; })[0];
        if (!q || !a) { box.hidden = true; say(out, "Aluno não encontrado.", "bad"); return; }
        cpf = a.cpf; render();
      });
      $("#mens").addEventListener("click", function (e) {
        var id = e.target.getAttribute("data-id"); if (!id) return;
        var db = load(); db.mensalidades.forEach(function (m) { if (String(m.id) === id) { m.status = "Paga"; m.pagoEm = today(); } });
        save(db); render(); say(out, "Pagamento registrado. Situação financeira atualizada.", "ok");
      });
    },
    dashboard: function () {
      var db = load(), n = new Date(), mes = today().slice(0, 7), fat = {}, i;
      var ativos = db.alunos.filter(function (a) { return a.ativo; });
      var pend = db.mensalidades.filter(function (m) { return m.status !== "Paga"; }).reduce(function (s, m) { return s + m.valor; }, 0);
      db.mensalidades.forEach(function (m) { if (m.pagoEm) { var k = m.pagoEm.slice(0, 7); fat[k] = (fat[k] || 0) + m.valor; } });
      $("#k-ativos").textContent = ativos.length;
      $("#k-inativos").textContent = db.alunos.length - ativos.length;
      $("#k-fat").textContent = money(fat[mes] || 0);
      $("#k-pend").textContent = money(pend);
      var ks = [], max = 1;
      for (i = 5; i >= 0; i--) { var d = new Date(n.getFullYear(), n.getMonth() - i, 1); ks.push([iso(d).slice(0, 7), MESES[d.getMonth()]]); }
      ks.forEach(function (k) { max = Math.max(max, fat[k[0]] || 0); });
      $("#bars").innerHTML = ks.map(function (k) { var v = fat[k[0]] || 0; return '<div style="height:' + Math.round(v / max * 100) + '%" title="' + k[1] + ": " + money(v) + '"></div>'; }).join("");
      $("#labels").innerHTML = ks.map(function (k) { return "<span>" + k[1] + "</span>"; }).join("");
      var inad = ativos.map(function (a) { return [a, emAtraso(db, a.cpf).length]; }).filter(function (x) { return x[1] > 0; });
      $("#inad").innerHTML = inad.length ? inad.map(function (x) {
        return "<li><span>" + esc(x[0].nome) + '</span><span class="chip bad">' + x[1] + (x[1] > 1 ? " parcelas" : " parcela") + " em atraso</span></li>";
      }).join("") : "<li>Nenhum aluno inadimplente.</li>";
    },
    treino: function () {
      var ex = [["Supino reto", 3, 12, "Carga moderada, controle na descida."], ["Remada curvada", 3, 12, "Costas retas."], ["Agachamento livre", 4, 10, "Joelhos alinhados aos pés."], ["Prancha", 3, "30 s", "Abdômen contraído."]];
      $("#exercicios").innerHTML = ex.map(function (e) {
        return '<div class="ex"><strong>' + e[0] + "</strong><span>" + e[1] + " séries × " + e[2] + " repetições</span><span>Observações: " + e[3] + "</span></div>";
      }).join("");
    },
    catraca: function () {
      var f = $("#form-catraca"), out = $("#gate-out");
      f.cpf.addEventListener("input", function () { f.cpf.value = maskCpf(f.cpf.value); });
      function log() {
        var db = load();
        $("#acessos").innerHTML = db.acessos.slice(-5).reverse().map(function (a) {
          return "<tr><td>" + esc(a.nome) + "</td><td>" + a.quando + "</td><td>" + (a.ok ? '<span class="chip ok">Liberado</span>' : '<span class="chip bad">Bloqueado</span>') + "</td></tr>";
        }).join("") || '<tr><td colspan="3">Nenhum acesso registrado.</td></tr>';
      }
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var db = load(), c = digits(f.cpf.value), a = db.alunos.filter(function (x) { return x.cpf === c; })[0];
        if (!a) { out.className = "pane bad"; out.innerHTML = "<strong>Não identificado</strong><p>Aluno não encontrado.</p>"; return; }
        var ok = a.ativo && emAtraso(db, c).length === 0;
        out.className = "pane " + (ok ? "ok" : "bad");
        out.innerHTML = ok ? "<span>Situação regular</span><strong>Acesso liberado</strong><p>Bem-vindo, " + esc(a.nome) + ".</p>"
          : "<span>Motivo do bloqueio</span><strong>Acesso bloqueado</strong><p>" + (a.ativo ? "Mensalidade vencida. Procure a recepção para regularizar." : "Matrícula inativa. Procure a recepção.") + "</p>";
        var now = new Date(); db.acessos.push({ nome: a.nome, ok: ok, quando: now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) });
        save(db); log();
      });
      log();
    }
  };
  var p = document.body.getAttribute("data-page");
  if (pages[p]) pages[p]();
  window.fitcontrolReset = function () { localStorage.removeItem(KEY); location.reload(); };
})();
