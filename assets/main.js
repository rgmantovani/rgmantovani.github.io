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

  // Tab bar: entries are {key, label (string or node), count}; entries
  // without a count are disabled. Calls onSelect(key) on click.
  function tabBar(entries, active, onSelect) {
    var bar = el("div", "tabs");
    bar.setAttribute("role", "tablist");
    entries.forEach(function (t) {
      var b = bar.appendChild(el("button", "tab"));
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", String(t.key === active));
      b.disabled = !t.count;
      b.appendChild(typeof t.label === "string" ? el("span", null, t.label) : t.label);
      if (t.count) b.appendChild(el("span", "tab-count", String(t.count)));
      b.addEventListener("click", function () { onSelect(t.key); });
    });
    return bar;
  }
  function scrollToActive(bar) {
    var active = bar.querySelector('[aria-selected="true"]');
    if (active) bar.scrollLeft = active.offsetLeft - bar.offsetLeft - 16;
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

    var tabs = all.appendChild(tabBar(years.map(function (y) {
      return { key: y, label: String(y), count: counts[y] };
    }), year, function (y) { year = y; renderAll(); }));

    if (!shown.length) {
      all.appendChild(el("p", "muted")).appendChild(bilingual("Nenhuma publicação encontrada.", "No publications found."));
      return;
    }
    var list = all.appendChild(el("ol", "pubs tab-panel"));
    list.setAttribute("role", "tabpanel");
    shown.filter(function (p) { return p.y === year; }).forEach(function (p) {
      list.appendChild(renderPub(p));
    });
    scrollToActive(tabs);
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

  // Supervisions, one tab per type
  var sups = window.SUPERVISIONS || [];
  var SUP_TYPES = [
    { key: "ic", pt: "Iniciação científica", en: "Undergrad research" },
    { key: "tcc", pt: "TCC", en: "BSc theses" },
    { key: "esp", pt: "Especialização", en: "Specialization" },
    { key: "pg", pt: "Coorientação (pós-graduação)", en: "Graduate co-supervision" }
  ];
  var COURSES = {
    ec: ["Engenharia de Computação", "Computer Engineering"],
    cc: ["Ciência da Computação", "Computer Science"],
    es: ["Engenharia de Software", "Software Engineering"],
    si: ["Sistemas de Informação", "Information Systems"],
    phd: ["Doutorado em Ciência da Computação", "PhD in Computer Science"],
    msc: ["Mestrado em Ciência da Computação", "MSc in Computer Science"]
  };
  var supBox = document.getElementById("supervisions");
  var supType = "ic";

  function renderSup(s) {
    var li = el("li", "pub");
    li.appendChild(el("div", "pub-title", s.name));
    li.appendChild(el("div", "pub-authors", s.title));
    var meta = li.appendChild(el("div", "pub-meta"));
    if (s.type === "ic") {
      meta.appendChild(bilingual("Engenharia de Computação", "Computer Engineering"));
      meta.appendChild(document.createTextNode(" · UTFPR"));
    } else if (s.type === "esp") {
      meta.appendChild(bilingual("Especialização em Ciência de Dados", "Data Science specialization"));
      meta.appendChild(document.createTextNode(" · UTFPR"));
    } else {
      meta.appendChild(bilingual(COURSES[s.course][0], COURSES[s.course][1]));
      meta.appendChild(document.createTextNode(" · " + s.inst));
    }
    meta.appendChild(document.createTextNode(" · " + s.y));
    if (s.fund) meta.appendChild(el("span", "tag tag-c", s.fund));
    return li;
  }

  function renderSups() {
    supBox.textContent = "";
    var tabs = supBox.appendChild(tabBar(SUP_TYPES.map(function (t) {
      var n = sups.filter(function (s) { return s.type === t.key; }).length;
      return { key: t.key, label: bilingual(t.pt, t.en), count: n };
    }), supType, function (k) { supType = k; renderSups(); }));
    var list = supBox.appendChild(el("ol", "pubs tab-panel"));
    list.setAttribute("role", "tabpanel");
    sups.filter(function (s) { return s.type === supType; }).forEach(function (s) {
      list.appendChild(renderSup(s));
    });
    scrollToActive(tabs);
  }
  if (supBox) renderSups();
})();
