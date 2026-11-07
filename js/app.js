/* Zeeshan portfolio - page rendering. Plain JS, no dependencies. Content comes from data.js. */
(function () {
  'use strict';
  var S = window.SITE, MEDIA = window.MEDIA || {};
  var page = document.body.dataset.page;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function icon(name, cls) { return '<svg class="ico ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"/></svg>'; }
  function cat(id) { return S.categories.filter(function (c) { return c.id === id; })[0]; }
  function ind(id) { return S.industries.filter(function (c) { return c.id === id; })[0]; }
  function projectUrl(p) { return 'projects/' + encodeURIComponent(p.slug) + '/'; }
  function filterUrl(type, id) { return 'projects/?' + type + '=' + encodeURIComponent(id); }
  // Responsive image: srcset lists the smaller copies made by tools/prepare-assets.js so the browser downloads the lightest
  // one that fits. sizes = how wide the image is shown; eager = above the fold (loads first, high priority).
  function imgTag(src, alt, extra, sizes, eager) {
    var m = MEDIA['img/' + src] || {};
    var dims = m.w ? ' width="' + m.w + '" height="' + m.h + '"' : '';
    var srcset = '';
    if (m.v && m.v.length) {
      var base = src.replace(/.webp$/, '');
      srcset = ' srcset="' + m.v.map(function (w) { return 'assets/img/' + base + '-' + w + '.webp ' + w + 'w'; }).join(', ') + ', assets/img/' + src + ' ' + m.w + 'w" sizes="' + (sizes || '100vw') + '"';
    }
    return '<img src="assets/img/' + src + '" alt="' + esc(alt || '') + '"' + dims + srcset + (eager ? ' fetchpriority="high" loading="eager"' : ' loading="lazy"') + ' decoding="async"' + (extra || '') + '>';
  }
  function projectsInCategory(id) { return S.projects.filter(function (p) { return p.categories.indexOf(id) > -1; }); }
  function projectsInIndustry(id) { return S.projects.filter(function (p) { return p.industries.indexOf(id) > -1; }); }

  /* ---------- shared chrome ---------- */
  function renderChrome() {
    // the pre-built HTML already contains the header and footer; replace them instead of duplicating
    Array.prototype.forEach.call(document.querySelectorAll('.checker-bg, .skip, .site-header, .site-footer'), function (el) { el.parentNode.removeChild(el); });
    var navItems = [['./', 'Home', 'home'], ['projects/', 'Projects', 'projects'], ['about/', 'About Me', 'about'], ['contact/', 'Contact', 'contact']];
    var activePage = page === 'project' ? 'projects' : page;
    var nav = navItems.map(function (n) { return '<a href="' + n[0] + '"' + (n[2] === activePage ? ' aria-current="page"' : '') + '>' + n[1] + '</a>'; }).join('');
    // Placeholder logo (replace with the real one)
    var logo = '<a class="logo" href="./" aria-label="' + esc(S.fullName) + ' - home">' + icon('spade') + '<span class="logo__text">' + esc(S.name.toUpperCase()) + '<small>Designer</small></span></a>';

    var header = '<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="wrap">' + logo + '<nav class="nav" aria-label="Main">' + nav + '</nav></div></header>';
    document.body.insertAdjacentHTML('afterbegin', '<div class="checker-bg" aria-hidden="true"></div>' + header);

    var socials = S.social.map(function (s) {
      return '<a href="' + esc(s.href) + '" target="_blank" rel="noopener"' + (s.href === '#' ? ' title="Link coming soon"' : '') + '>' + icon(s.id) + '<span>' + s.label + '</span></a>';
    }).join('');
    var footer = '<footer class="site-footer"><div class="checker-strip" aria-hidden="true"></div><div class="wrap"><div class="footer__grid">' +
      '<div class="footer__brand">' + logo.replace('class="logo"', 'class="logo"') + '<p>Multi-disciplinary designer based in ' + esc(S.location) + '.</p></div>' +
      '<div><h2>Pages</h2><nav class="footer__links" aria-label="Footer">' + nav.replace(/ aria-current="page"/g, '') + '</nav></div>' +
      '<div><h2>Elsewhere</h2><div class="socials">' + socials + '</div></div>' +
      '</div><div class="footer__bar"><span>&copy; 2026 ' + esc(S.fullName) + '. All rights reserved.</span><span class="footer__links2"><button type="button" class="motion-toggle" id="motionToggle" aria-pressed="false">Pause animations</button><a href="privacy/">Privacy Policy</a></span></div></div></footer>';
    var mainForFooter = $('main'); // directly after <main> (before any scripts) so the pre-built footer is already in the page when this runs
    if (mainForFooter) mainForFooter.insertAdjacentHTML('afterend', footer); else document.body.insertAdjacentHTML('beforeend', footer);
    var mainEl = $('main'); if (mainEl) mainEl.id = 'main';
  }

  /* ---------- cards ---------- */
  function cardHTML(p, eager) {
    var tags = p.categories.map(function (c) { return '<a class="chip chip--cat" data-filter rel="nofollow" href="' + filterUrl('category', c) + '">' + esc(cat(c).name) + '</a>'; }).join('') +
      p.industries.map(function (i) { return '<a class="chip chip--ind" data-filter rel="nofollow" href="' + filterUrl('industry', i) + '">' + esc(ind(i).name) + '</a>'; }).join('');
    return '<article class="card"><a class="card__img" href="' + projectUrl(p) + '" tabindex="-1" aria-hidden="true">' +
      '<img src="assets/img/thumbs/' + p.slug + '.webp" srcset="assets/img/thumbs/' + p.slug + '-450.webp 450w, assets/img/thumbs/' + p.slug + '.webp 900w" sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 400px" alt="" width="900" height="675" loading="' + (eager ? 'eager' : 'lazy') + '" decoding="async"></a>' +
      '<div class="card__tags">' + tags + '</div>' +
      '<div class="card__body"><h3 class="card__title"><a href="' + projectUrl(p) + '">' + esc(p.title) + '</a></h3><p class="card__client">' + esc(p.client) + '</p></div></article>';
  }

  /* ---------- HOME ---------- */
  function renderHome() {
    var h = S.hero;
    var hero = '<section class="hero" aria-label="Introduction">' +
      '<video class="hero__video" id="heroVideo" autoplay muted loop playsinline preload="auto" poster="assets/' + h.poster + '"><source src="assets/' + h.video + '" type="video/mp4"></video>' +
      '<div class="hero__inner"><h1 class="sr-only">Zeeshan Abid, multi-disciplinary designer in Toronto</h1><p class="hero__sub">' + esc(h.sub) + '</p>' +
      '<div class="hero__actions"><a class="btn btn--fill" href="projects/">View Projects</a><a class="btn btn--outline" href="about/">About Me</a></div></div>' +
      '<button class="hero__toggle" id="heroToggle" type="button" aria-label="Pause background video"><svg viewBox="0 0 16 16" aria-hidden="true"><path id="heroToggleIcon" d="M3 2h4v12H3zM9 2h4v12H9z"/></svg></button>' +
      '<div class="checker-strip" aria-hidden="true"></div></section>';

    var group = S.clients.map(function (c) { return '<li class="ticker__item"><span>' + esc(c) + '</span>' + icon('star') + '</li>'; }).join('');
    var ticker = '<section class="ticker" aria-label="Clients"><p class="ticker__label">Brands I\'ve worked with</p><div class="ticker__viewport"><div class="ticker__track">' +
      '<ul class="ticker__group">' + group + '</ul><ul class="ticker__group" aria-hidden="true">' + group + '</ul></div></div></section>';

    // A few of the best projects (SITE.featured); the full list lives on the Projects page.
    var featured = S.featured.map(function (slug) { return S.projects.filter(function (p) { return p.slug === slug; })[0]; }).filter(Boolean);
    var browse = S.categories.filter(function (c) { return projectsInCategory(c.id).length; }).map(function (c) {
      return '<a class="catlink" href="' + filterUrl('category', c.id) + '">' + icon(c.icon) + '<span>' + esc(c.name) + '</span></a>';
    }).join('');
    var featuredHTML = '<section class="cat" aria-labelledby="h-featured"><div class="cat__head">' + icon('star') + '<h2 id="h-featured">Featured Work</h2></div>' +
      '<div class="grid grid--3">' + featured.map(function (p) { return cardHTML(p, false); }).join('') + '</div>' +
      '<div class="browse"><p class="browse__label">Browse by category</p><div class="browse__list">' + browse + '</div>' +
      '<a class="btn btn--fill" href="projects/">View all projects</a></div></section>';

    $('main').innerHTML = hero + ticker + '<div class="wrap home-cats">' + featuredHTML + '</div>';

    // video play/pause control (WCAG 2.2.2) + respect reduced motion
    var v = $('#heroVideo'), t = $('#heroToggle'), ic = $('#heroToggleIcon');
    var PLAY = 'M4 2l10 6-10 6z', PAUSE = 'M3 2h4v12H3zM9 2h4v12H9z';
    function sync() { var paused = v.paused; ic.setAttribute('d', paused ? PLAY : PAUSE); t.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video'); }
    t.addEventListener('click', function () { if (v.paused) v.play(); else v.pause(); sync(); });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); }
    v.addEventListener('pause', sync); v.addEventListener('play', sync); sync();
  }

  /* ---------- PROJECTS ---------- */
  function renderProjects() {
    var state = readState();
    function readState() {
      var q = new URLSearchParams(location.search);
      return { category: q.get('category') || '', industry: q.get('industry') || '', sort: q.get('sort') || 'default' };
    }
    function link(label, count, params, current) {
      var q = []; Object.keys(params).forEach(function (k) { if (params[k]) q.push(k + '=' + encodeURIComponent(params[k])); });
      return '<a data-filter rel="nofollow" href="projects/' + (q.length ? '?' + q.join('&') : '') + '"' + (current ? ' aria-current="true"' : '') + (count === 0 ? ' class="is-empty"' : '') + '><span>' + esc(label) + '</span><span class="n">' + count + '</span></a>';
    }
    function filtered() {
      var list = S.projects.slice();
      if (state.category) list = list.filter(function (p) { return p.categories.indexOf(state.category) > -1; });
      if (state.industry) list = list.filter(function (p) { return p.industries.indexOf(state.industry) > -1; });
      if (state.sort === 'az') list.sort(function (a, b) { return a.title.localeCompare(b.title); });
      if (state.sort === 'za') list.sort(function (a, b) { return b.title.localeCompare(a.title); });
      return list;
    }
    function render() {
      var list = filtered();
      var all = !state.category && !state.industry;
      var side = '<h2>Projects</h2><div class="list">' + link('All projects', S.projects.length, {}, all) + '</div>' +
        '<h2>Categories</h2><div class="list">' + S.categories.map(function (c) { return link(c.name, projectsInCategory(c.id).length, { category: c.id }, state.category === c.id); }).join('') + '</div>' +
        '<h2>Industries</h2><div class="list">' + S.industries.map(function (i) { return link(i.name, projectsInIndustry(i.id).length, { industry: i.id }, state.industry === i.id); }).join('') + '</div>';
      var label = all ? 'All projects' : (state.category ? cat(state.category) : ind(state.industry));
      label = typeof label === 'string' ? label : (label ? label.name : 'All projects');
      var grid = list.length ? '<div class="grid">' + list.map(function (p, i) { return cardHTML(p, i < 3); }).join('') + '</div>' :
        '<div class="empty">' + icon('heart-o') + '<h3>Coming soon</h3><p>No projects in &ldquo;' + esc(label) + '&rdquo; yet. <a data-filter href="projects/" style="color:var(--violet-light)">See all projects</a></p></div>';
      $('#side').innerHTML = side;
      $('#filtersLabel').textContent = label;
      $('#results').innerHTML = '<div class="results__bar"><p class="results__count" aria-live="polite"><b>' + list.length + '</b> ' + (list.length === 1 ? 'project' : 'projects') + (all ? '' : ' in <b>' + esc(label) + '</b>') + '</p>' +
        '<label class="sort">Sort by <select id="sort"><option value="default">Featured</option><option value="az">Name: A &rarr; Z</option><option value="za">Name: Z &rarr; A</option></select></label></div>' + grid;
      $('#sort').value = state.sort;
    }
    $('main').innerHTML = '<div class="wrap"><div class="page-head"><p class="eyebrow">The work</p><h1>Projects</h1></div>' +
      '<div class="projects-layout"><button type="button" class="filters-toggle" id="filtersToggle" aria-expanded="false" aria-controls="side"><span>Filter</span><b id="filtersLabel">All projects</b></button><aside class="filters" id="side" aria-label="Filter projects"></aside><div id="results"></div></div></div>';
    render();

    // On phones the filter list is hidden behind a "Filter" button
    var toggle = $('#filtersToggle'), panel = $('#side');
    function setFilters(open) { panel.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); }
    toggle.addEventListener('click', function () { setFilters(!panel.classList.contains('is-open')); });

    function push() {
      var q = []; if (state.category) q.push('category=' + state.category); if (state.industry) q.push('industry=' + state.industry); if (state.sort !== 'default') q.push('sort=' + state.sort);
      history.pushState(null, '', 'projects/' + (q.length ? '?' + q.join('&') : ''));
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-filter]'); if (!a) return;
      e.preventDefault();
      var u = new URL(a.href);
      state.category = u.searchParams.get('category') || ''; state.industry = u.searchParams.get('industry') || '';
      push(); render(); setFilters(false);
      window.scrollTo({ top: toggle.offsetParent && getComputedStyle(toggle).display !== 'none' ? $('.projects-layout').offsetTop - 12 : 0, behavior: 'smooth' });
    });
    document.addEventListener('change', function (e) { if (e.target.id === 'sort') { state.sort = e.target.value; push(); render(); $('#sort').focus(); } });
    window.addEventListener('popstate', function () { state = readState(); render(); });
  }

  /* ---------- PROJECT ---------- */
  function mediaItem(m, sizes, eager) {
    if (m.t === 'img') return '<figure class="media media--zoom">' + imgTag(m.src, m.alt, ' data-zoom data-full="assets/img/' + m.src + '" tabindex="0" role="button" aria-label="Enlarge image: ' + esc(m.alt) + '"', sizes, eager) + (m.caption ? '<figcaption class="media__cap">' + esc(m.caption) + '</figcaption>' : '') + '</figure>';
    if (m.t === 'scroll') return '<figure class="media"><div class="scrollframe" tabindex="0" role="region" aria-label="' + esc(m.alt) + ' (scrollable)">' + imgTag(m.src, m.alt, '', sizes) + '</div><div class="scrollhint">' + icon('bolt-o') + ' Scroll to explore</div></figure>';
    if (m.t === 'vimeo') return '<figure class="media"><div class="ratio"><iframe src="https://player.vimeo.com/video/' + m.id + '?dnt=1" title="' + esc(m.title) + '" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>' + (m.title ? '<figcaption class="vcap">' + esc(m.title) + '</figcaption>' : '') + '</figure>';
    if (m.t === 'video') {
      var dim = MEDIA['video/' + m.src.replace('video/', '')] || {}; var cls = 'ratio';
      if (dim.w && dim.h && dim.h > dim.w * 1.1) cls += ' ratio--portrait'; else if (dim.w && dim.h && Math.abs(dim.w - dim.h) < 4) cls += ' ratio--square';
      return '<figure class="media"><div class="' + cls + '"><video controls playsinline preload="none" poster="assets/' + m.poster + '"><source src="assets/' + m.src + '" type="video/mp4"></video></div>' + (m.title ? '<figcaption class="vcap">' + esc(m.title) + '</figcaption>' : '') + '</figure>';
    }
    return '';
  }

  // how wide each gallery layout shows its images (used for the srcset "sizes" hint)
  var BLOCK_SIZES = {
    single: '(max-width: 1280px) 100vw, 1240px', grid2: '(max-width: 960px) 50vw, 610px',
    grid3: '(max-width: 960px) 50vw, 400px', masonry: '(max-width: 960px) 50vw, 400px', scroll: '(max-width: 960px) 100vw, 400px', videos: '400px'
  };

  function renderProject() {
    var slug = document.body.dataset.slug || new URLSearchParams(location.search).get('p');
    var idx = -1; S.projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0) {
      document.title = 'Project not found - ' + S.fullName;
      $('main').innerHTML = '<div class="wrap"><div class="page-head"><h1>Project not found</h1><p><a href="projects/" style="color:var(--violet-light)">Back to all projects</a></p></div></div>';
      return;
    }
    var p = S.projects[idx];
    if (!document.body.dataset.prerendered) { // the build writes the real title/description; only set them when previewing an un-built page
      document.title = p.title + ' - ' + S.fullName;
      var desc = $('meta[name="description"]'); if (desc) desc.setAttribute('content', p.summary);
    }

    var catChips = p.categories.map(function (c) { return '<a class="chip chip--cat" href="' + filterUrl('category', c) + '">' + esc(cat(c).name) + '</a>'; }).join('');
    var indChips = p.industries.map(function (i) { return '<a class="chip chip--ind" href="' + filterUrl('industry', i) + '">' + esc(ind(i).name) + '</a>'; }).join('');
    var head = '<div class="wrap"><div class="p-head"><a class="back" href="projects/">' + icon('bolt-o') + ' All projects</a><h1>' + esc(p.title) + '</h1>' +
      '<dl class="meta"><div><dt>Client</dt><dd>' + esc(p.client) + '</dd></div><div><dt>Industry</dt><dd class="chips">' + indChips + '</dd></div><div><dt>Design category</dt><dd class="chips">' + catChips + '</dd></div></dl>' +
      '<p class="lede">' + esc(p.summary) + '</p>' + (p.placeholder ? '<p class="notice">' + icon('star-o') + ' Full write-up coming soon</p>' : '') + '</div></div>';

    var lead = '<div class="wrap lead-media">' + mediaItem(p.lead, '(max-width: 1280px) 100vw, 1240px', true) + '</div>';

    var flip = false;
    var body = p.blocks.map(function (b) {
      if (b.type === 'section') {
        var text = '<div class="sec__text"><h2 class="sec__title"><span class="badge">' + icon(b.icon || 'star') + '</span><span>' + esc(b.title) + '</span></h2>' +
          (b.paras || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          (b.stats ? '<div class="stats">' + b.stats.map(function (s) { return '<div class="stat"><b>' + esc(s.n) + '</b><span>' + esc(s.l) + '</span></div>'; }).join('') + '</div>' : '') +
          (b.bullets && !b.stats ? '<ul class="sec__list">' + b.bullets.map(function (t) { return '<li>' + icon('star') + '<span>' + esc(t) + '</span></li>'; }).join('') + '</ul>' : '') + '</div>';
        if (b.media && b.media.length) {
          var html = '<section class="sec' + (flip ? ' sec--flip' : '') + '">' + text + '<div class="sec__media">' + b.media.map(function (m) { return mediaItem(m, '(max-width: 960px) 100vw, 660px'); }).join('') + '</div></section>';
          flip = !flip; return html;
        }
        return '<section class="sec sec--solo">' + text + '</section>';
      }
      if (b.type === 'media') {
        return '<section class="mb"><div class="mb__head"><h2>' + esc(b.heading) + '</h2>' + (b.note ? '<p>' + esc(b.note) + '</p>' : '') + '</div><div class="mb__grid mb__grid--' + b.layout + '">' + b.items.map(function (m) { return mediaItem(m, BLOCK_SIZES[b.layout]); }).join('') + '</div></section>';
      }
      return '';
    }).join('');

    var prev = S.projects[(idx - 1 + S.projects.length) % S.projects.length], next = S.projects[(idx + 1) % S.projects.length];
    var pager = '<nav class="pager" aria-label="More projects"><a class="prev" href="' + projectUrl(prev) + '"><span>&larr; Previous</span><b>' + esc(prev.title) + '</b></a><a class="next" href="' + projectUrl(next) + '"><span>Next &rarr;</span><b>' + esc(next.title) + '</b></a>' +
      '<a class="btn btn--outline pager__all" href="projects/" style="display:inline-flex;flex-direction:row;padding:0 30px;border-width:2px">Back to all projects</a></nav>';

    $('main').innerHTML = head + lead + '<div class="wrap">' + body + pager + '</div>';
    initLightbox();
  }

  function initLightbox() {
    var lb = document.createElement('div'); lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML = '<button type="button" aria-label="Close image">&times;</button><img alt="">'; document.body.appendChild(lb);
    var im = $('img', lb), last = null;
    function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; if (last) last.focus(); }
    function openZoom(t) { last = t; im.src = t.dataset.full || t.currentSrc || t.src; im.alt = t.alt; lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; $('button', lb).focus(); }
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t.matches('img[data-zoom]')) openZoom(t);
      else if (lb.classList.contains('is-open') && (t === lb || t.tagName === 'BUTTON')) close();
    });
    document.addEventListener('keydown', function (e) { // Enter or Space on a focused image opens it
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('img[data-zoom]')) { e.preventDefault(); openZoom(e.target); }
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'Tab') { e.preventDefault(); $('button', lb).focus(); } // the close button is the only control: keep focus on it
    });
  }

  /* ---------- ABOUT ---------- */
  function renderAbout() {
    var paras = S.about.map(function (t) {
      var h = esc(t).replace('{{work}}', '<a href="projects/">versatile art-style</a>').replace('{{contact}}', '<a href="contact/">Drop me a message</a>');
      return '<p>' + h + '</p>';
    }).join('');
    var facts = '<ul class="facts"><li>' + icon('heart') + esc(S.location) + '</li><li>' + icon('bolt') + 'Designing professionally since 2017</li><li>' + icon('star') + 'Branding &middot; Motion &middot; Marketing &middot; UI/UX</li></ul>';
    $('main').innerHTML = '<div class="wrap"><div class="page-head"><p class="eyebrow">Hello there</p><h1>About Me</h1></div>' +
      '<div class="about"><div class="headshot" role="img" aria-label="Headshot placeholder"><div class="headshot__ph">' + icon('spade') + 'Headshot<br>coming soon</div></div>' +
      '<div class="about__text">' + paras + facts + '</div></div></div>';
  }

  /* ---------- CONTACT ---------- */
  function renderContact() {
    function field(id, label, type, extra) {
      return '<div class="field"><label for="' + id + '">' + label + ' <i aria-hidden="true">*</i></label>' +
        (type === 'textarea' ? '<textarea id="' + id + '" name="' + id + '" required aria-describedby="' + id + '-err" ' + (extra || '') + '></textarea>' : '<input id="' + id + '" name="' + id + '" type="' + type + '" required aria-describedby="' + id + '-err" ' + (extra || '') + '>') +
        '<span class="err" id="' + id + '-err"></span></div>';
    }
    var socials = S.social.map(function (s) { return '<a href="' + esc(s.href) + '" target="_blank" rel="noopener">' + icon(s.id) + '<span>' + s.label + '</span></a>'; }).join('');
    $('main').innerHTML = '<div class="wrap"><div class="page-head"><p class="eyebrow">Say hello</p><h1>Contact</h1><p>Have a design question or a project in mind? Fill in the form and your message will land straight in my inbox.</p></div>' +
      '<div class="contact"><form class="form" id="contactForm" novalidate><div class="form__row">' + field('first', 'First name', 'text', 'autocomplete="given-name"') + field('last', 'Last name', 'text', 'autocomplete="family-name"') + '</div>' +
      field('email', 'Email address', 'email', 'autocomplete="email" inputmode="email"') + field('subject', 'Subject', 'text') + field('message', 'Message', 'textarea') +
      '<button class="btn btn--fill" type="submit">Send message</button><p class="form__note">By sending this message you agree to the use of your details to reply to you, as described in the <a href="privacy/">Privacy Policy</a>.</p><div class="form__status" id="formStatus" role="status"></div></form>' +
      '<aside class="side"><div class="side__card"><h2>Based in Toronto</h2><p>' + esc(S.location) + '. Happy to work with clients anywhere.</p></div>' +
      '<div class="side__card"><h2>Find me online</h2><div class="socials" style="margin-top:14px">' + socials + '</div></div></aside></div></div>';

    var form = $('#contactForm'), status = $('#formStatus');
    var labels = { first: 'your first name', last: 'your last name', email: 'a valid email address', subject: 'a subject', message: 'a message' };
    function validate() {
      var ok = true;
      Object.keys(labels).forEach(function (id) {
        var el = $('#' + id), box = el.closest('.field'), bad = !el.value.trim() || (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        box.classList.toggle('is-bad', bad); $('#' + id + '-err').textContent = bad ? 'Please enter ' + labels[id] + '.' : '';
        el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad && ok) { el.focus(); } if (bad) ok = false;
      });
      return ok;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault(); status.className = 'form__status';
      if (!validate()) return;
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (window.CONTACT_ENDPOINT) {
        fetch(window.CONTACT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(); status.textContent = 'Thanks ' + data.first + ' - your message has been sent.'; status.className = 'form__status is-ok'; form.reset(); })
          .catch(function () { status.textContent = 'Sorry, something went wrong. Please try again in a moment.'; status.className = 'form__status is-error'; });
      } else {
        // Prototype: no mail service is connected yet. In Framer this form is replaced by Framer's built-in form.
        status.textContent = 'Prototype preview: the form is not connected to email yet, so nothing was sent. In Framer this will use the built-in form.';
        status.className = 'form__status is-ok';
      }
    });
    $$('input, textarea', form).forEach(function (el) { el.addEventListener('input', function () { el.closest('.field').classList.remove('is-bad'); $('#' + el.id + '-err').textContent = ''; }); });
  }

  /* ---------- PRIVACY ---------- */
  function renderPrivacy() {
    var P = S.privacy;
    var email = P.email ? '<a href="mailto:' + esc(P.email) + '">' + esc(P.email) + '</a>' : '<span class="ph">[email address to be added]</span>';
    var toc = P.sections.map(function (sec, i) { return '<li><a href="#p-' + (i + 1) + '">' + esc(sec.title) + '</a></li>'; }).join('');
    var body = P.sections.map(function (sec, i) {
      return '<section class="prose__sec" id="p-' + (i + 1) + '"><h2><span class="num">' + (i + 1) + '</span><span>' + esc(sec.title) + '</span></h2>' +
        (sec.paras || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
        (sec.list ? '<ul>' + sec.list.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' : '') +
        (sec.after ? '<p>' + esc(sec.after) + '</p>' : '') +
        (sec.contact ? '<address class="prose__contact"><b>' + esc(S.fullName) + '</b><br>Toronto, Ontario, Canada<br>Email: ' + email + '</address>' : '') + '</section>';
    }).join('');
    $('main').innerHTML = '<div class="wrap"><div class="page-head"><p class="eyebrow">Your data, your call</p><h1>Privacy Policy</h1><p>Last updated: ' + esc(P.updated) + '</p></div>' +
      '<div class="prose"><nav class="prose__toc" aria-label="On this page"><h2>On this page</h2><ol>' + toc + '</ol></nav><div class="prose__body">' + body + '</div></div></div>';
  }

  /* ---------- boot ---------- */
  renderChrome();
  var routes = { home: renderHome, projects: renderProjects, project: renderProject, about: renderAbout, contact: renderContact, privacy: renderPrivacy };
  if (routes[page]) routes[page]();

  /* In-page links (skip link, privacy contents): pages use a <base href>, so a bare "#id" would point at the site root. Handle them here. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute('href').slice(1), t = id && document.getElementById(id); if (!t) return;
    e.preventDefault(); t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); t.scrollIntoView({ block: 'start' });
    try { history.replaceState(null, '', location.pathname + location.search + '#' + id); } catch (err) { /* ignore */ }
  });

  /* Pause / play all moving decoration (ticker, floating background, hero video). Remembered on this device. */
  (function initMotion() {
    var btn = $('#motionToggle'); if (!btn) return;
    var off = false; try { off = localStorage.getItem('zk-motion') === 'off'; } catch (e) {}
    function apply(isOff, save) {
      off = isOff; document.documentElement.classList.toggle('motion-off', off);
      btn.setAttribute('aria-pressed', off ? 'true' : 'false'); btn.textContent = off ? 'Play animations' : 'Pause animations';
      var v = $('#heroVideo'); if (v) { if (off) v.pause(); else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
      if (save) { try { localStorage.setItem('zk-motion', off ? 'off' : 'on'); } catch (e) {} }
    }
    btn.addEventListener('click', function () { apply(!off, true); });
    if (off) apply(true, false);
  })();
})();
