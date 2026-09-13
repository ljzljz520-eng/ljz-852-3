/* 学术附件元数据检索 —— 前端逻辑（纯静态、无后端） */
(function () {
  "use strict";

  const TYPE_LABEL = {
    dataset: "数据集",
    supplement: "补充材料",
    code: "代码包",
  };
  // 受限/受控访问的判定关键字（仅用于界面提示，不改变任何访问行为）
  const RESTRICT_HINT = ["受限", "审批", "申请", "授权"];

  const app = document.getElementById("app");

  /* ---------- 工具 ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function isRestricted(item) {
    return RESTRICT_HINT.some((w) => item.access.includes(w));
  }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  }

  function highlight(text, keyword) {
    const safe = escapeHtml(text);
    if (!keyword) return safe;
    const kw = escapeHtml(keyword).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return safe.replace(new RegExp(`(${kw})`, "gi"), "<mark>$1</mark>");
  }

  // 检索范围：标题、摘要、作者、出处、来源说明、类型名
  function searchableText(item) {
    return [
      item.title, item.abstract, item.authors, item.venue,
      item.source, TYPE_LABEL[item.type], item.id,
    ].join(" \n ");
  }

  // 多关键词（空格分隔）打分：标题命中权重最高，全部关键词需命中
  function scoreItem(item, terms) {
    if (!terms.length) return 1;
    const hayAll = searchableText(item).toLowerCase();
    const title = item.title.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (!hayAll.includes(t)) return -1; // 任一关键词缺失即排除
      if (title.includes(t)) score += 5;
      else score += 1;
    }
    return score;
  }

  /* ---------- 文件树渲染 ---------- */
  function renderTree(nodes) {
    if (!nodes || !nodes.length) return "";
    const li = nodes.map((n) => {
      const isDir = n.children && n.children.length > 0;
      const icon = isDir ? "📁" : "📄";
      const cls = isDir ? " class=\"dir\"" : "";
      const note = n.note ? ` <span class="fnote">${escapeHtml(n.note)}</span>` : "";
      const sub = isDir ? renderTree(n.children) : "";
      return `<li${cls}><span class="fname"><span class="ico">${icon}</span>${escapeHtml(
        n.name
      )}</span>${note}${sub}</li>`;
    }).join("");
    return `<ul>${li}</ul>`;
  }

  /* ---------- 列表视图 ---------- */
  const state = { keyword: "", type: "all", sort: "updated" };

  function renderList() {
    const terms = state.keyword.trim().toLowerCase().split(/\s+/).filter(Boolean);

    let hits = ATTACHMENTS.map((item) => ({
      item, score: scoreItem(item, terms),
    })).filter((h) => h.score >= 0);

    if (state.type !== "all") {
      hits = hits.filter((h) => h.item.type === state.type);
    }

    if (state.sort === "updated") {
      hits.sort((a, b) => b.item.updatedAt.localeCompare(a.item.updatedAt));
    } else if (state.sort === "title") {
      hits.sort((a, b) => a.item.title.localeCompare(b.item.title, "zh-Hans-CN"));
    } else if (state.sort === "relevance") {
      hits.sort((a, b) => b.score - a.score ||
        b.item.updatedAt.localeCompare(a.item.updatedAt));
    }

    const counts = {
      all: ATTACHMENTS.length,
      dataset: ATTACHMENTS.filter((i) => i.type === "dataset").length,
      supplement: ATTACHMENTS.filter((i) => i.type === "supplement").length,
      code: ATTACHMENTS.filter((i) => i.type === "code").length,
    };

    const tabs = [
      ["all", "全部"], ["dataset", "数据集"],
      ["supplement", "补充材料"], ["code", "代码包"],
    ].map(([key, label]) => `
      <button class="tab ${state.type === key ? "active" : ""}" data-type="${key}">
        ${label}<span class="count">${counts[key]}</span>
      </button>`).join("");

    const kw = state.keyword.trim();
    const cards = hits.map(({ item }) => {
      const restricted = isRestricted(item);
      const snippet = item.abstract.length > 110
        ? item.abstract.slice(0, 110) + "…" : item.abstract;
      return `
      <article class="card">
        <div class="card-top">
          <span class="badge ${item.type}">${TYPE_LABEL[item.type]}</span>
          ${restricted ? '<span class="badge restricted">受控访问</span>' : ""}
          <span class="record-id">${escapeHtml(item.id)}</span>
        </div>
        <h3><a href="#/item/${encodeURIComponent(item.id)}">${highlight(item.title, kw)}</a></h3>
        <p class="snippet">${highlight(snippet, kw)}</p>
        <div class="card-fields">
          <div class="field"><span class="k">大小</span><span class="v">${escapeHtml(item.size)}</span></div>
          <div class="field"><span class="k">来源</span><span class="v">${escapeHtml(item.source)}</span></div>
          <div class="field"><span class="k">更新</span><span class="v">${formatDate(item.updatedAt)}</span></div>
        </div>
      </article>`;
    }).join("");

    app.innerHTML = `
      <section class="search-section">
        <div class="container">
          <div class="about">
            <strong>本页仅索引公开论文附件的<strong>描述性元数据</strong>：</strong>标题、类型、大小、来源说明、
            更新时间、摘要与文件结构清单。系统不存储文件实体，不提供下载，也不提供任何绕过授权或访问控制的途径；
            受控数据须按发布方流程申请。
          </div>
          <form class="search-box" id="searchForm" role="search">
            <input id="searchInput" type="search" autocomplete="off"
              placeholder="搜索数据集 / 补充材料 / 代码包（标题、摘要、作者、关键词，空格分隔）"
              value="${escapeHtml(state.keyword)}">
            <button class="btn" type="submit">检索</button>
            <button class="btn ghost" type="button" id="clearBtn">清空</button>
          </form>
          <div class="controls">
            <div class="filter-tabs" role="tablist">${tabs}</div>
            <div class="sort-line">
              排序：
              <select id="sortSelect">
                <option value="updated"${state.sort === "updated" ? " selected" : ""}>更新时间</option>
                <option value="relevance"${state.sort === "relevance" ? " selected" : ""}>相关度</option>
                <option value="title"${state.sort === "title" ? " selected" : ""}>标题</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <main class="container">
        <div class="result-meta">
          共检索到 ${hits.length} 条记录${kw ? `，关键词：${escapeHtml(kw)}` : ""}
        </div>
        <div class="result-list">
          ${cards || `
            <div class="empty-state">
              <div class="big">🔍</div>
              <div>没有匹配的附件元数据。可尝试更换关键词，或清除类型筛选。</div>
            </div>`}
        </div>
      </main>`;

    // 事件绑定
    const input = document.getElementById("searchInput");
    document.getElementById("searchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      state.keyword = input.value;
      state.sort = terms.length ? "relevance" : "updated";
      renderList();
    });
    document.getElementById("clearBtn").addEventListener("click", () => {
      state.keyword = "";
      state.type = "all";
      state.sort = "updated";
      renderList();
    });
    app.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        state.type = tab.dataset.type;
        renderList();
      });
    });
    document.getElementById("sortSelect").addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderList();
    });
    window.scrollTo(0, 0);
  }

  /* ---------- 详情视图：仅摘要 + 文件结构 ---------- */
  function renderDetail(idRaw) {
    const id = decodeURIComponent(idRaw);
    const item = ATTACHMENTS.find((x) => x.id === id);

    if (!item) {
      app.innerHTML = `
        <main class="container">
          <div class="crumbs"><a href="#/">← 返回检索</a></div>
          <div class="empty-state">
            <div class="big">∅</div>
            <div>未找到该元数据记录：${escapeHtml(id)}</div>
          </div>
        </main>`;
      window.scrollTo(0, 0);
      return;
    }

    const restricted = isRestricted(item);

    app.innerHTML = `
      <main class="container">
        <div class="crumbs"><a href="#/">学术附件检索</a> / 记录详情</div>

        <header class="detail-head">
          <div class="card-top" style="margin-bottom:4px;">
            <span class="badge ${item.type}">${TYPE_LABEL[item.type]}</span>
            ${restricted ? '<span class="badge restricted">受控访问</span>' : ""}
            <span class="record-id">${escapeHtml(item.id)}</span>
          </div>
          <h1>${escapeHtml(item.title)}</h1>
          <div class="detail-meta">
            <div class="k">类型</div><div class="v">${TYPE_LABEL[item.type]}</div>
            <div class="k">大小</div><div class="v">${escapeHtml(item.size)}</div>
            <div class="k">来源说明</div><div class="v">${escapeHtml(item.source)}</div>
            <div class="k">更新时间</div><div class="v">${formatDate(item.updatedAt)}</div>
            <div class="k">关联论文</div><div class="v">${escapeHtml(item.authors)}，<em>${escapeHtml(item.venue)}</em></div>
          </div>
        </header>

        <section class="section">
          <h2>摘要</h2>
          <p>${escapeHtml(item.abstract)}</p>
        </section>

        <section class="section">
          <h2>文件结构（发布方公布的清单）</h2>
          <div class="file-tree">${renderTree(item.files)}</div>
        </section>

        <p class="back-link"><a href="#/">← 返回检索列表</a></p>
      </main>`;
    window.scrollTo(0, 0);
  }

  /* ---------- 哈希路由 ---------- */
  function route() {
    const hash = location.hash || "#/";
    const m = hash.match(/^#\/item\/(.+)$/);
    if (m) renderDetail(m[1]);
    else renderList();
  }
  window.addEventListener("hashchange", route);
  route();
})();
