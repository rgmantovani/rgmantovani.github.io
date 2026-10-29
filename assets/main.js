(function () {
  "use strict";

  // Language: saved choice, else browser language, else Portuguese.
  var root = document.documentElement;
  function setLang(lang) {
    root.lang = lang;
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved || (/^pt/i.test(navigator.language || "") ? "pt-BR" : "en"));
  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.setLang); });
  });

  // Publications
  var pubs = window.PUBLICATIONS || [];
  var TYPE = {
    j: ["Periódico", "Journal"],
    c: ["Conferência", "Conference"],
    p: ["Preprint", "Preprint"]
  };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function bilingual(pt, en) {
    var f = document.createDocumentFragment();
    var a = el("span", null, pt); a.lang = "pt";
    var b = el("span", null, en); b.lang = "en";
    f.appendChild(a); f.appendChild(b);
    return f;
  }

  function renderPub(p) {
    var li = el("li", "pub");
    var title = el("div", "pub-title");
    if (p.doi) {
      var a = el("a", null, p.title);
      a.href = "https://doi.org/" + p.doi;
      title.appendChild(a);
    } else {
      title.textContent = p.title;
    }
    li.appendChild(title);

    var authors = el("div", "pub-authors");
    p.authors.split("R. G. Mantovani").forEach(function (part, i) {
      if (i > 0) authors.appendChild(el("b", null, "R. G. Mantovani"));
      authors.appendChild(document.createTextNode(part));
    });
    li.appendChild(authors);

    var meta = el("div", "pub-meta");
    meta.appendChild(el("span", "tag tag-" + p.type)).appendChild(bilingual(TYPE[p.type][0], TYPE[p.type][1]));
    if (p.award) meta.appendChild(el("span", "tag tag-award")).appendChild(bilingual("Melhor artigo", "Best paper"));
    meta.appendChild(document.createTextNode((p.venue ? p.venue + ", " : "") + p.y));
    li.appendChild(meta);
    return li;
  }

  var selected = document.getElementById("pubs-selected");
  pubs.filter(function (p) { return p.sel; }).forEach(function (p) {
    selected.appendChild(renderPub(p));
  });

  var all = document.getElementById("pubs-all");
  var search = document.getElementById("pub-search");
  var filter = "all";
  var years = pubs.map(function (p) { return p.y; })
    .filter(function (y, i, a) { return a.indexOf(y) === i; })
    .sort(function (a, b) { return b - a; });
  var year = years[0];

  function normalize(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function renderAll() {
    var q = normalize(search.value.trim());
    var shown = pubs.filter(function (p) {
      if (filter !== "all" && p.type !== filter) return false;
      return !q || normalize(p.title + " " + p.authors + " " + (p.venue || "") + " " + p.y).indexOf(q) >= 0;
    });
    all.textContent = "";

    // Year tabs: every year is listed; years with no match under the
    // current filter/search are disabled. One year is shown at a time.
    var counts = {};
    shown.forEach(function (p) { counts[p.y] = (counts[p.y] || 0) + 1; });
    if (!counts[year]) year = shown.length ? shown[0].y : null;

    var tabs = all.appendChild(el("div", "year-tabs"));
    tabs.setAttribute("role", "tablist");
    years.forEach(function (y) {
      var b = tabs.appendChild(el("button", "year-tab"));
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", String(y === year));
      b.disabled = !counts[y];
      b.appendChild(el("span", null, String(y)));
      if (counts[y]) b.appendChild(el("span", "year-count", String(counts[y])));
      b.addEventListener("click", function () { year = y; renderAll(); });
    });

    if (!shown.length) {
      all.appendChild(el("p", "muted")).appendChild(bilingual("Nenhuma publicação encontrada.", "No publications found."));
      return;
    }
    var list = all.appendChild(el("ol", "pubs year-panel"));
    list.setAttribute("role", "tabpanel");
    shown.filter(function (p) { return p.y === year; }).forEach(function (p) {
      list.appendChild(renderPub(p));
    });
    var active = tabs.querySelector('[aria-selected="true"]');
    if (active) tabs.scrollLeft = active.offsetLeft - tabs.offsetLeft - 16;
  }

  document.querySelectorAll("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () {
      filter = b.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(function (o) {
        o.setAttribute("aria-pressed", String(o === b));
      });
      renderAll();
    });
  });
  search.addEventListener("input", renderAll);
  renderAll();
})();
