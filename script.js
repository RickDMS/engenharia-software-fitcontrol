
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const STORAGE_KEY = 'reencontra_objects_v1';
const REQUESTS_KEY = 'reencontra_requests_v1';
const HISTORY_KEY = 'reencontra_history_v1';

const today = new Date();
const localDate = (date = today) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const daysAgo = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return localDate(d);
};
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const sampleObjects = [
  {
    id: 'demo-lost-1', type: 'perdido', name: 'Mochila esportiva',
    category: 'Mochila', color: 'Preta', brand: 'Nike',
    location: 'Biblioteca central', date: daysAgo(1),
    description: 'Mochila preta com compartimento frontal.',
    contact: '', status: 'Procurando', photo: '', createdAt: new Date().toISOString()
  },
  {
    id: 'demo-found-1', type: 'encontrado', name: 'Mochila preta',
    category: 'Mochila', color: 'Preta', brand: 'Nike',
    location: 'Biblioteca central', date: daysAgo(1),
    description: 'Mochila preta encontrada próxima à biblioteca.',
    contact: '', status: 'Encontrado', photo: '', createdAt: new Date().toISOString()
  },
  {
    id: 'demo-lost-2', type: 'perdido', name: 'Fone de ouvido',
    category: 'Eletrônicos', color: 'Branco', brand: 'Sony',
    location: 'Sala 12', date: daysAgo(2),
    description: 'Fone sem fio branco.',
    contact: '', status: 'Procurando', photo: '', createdAt: new Date().toISOString()
  },
  {
    id: 'demo-found-2', type: 'encontrado', name: 'Fone sem fio',
    category: 'Eletrônicos', color: 'Branco', brand: 'Sony',
    location: 'Sala 12', date: daysAgo(2),
    description: 'Estojo branco com fones sem fio.',
    contact: '', status: 'Encontrado', photo: '', createdAt: new Date().toISOString()
  },
  {
    id: 'demo-found-3', type: 'encontrado', name: 'Chave com chaveiro',
    category: 'Chaves', color: 'Prata', brand: '',
    location: 'Recepção', date: daysAgo(0),
    description: 'Chave encontrada no balcão.',
    contact: '', status: 'Encontrado', photo: '', createdAt: new Date().toISOString()
  }
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}
let objects = readStorage(STORAGE_KEY, null);
let requests = readStorage(REQUESTS_KEY, []);
let history = readStorage(HISTORY_KEY, []);
let currentPage = 'dashboard';
let lastMatches = [];
let photoData = '';
let toastTimer;

if (!Array.isArray(objects)) {
  objects = sampleObjects;
  saveObjects();
  addHistory('Sistema iniciado', 'Foram adicionados registros de demonstração.');
}

function saveObjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objects));
  } catch {
    notify('Armazenamento cheio. Tente cadastrar uma foto menor.', true);
  }
}
function saveRequests() {
  try { localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests)); }
  catch { notify('Não foi possível salvar as solicitações.', true); }
}
function saveHistory() {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 200))); }
  catch {}
}
function addHistory(action, detail) {
  history.unshift({ id: uid(), action, detail, date: new Date().toISOString() });
  history = history.slice(0, 200);
  saveHistory();
}
function notify(message, error = false) {
  const el = document.createElement('div');
  el.className = `toast${error ? ' error' : ''}`;
  el.textContent = message;
  $('#toastRegion').appendChild(el);
  clearTimeout(toastTimer);
  setTimeout(() => el.remove(), 3500);
}
function formatDate(value) {
  if (!value) return 'Não informada';
  const parts = value.slice(0, 10).split('-');
  if (parts.length !== 3) return value;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
function formatDateTime(value) {
  if (!value) return 'Data não disponível';
  return new Date(value).toLocaleString('pt-BR', {
    dateStyle: 'short', timeStyle: 'short'
  });
}
function statusClass(status) {
  return ({
    'Procurando': 'procurando',
    'Encontrado': 'encontrado',
    'Aguardando retirada': 'aguardando',
    'Devolvido': 'devolvido',
    'Pendente': 'pendente',
    'Aprovada': 'aprovada',
    'Recusada': 'recusada'
  })[status] || 'procurando';
}
function statusBadge(status) {
  return `<span class="status status-${statusClass(status)}">${escapeHTML(status)}</span>`;
}
function iconFor(item) {
  if (item.category === 'Mochila') return '🎒';
  if (item.category === 'Celular') return '📱';
  if (item.category === 'Documento') return '🪪';
  if (item.category === 'Chaves') return '🔑';
  if (item.category === 'Eletrônicos') return '🎧';
  if (item.category === 'Material escolar') return '📚';
  if (item.category === 'Roupa') return '👕';
  if (item.category === 'Acessórios') return '⌚';
  return '📦';
}
function thumb(item) {
  return `<div class="item-thumb">${item.photo
    ? `<img src="${escapeHTML(item.photo)}" alt="" loading="lazy">`
    : iconFor(item)}</div>`;
}
function itemCell(item) {
  return `<div class="item-cell">${thumb(item)}<div>
    <div class="item-name">${escapeHTML(item.name)}</div>
    <small>${escapeHTML(item.category)}${item.brand ? ' · ' + escapeHTML(item.brand) : ''}</small>
  </div></div>`;
}
function getItem(id) {
  return objects.find(item => item.id === id);
}
function getMatches() {
  const lost = objects.filter(o => o.type === 'perdido' && o.status !== 'Devolvido');
  const found = objects.filter(o => o.type === 'encontrado' && o.status !== 'Devolvido');
  const pairs = [];

  for (const a of lost) {
    for (const b of found) {
      const result = scoreMatch(a, b);
      if (result.score >= 35) {
        pairs.push({ lost: a, found: b, score: result.score, reasons: result.reasons });
      }
    }
  }
  return pairs.sort((a, b) => b.score - a.score);
}

// Algoritmo heurístico: serve para priorizar a análise humana,
// não para provar a propriedade do objeto.
function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function same(a, b) {
  const x = normalize(a);
  const y = normalize(b);
  return !!x && !!y && x === y;
}
function relatedText(a, b) {
  const x = normalize(a);
  const y = normalize(b);
  if (!x || !y) return false;
  if (x === y) return true;
  const words = s => new Set(s.split(' ').filter(w => w.length > 2));
  const wa = words(x), wb = words(y);
  let common = 0;
  for (const word of wa) if (wb.has(word)) common++;
  return common > 0 && common / Math.max(wa.size, wb.size) >= 0.5;
}
function scoreMatch(a, b) {
  let points = 0;
  const reasons = [];
  const add = (value, label) => { points += value; reasons.push(label); };

  if (same(a.category, b.category)) add(20, 'Categoria compatível');
  if (same(a.color, b.color)) add(20, 'Cor compatível');
  if (same(a.brand, b.brand)) add(15, 'Marca compatível');
  if (relatedText(a.location, b.location)) add(20, 'Local semelhante');

  if (a.date && b.date) {
    const diff = Math.abs(
      new Date(`${a.date}T12:00:00`).getTime() -
      new Date(`${b.date}T12:00:00`).getTime()
    ) / 86400000;
    if (diff <= 1) add(15, 'Datas próximas');
    else if (diff <= 3) add(10, 'Datas relativamente próximas');
    else if (diff <= 7) add(5, 'Datas na mesma semana');
  }

  const textA = `${a.name} ${a.description || ''}`;
  const textB = `${b.name} ${b.description || ''}`;
  if (relatedText(textA, textB)) add(10, 'Descrição semelhante');

  return { score: Math.min(100, points), reasons };
}

function renderDashboard() {
  lastMatches = getMatches();
  const active = objects.filter(o => o.status !== 'Devolvido');
  $('#totalStat').textContent = objects.length;
  $('#lostStat').textContent = objects.filter(o => o.type === 'perdido' && o.status === 'Procurando').length;
  $('#matchesStat').textContent = lastMatches.length;
  $('#returnedStat').textContent = objects.filter(o => o.status === 'Devolvido').length;
  $('#matchCount').textContent = lastMatches.length;
  $('#todayLabel').textContent = today.toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long'
  }).toUpperCase();

  const recent = [...objects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  $('#recentRows').innerHTML = recent.map(o => `
    <tr>
      <td>${itemCell(o)}</td>
      <td>${escapeHTML(o.location)}</td>
      <td>${formatDate(o.date)}</td>
      <td>${statusBadge(o.status)}</td>
    </tr>`).join('');
  $('#recentEmpty').classList.toggle('hidden', recent.length > 0);

  $('#dashboardMatches').innerHTML = lastMatches.slice(0, 3).map(m => `
    <div class="match-preview">
      <div class="match-preview-top">
        <strong>${escapeHTML(m.lost.name)} ↔ ${escapeHTML(m.found.name)}</strong>
        <span class="match-score">${m.score}%</span>
      </div>
      <div class="progress"><span style="width:${m.score}%"></span></div>
      <p>${escapeHTML(m.found.location)} · ${formatDate(m.found.date)}</p>
    </div>`).join('');
  $('#matchesEmpty').classList.toggle('hidden', lastMatches.length > 0);
}

function renderObjects() {
  const query = normalize($('#searchInput')?.value || '');
  const category = $('#categoryFilter')?.value || '';
  const status = $('#statusFilter')?.value || '';
  const pageFilter = currentPage === 'perdidos' ? 'perdido'
    : currentPage === 'encontrados' ? 'encontrado' : '';

  const list = [...objects].filter(o => {
    const searchable = normalize(`${o.name} ${o.category} ${o.color} ${o.brand} ${o.location} ${o.description}`);
    return (!query || searchable.includes(query))
      && (!category || o.category === category)
      && (!status || o.status === status)
      && (!pageFilter || o.type === pageFilter);
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const detailed = currentPage === 'objetos';
  const rows = list.map(o => `
    <tr>
      <td>${itemCell(o)}</td>
      ${detailed ? `<td>${o.type === 'perdido' ? 'Perdido' : 'Encontrado'}</td>` : ''}
      <td>${escapeHTML(o.location)}</td>
      <td>${formatDate(o.date)}</td>
      <td>${statusBadge(o.status)}</td>
      <td><div class="row-actions">
        <button class="mini-btn" data-detail="${escapeHTML(o.id)}">Ver</button>
        ${o.status !== 'Devolvido' ? `<button class="mini-btn" data-claim="${escapeHTML(o.id)}">Solicitar</button>` : ''}
        <button class="mini-btn" data-qr="${escapeHTML(o.id)}">QR</button>
      </div></td>
    </tr>`).join('');

  const target = detailed ? '#objectsRows' : pageFilter === 'perdido' ? '#lostRows' : '#foundRows';
  $(target).innerHTML = rows;
  const empty = detailed ? '#objectsEmpty' : pageFilter === 'perdido' ? '#lostEmpty' : '#foundEmpty';
  $(empty).classList.toggle('hidden', list.length > 0);
}

function renderMatches() {
  lastMatches = getMatches();
  $('#matchesList').innerHTML = lastMatches.map(m => `
    <article class="match-card">
      <div class="match-card-heading">
        <div><h2>Possível correspondência</h2><p>${escapeHTML(m.lost.name)} pode corresponder a ${escapeHTML(m.found.name)}</p></div>
        <div class="match-percentage">${m.score}%<div class="progress"><span style="width:${m.score}%"></span></div></div>
      </div>
      <div class="match-items">
        <div class="match-item"><div class="match-item-label">OBJETO PERDIDO</div>${itemCell(m.lost)}<p class="muted">Local: ${escapeHTML(m.lost.location)}</p><p class="muted">Data: ${formatDate(m.lost.date)}</p></div>
        <div class="match-item"><div class="match-item-label">OBJETO ENCONTRADO</div>${itemCell(m.found)}<p class="muted">Local: ${escapeHTML(m.found.location)}</p><p class="muted">Data: ${formatDate(m.found.date)}</p></div>
      </div>
      <div class="match-reasons">${m.reasons.map(r => `<span class="reason-chip">✓ ${escapeHTML(r)}</span>`).join('')}</div>
      <div class="match-card-actions">
        <button class="btn btn-outline" data-detail="${escapeHTML(m.found.id)}">Ver objeto encontrado</button>
        <button class="btn btn-primary" data-claim="${escapeHTML(m.found.id)}">Iniciar recuperação</button>
      </div>
    </article>`).join('');
  $('#allMatchesEmpty').classList.toggle('hidden', lastMatches.length > 0);
}

function renderRequests() {
  const sorted = [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  $('#requestsList').innerHTML = sorted.map(r => {
    const item = getItem(r.objectId);
    return `<article class="request-card">
      <div class="request-head"><div><h2>${escapeHTML(item?.name || 'Objeto removido')}</h2><p>Solicitante: <strong>${escapeHTML(r.name)}</strong> · ${escapeHTML(r.contact)}</p></div>${statusBadge(r.status)}</div>
      <p>Enviado em ${formatDateTime(r.createdAt)}</p>
      <p class="request-proof"><strong>Informações para validação:</strong><br>${escapeHTML(r.proof)}</p>
      ${r.status === 'Pendente' ? `<div class="request-actions"><button class="btn btn-outline" data-request-action="Recusada" data-request-id="${escapeHTML(r.id)}">Recusar</button><button class="btn btn-primary" data-request-action="Aprovada" data-request-id="${escapeHTML(r.id)}">Aprovar validação</button></div>` : ''}
      ${r.status === 'Aprovada' && item && item.status !== 'Devolvido' ? `<div class="request-actions"><button class="btn btn-primary" data-deliver="${escapeHTML(r.id)}">Registrar devolução</button></div>` : ''}
    </article>`;
  }).join('');
  $('#requestsEmpty').classList.toggle('hidden', sorted.length > 0);
}

function renderHistory() {
  $('#historyList').innerHTML = history.map(h => `
    <div class="history-entry"><span class="history-dot"></span><div><strong>${escapeHTML(h.action)}</strong><p>${escapeHTML(h.detail)}</p><p>${formatDateTime(h.date)}</p></div></div>
  `).join('');
  $('#historyEmpty').classList.toggle('hidden', history.length > 0);
}

function renderReports() {
  const count = status => objects.filter(o => o.status === status).length;
  $('#reportTotal').textContent = objects.length;
  $('#reportFound').textContent = objects.filter(o => o.type === 'encontrado').length;
  $('#reportReturned').textContent = count('Devolvido');
  $('#reportRequests').textContent = requests.length;

  const groups = [
    ['Procurando', count('Procurando')],
    ['Encontrados', count('Encontrado')],
    ['Aguardando retirada', count('Aguardando retirada')],
    ['Devolvidos', count('Devolvido')]
  ];
  const max = Math.max(1, ...groups.map(g => g[1]));
  $('#reportBars').innerHTML = groups.map(([label, value]) => `
    <div class="report-bar-row"><span>${label}</span><div class="report-track"><span style="width:${value / max * 100}%"></span></div><strong>${value}</strong></div>
  `).join('');
}

function renderAll() {
  renderDashboard();
  renderObjects();
  renderMatches();
  renderRequests();
  renderHistory();
  renderReports();
}

function navigate(page) {
  const valid = ['dashboard', 'objetos', 'perdidos', 'encontrados', 'correspondencias', 'solicitacoes', 'historico', 'relatorios'];
  if (!valid.includes(page)) return;
  currentPage = page;
  $$('.page').forEach(p => p.classList.toggle('active', p.id === `page-${page}`));
  $$('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  const activeButton = $(`.nav-link[data-page="${page}"]`);
  $('#breadcrumb').textContent = activeButton ? activeButton.textContent.trim().replace(/\s+/g, ' ') : 'Visão geral';
  $('#sidebar').classList.remove('open');
  renderAll();
}

function openModal(id) {
  $(`#${id}`).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  $(`#${id}`).classList.add('hidden');
  if (!$$('.modal-backdrop').some(m => !m.classList.contains('hidden'))) {
    document.body.style.overflow = '';
  }
}
function closeAllModals() {
  $$('.modal-backdrop').forEach(m => m.classList.add('hidden'));
  document.body.style.overflow = '';
}

function openObjectForm(type = 'perdido') {
  $('#objectForm').reset();
  photoData = '';
  $('#objectType').value = type;
  $('#objectDate').value = localDate();
  $('#modalTitle').textContent = type === 'perdido' ? 'Registrar objeto perdido' : 'Registrar objeto encontrado';
  openModal('objectModal');
}
function openClaim(id) {
  const item = getItem(id);
  if (!item) return notify('Objeto não encontrado.', true);
  if (item.status === 'Devolvido') return notify('Este objeto já foi devolvido.', true);
  $('#claimForm').reset();
  $('#claimObjectId').value = id;
  $('#claimTitle').textContent = `Recuperar: ${item.name}`;
  openModal('claimModal');
}

function openDetails(id, showQR = false) {
  const o = getItem(id);
  if (!o) return notify('Objeto não encontrado.', true);
  $('#detailTitle').textContent = o.name;
  $('#detailContent').innerHTML = `
    ${o.photo ? `<img class="detail-photo" src="${escapeHTML(o.photo)}" alt="Foto de ${escapeHTML(o.name)}">` : ''}
    <div class="detail-grid">
      <div class="detail-field"><small>CATEGORIA</small><strong>${escapeHTML(o.category)}</strong></div>
      <div class="detail-field"><small>TIPO</small><strong>${o.type === 'perdido' ? 'Objeto perdido' : 'Objeto encontrado'}</strong></div>
      <div class="detail-field"><small>COR</small><strong>${escapeHTML(o.color)}</strong></div>
      <div class="detail-field"><small>MARCA</small><strong>${escapeHTML(o.brand || 'Não informada')}</strong></div>
      <div class="detail-field"><small>LOCAL</small><strong>${escapeHTML(o.location)}</strong></div>
      <div class="detail-field"><small>DATA</small><strong>${formatDate(o.date)}</strong></div>
      <div class="detail-field"><small>STATUS</small>${statusBadge(o.status)}</div>
      <div class="detail-field"><small>CONTATO</small><strong>${escapeHTML(o.contact || 'Não informado')}</strong></div>
    </div>
    <h3>Características adicionais</h3>
    <p class="detail-description">${escapeHTML(o.description || 'Nenhuma característica adicional informada.')}</p>
    ${o.type === 'encontrado' && o.status !== 'Devolvido' ? `<div class="form-note">🔒 A propriedade precisa ser validada pelo responsável antes da entrega.</div>` : ''}
    <div class="modal-actions">
      <button class="btn btn-outline" data-close="detailModal">Fechar</button>
      ${o.status !== 'Devolvido' ? `<button class="btn btn-primary" data-claim="${escapeHTML(o.id)}">Solicitar recuperação</button>` : ''}
    </div>
    ${showQR ? `<div class="qr-box"><strong>Identificação do registro</strong><p class="muted">QR Code demonstrativo com o identificador deste objeto.</p><img alt="QR Code do registro" src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent('REENCONTRA:' + o.id)}"><p class="muted">ID: ${escapeHTML(o.id)}</p></div>` : ''}
  `;
  openModal('detailModal');
}

// Cadastro de objeto
$('#objectPhoto').addEventListener('change', event => {
  const file = event.target.files?.[0];
  photoData = '';
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    event.target.value = '';
    return notify('Selecione um arquivo de imagem válido.', true);
  }
  if (file.size > 1024 * 1024) {
    event.target.value = '';
    return notify('A imagem deve ter no máximo 1 MB.', true);
  }
  const reader = new FileReader();
  reader.onload = () => {
    photoData = reader.result;
  };
  reader.onerror = () => notify('Não foi possível ler a imagem.', true);
  reader.readAsDataURL(file);
});

$('#objectForm').addEventListener('submit', event => {
  event.preventDefault();
  const type = $('#objectType').value;
  const name = $('#objectName').value.trim();
  const category = $('#objectCategory').value;
  const color = $('#objectColor').value.trim();
  const location = $('#objectLocation').value.trim();
  const date = $('#objectDate').value;

  if (!name || !category || !color || !location || !date) {
    return notify('Preencha todos os campos obrigatórios.', true);
  }
  if (date > localDate()) {
    return notify('A data não pode estar no futuro.', true);
  }

  const item = {
    id: uid(), type, name, category, color,
    brand: $('#objectBrand').value.trim(),
    location, date,
    description: $('#objectDescription').value.trim(),
    contact: $('#objectContact').value.trim(),
    photo: photoData,
    status: type === 'perdido' ? 'Procurando' : 'Encontrado',
    createdAt: new Date().toISOString()
  };

  objects.unshift(item);
  saveObjects();
  addHistory('Objeto cadastrado', `${item.name} — ${item.status}.`);
  closeModal('objectModal');
  renderAll();
  notify('Objeto cadastrado com sucesso!');
  navigate(type === 'perdido' ? 'perdidos' : 'encontrados');
});

// Solicitação de recuperação
$('#claimForm').addEventListener('submit', event => {
  event.preventDefault();
  const objectId = $('#claimObjectId').value;
  const item = getItem(objectId);
  if (!item || item.status === 'Devolvido') {
    return notify('Este objeto não está disponível para solicitação.', true);
  }

  const request = {
    id: uid(),
    objectId,
    name: $('#claimName').value.trim(),
    contact: $('#claimContact').value.trim(),
    proof: $('#claimProof').value.trim(),
    status: 'Pendente',
    createdAt: new Date().toISOString()
  };
  if (!request.name || !request.contact || request.proof.length < 5) {
    return notify('Preencha os dados para análise.', true);
  }

  requests.unshift(request);
  saveRequests();
  addHistory('Solicitação recebida', `Pedido para recuperar ${item.name}.`);
  closeModal('claimModal');
  renderAll();
  notify('Solicitação enviada para análise.');
  navigate('solicitacoes');
});

document.addEventListener('click', event => {
  const pageButton = event.target.closest('[data-page]');
  if (pageButton) {
    event.preventDefault();
    navigate(pageButton.dataset.page);
    return;
  }

  const goto = event.target.closest('[data-goto]');
  if (goto) {
    navigate(goto.dataset.goto);
    return;
  }

  const openType = event.target.closest('[data-open-type]');
  if (openType) {
    openObjectForm(openType.dataset.openType);
    return;
  }

  const close = event.target.closest('[data-close]');
  if (close) {
    closeModal(close.dataset.close);
    return;
  }

  const detail = event.target.closest('[data-detail]');
  if (detail) {
    openDetails(detail.dataset.detail);
    return;
  }

  const claim = event.target.closest('[data-claim]');
  if (claim) {
    openClaim(claim.dataset.claim);
    return;
  }

  const qr = event.target.closest('[data-qr]');
  if (qr) {
    openDetails(qr.dataset.qr, true);
    return;
  }

  const action = event.target.closest('[data-request-action]');
  if (action) {
    const request = requests.find(r => r.id === action.dataset.requestId);
    if (!request || request.status !== 'Pendente') return;
    request.status = action.dataset.requestAction;
    saveRequests();
    addHistory(
      request.status === 'Aprovada' ? 'Validação aprovada' : 'Solicitação recusada',
      `Solicitação de ${request.name}.`
    );
    renderAll();
    notify(request.status === 'Aprovada'
      ? 'Validação aprovada. Registre a entrega após conferir a propriedade.'
      : 'Solicitação recusada.');
    return;
  }

  const deliver = event.target.closest('[data-deliver]');
  if (deliver) {
    const request = requests.find(r => r.id === deliver.dataset.deliver);
    const item = request && getItem(request.objectId);
    if (!request || !item || request.status !== 'Aprovada') return;
    if (!confirm(`Confirmar que "${item.name}" foi entregue a ${request.name}?`)) return;
    item.status = 'Devolvido';
    request.status = 'Concluída';
    saveObjects();
    saveRequests();
    addHistory('Objeto devolvido', `${item.name} entregue a ${request.name}.`);
    renderAll();
    notify('Devolução registrada.');
    return;
  }
});

$('#newObjectBtn').addEventListener('click', () => openObjectForm());
$('#newObjectBtn2').addEventListener('click', () => openObjectForm());
$('#searchInput').addEventListener('input', renderObjects);
$('#categoryFilter').addEventListener('change', renderObjects);
$('#statusFilter').addEventListener('change', renderObjects);
$('#recalculateBtn').addEventListener('click', () => {
  renderMatches();
  renderDashboard();
  notify('Correspondências recalculadas.');
});
$('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#notificationBtn').addEventListener('click', () => {
  const pending = requests.filter(r => r.status === 'Pendente').length;
  notify(pending ? `Você tem ${pending} solicitação(ões) pendente(s).` : 'Nenhuma solicitação pendente.');
});
$('#helpBtn').addEventListener('click', () => {
  alert('Como utilizar o Reencontra:\n\n1. Cadastre objetos perdidos ou encontrados.\n2. Confira as correspondências sugeridas.\n3. Analise as solicitações de recuperação.\n4. Verifique a propriedade presencialmente.\n5. Registre a devolução após a entrega.');
});
$$('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) closeModal(backdrop.id);
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeAllModals();
});

$('#exportBtn').addEventListener('click', () => {
  const headers = ['ID', 'Nome', 'Tipo', 'Categoria', 'Cor', 'Marca', 'Local', 'Data', 'Status'];
  const cell = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const lines = [
    headers.map(cell).join(';'),
    ...objects.map(o => [
      o.id, o.name, o.type, o.category, o.color, o.brand,
      o.location, o.date, o.status
    ].map(cell).join(';'))
  ];
  const blob = new Blob(['\uFEFF' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'relatorio-reencontra.csv';
  link.click();
  URL.revokeObjectURL(url);
  notify('Relatório exportado.');
});

renderAll();
navigate('dashboard');