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
    if (!shown.length) {
      all.appendChild(el("p", "muted")).appendChild(bilingual("Nenhuma publicação encontrada.", "No publications found."));
      return;
    }
    var year = null, list = null;
    shown.forEach(function (p) {
      if (p.y !== year) {
        year = p.y;
        all.appendChild(el("h4", "pub-year", String(year)));
        list = all.appendChild(el("ol", "pubs"));
      }
      list.appendChild(renderPub(p));
    });
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
