const API_URL = "http://localhost:3000/pensamentos";

const toast = document.getElementById("toast");
let toastTimer = null;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function iconSvg(pathD) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${pathD}" /></svg>`;
}

const icons = {
  edit:  "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm14.71-8.04 1.77-1.77a1 1 0 0 0 0-1.41l-2.51-2.51a1 1 0 0 0-1.41 0l-1.77 1.77 3.92 3.92Z",
  trash: "M6 7h12M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m-8 0 .7 12.2A1.8 1.8 0 0 0 9.5 21h5a1.8 1.8 0 0 0 1.8-1.8L17 7M10 11v6M14 11v6",
};

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  if (response.status === 204) return null;
  return response.json();
}

const deleteModal = document.getElementById("delete-modal");
const cancelDelete = document.getElementById("cancel-delete");
const confirmDelete = document.getElementById("confirm-delete");
let deleteId = null;

function openDeleteModal(id) {
  deleteId = id;
  deleteModal.classList.remove("modal--hidden");
  document.body.classList.add("modal-open");
}

function closeDeleteModal() {
  deleteId = null;
  deleteModal.classList.add("modal--hidden");
  document.body.classList.remove("modal-open");
}

cancelDelete.addEventListener("click", closeDeleteModal);
deleteModal.addEventListener("click", (e) => {
  if (e.target.dataset.close === "true") closeDeleteModal();
});

const formModal = document.getElementById("form-modal");
const formModalTitle = document.getElementById("form-modal-title");
const openFormBtn = document.getElementById("open-form-modal");
const closeFormBtn = document.getElementById("close-form-modal");
const cancelFormBtn = document.getElementById("cancel-form");

const thoughtForm = document.getElementById("thought-form");
const thoughtIdInput = document.getElementById("thought-id");
const contentInput = document.getElementById("thought-content");
const authorInput = document.getElementById("thought-author");
const submitBtn = document.getElementById("submit-form");

function openFormModal(mode = "create", data = null) {
  thoughtForm.reset();
  thoughtIdInput.value = "";
  submitBtn.disabled = false;

  if (mode === "edit" && data) {
    thoughtIdInput.value = data.id;
    contentInput.value = data.conteudo || "";
    authorInput.value = data.autoria || "";
    formModalTitle.textContent = "Editar pensamento:";
    submitBtn.textContent = "Salvar alterações";
  } else {
    formModalTitle.textContent = "Adicione um pensamento novo:";
    submitBtn.textContent = "Adicionar";
  }

  formModal.classList.remove("modal--hidden");
  document.body.classList.add("modal-open");
  setTimeout(() => contentInput.focus(), 60);
}

function closeFormModal() {
  formModal.classList.add("modal--hidden");
  document.body.classList.remove("modal-open");
}

openFormBtn.addEventListener("click", () => openFormModal("create"));
closeFormBtn.addEventListener("click", closeFormModal);
cancelFormBtn.addEventListener("click", closeFormModal);

formModal.addEventListener("click", (e) => {
  if (e.target.dataset.closeForm === "true") closeFormModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!formModal.classList.contains("modal--hidden")) closeFormModal();
  if (!deleteModal.classList.contains("modal--hidden")) closeDeleteModal();
});

contentInput.addEventListener("input", () => {
  contentInput.style.height = "auto";
  contentInput.style.height = `${Math.max(90, contentInput.scrollHeight)}px`;
});

thoughtForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const conteudo = contentInput.value.trim();
  const autoria = authorInput.value.trim();

  if (!conteudo || !autoria) {
    showToast("Preencha os dois campos.");
    return;
  }

  const isEdit = Boolean(thoughtIdInput.value);
  const payload = { conteudo, autoria };

  submitBtn.disabled = true;
  submitBtn.textContent = isEdit ? "Salvando..." : "Adicionando...";

  try {
    if (isEdit) {
      await requestJson(`${API_URL}/${thoughtIdInput.value}`, {
        method: "PUT",
        body: JSON.stringify({ id: thoughtIdInput.value, ...payload }),
      });
      showToast("Pensamento atualizado.");
    } else {
      await requestJson(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      showToast("Pensamento adicionado.");
    }

    closeFormModal();
    await loadThoughts();
  } catch (err) {
    console.error(err);
    showToast("Não foi possível salvar. Verifique se o JSON Server está rodando.");
    submitBtn.disabled = false;
    submitBtn.textContent = isEdit ? "Salvar alterações" : "Adicionar";
  }
});

const cardsEl = document.getElementById("cards");
const emptyState = document.getElementById("empty-state");
let thoughts = [];

function renderThoughts() {
  cardsEl.innerHTML = "";

  if (!thoughts.length) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  thoughts.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "card";
    li.style.animationDelay = `${index * 0.06}s`;
    li.innerHTML = `
      <div class="card__content">${escapeHTML(item.conteudo)}</div>
      <div class="card__footer">
        <div class="card__author">${escapeHTML(item.autoria)}</div>
        <div class="card__actions">
          <button class="icon-btn" type="button" data-action="edit" aria-label="Editar">${iconSvg(icons.edit)}</button>
          <button class="icon-btn" type="button" data-action="delete" aria-label="Excluir">${iconSvg(icons.trash)}</button>
        </div>
      </div>
    `;

    li.querySelector('[data-action="edit"]').addEventListener("click", () => {
      openFormModal("edit", item);
    });

    li.querySelector('[data-action="delete"]').addEventListener("click", () => {
      openDeleteModal(item.id);
    });

    cardsEl.appendChild(li);
  });
}

async function loadThoughts() {
  try {
    thoughts = await requestJson(API_URL);
    renderThoughts();
  } catch (err) {
    console.error(err);
    showToast("Não foi possível carregar o mural. Verifique se o JSON Server está rodando.");
  }
}

confirmDelete.addEventListener("click", async () => {
  if (!deleteId) return;
  try {
    await requestJson(`${API_URL}/${deleteId}`, { method: "DELETE" });
    closeDeleteModal();
    showToast("Pensamento excluído.");
    await loadThoughts();
  } catch (err) {
    console.error(err);
    showToast("Não foi possível excluir.");
  }
});

loadThoughts();
