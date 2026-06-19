(function () {
  var routeMap = {
    'index.html': '/',
    'technology.html': '/technology',
    'blog.html': '/blog',
    'contact.html': '/contact',
    'privacy-policy.html': '/privacy-policy',
    'privacy-policy-1.html': '/privacy-policy-1',
    'terms-and-coniditions.html': '/terms-and-coniditions'
  };

  function toAngularRoute(href) {
    if (!href || href.indexOf('javascript:') === 0 || href.indexOf('#') === 0) {
      return null;
    }

    if (
      /^https?:\/\//i.test(href) ||
      href.indexOf('mailto:') === 0 ||
      href.indexOf('tel:') === 0
    ) {
      return null;
    }

    if (routeMap[href]) {
      return routeMap[href];
    }

    if (href.indexOf('post/') === 0 && href.slice(-5) === '.html') {
      return '/' + href.slice(0, -5);
    }

    return null;
  }

  function injectMotionStyles() {
    if (document.getElementById('codex-mirror-motion')) {
      return;
    }

    var style = document.createElement('style');
    style.id = 'codex-mirror-motion';
    style.textContent = [
      '.codex-reveal{opacity:0;transform:translate3d(0,36px,0) scale(.985);transition:opacity .85s cubic-bezier(.22,1,.36,1),transform .85s cubic-bezier(.22,1,.36,1);transition-delay:var(--codex-delay,0ms);will-change:opacity,transform;}',
      '.codex-reveal.codex-reveal-image{transform:translate3d(0,42px,0) scale(.97);}',
      '.codex-reveal.codex-reveal-visible{opacity:1;transform:translate3d(0,0,0) scale(1);}',
      '.codex-reveal img,.codex-reveal picture,.codex-reveal wow-image{transition:transform 1.1s cubic-bezier(.22,1,.36,1),filter 1.1s cubic-bezier(.22,1,.36,1);}',
      '.codex-reveal.codex-reveal-image:not(.codex-reveal-visible) img,.codex-reveal.codex-reveal-image:not(.codex-reveal-visible) picture,.codex-reveal.codex-reveal-image:not(.codex-reveal-visible) wow-image{transform:scale(1.03);filter:saturate(.92);}',
      '.codex-reveal.codex-reveal-visible img,.codex-reveal.codex-reveal-visible picture,.codex-reveal.codex-reveal-visible wow-image{transform:scale(1);filter:none;}',
      '@media (prefers-reduced-motion: reduce){.codex-reveal,.codex-reveal img,.codex-reveal picture,.codex-reveal wow-image{opacity:1!important;transform:none!important;transition:none!important;filter:none!important;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function isEligibleElement(element) {
    if (!element || element.classList.contains('codex-reveal')) {
      return false;
    }

    var computed = window.getComputedStyle(element);
    if (computed.display === 'none' || computed.visibility === 'hidden') {
      return false;
    }

    var rect = element.getBoundingClientRect();
    return rect.width > 24 && rect.height > 24;
  }

  function collectMotionTargets() {
    var selectors = [
      '[data-testid="richTextElement"]',
      '[data-testid="imageX"]',
      '.gallery-item-container',
      '[data-semantic-classname="button"]',
      '.StylableButton2545352419__root',
      'form',
      'section > div[id^="comp-"]',
      'footer > div[id^="comp-"]'
    ];

    var nodes = [];
    selectors.forEach(function (selector) {
      var found = document.querySelectorAll(selector);
      found.forEach(function (node) {
        if (isEligibleElement(node)) {
          nodes.push(node);
        }
      });
    });

    return Array.from(new Set(nodes));
  }

  function bootMotion() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    injectMotionStyles();

    var targets = collectMotionTargets();
    if (!targets.length) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('codex-reveal-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    targets.forEach(function (node, index) {
      node.classList.add('codex-reveal');

      if (
        node.matches('[data-testid="imageX"]') ||
        node.classList.contains('gallery-item-container')
      ) {
        node.classList.add('codex-reveal-image');
      }

      node.style.setProperty('--codex-delay', String((index % 6) * 70) + 'ms');
      observer.observe(node);
    });
  }

  document.addEventListener('click', function (event) {
    var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;

    if (!anchor) {
      return;
    }

    var href = anchor.getAttribute('href');
    var route = toAngularRoute(href);

    if (!route) {
      return;
    }

    event.preventDefault();
    window.top.location.assign(route);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootMotion, { once: true });
  } else {
    bootMotion();
  }
})();
