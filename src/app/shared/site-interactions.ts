type Cleanup = () => void;

export function initSiteInteractions(root: Document = document): Cleanup {
  const cleanups: Cleanup[] = [];
  const observers: Array<{ disconnect: () => void }> = [];
  const intervals: number[] = [];
  const animationFrames: number[] = [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const query = <T extends Element>(selector: string, scope: ParentNode = root): T | null =>
    scope.querySelector(selector) as T | null;

  const queryAll = <T extends Element>(selector: string, scope: ParentNode = root): T[] =>
    Array.from(scope.querySelectorAll(selector)) as T[];

  const listen = (
    target: EventTarget | null | undefined,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean
  ) => {
    if (!target || !('addEventListener' in target)) return;
    target.addEventListener(event, handler, options);
    cleanups.push(() => target.removeEventListener(event, handler, options));
  };

  const header = query<HTMLElement>('[data-header]');
  const menuButton = query<HTMLElement>('[data-menu-button]');
  const nav = query<HTMLElement>('[data-nav]');
  let lastScrollY = window.scrollY;

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuButton?.classList.remove('is-open');
    nav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };

  listen(menuButton, 'click', () => {
    if (!nav || !menuButton) return;
    const isOpen = !nav.classList.contains('is-open');
    document.body.classList.toggle('menu-open', isOpen);
    menuButton.classList.toggle('is-open', isOpen);
    nav.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  queryAll<HTMLAnchorElement>('.nav a').forEach((link) => listen(link, 'click', closeMenu));

  listen(
    window,
    'scroll',
    () => {
      const currentScrollY = window.scrollY;
      header?.classList.toggle('is-scrolled', currentScrollY > 24);
      header?.classList.toggle('is-hidden', currentScrollY > lastScrollY && currentScrollY > 140);
      lastScrollY = Math.max(currentScrollY, 0);
    },
    { passive: true }
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const animationName = element.dataset['animate'] || 'animate__fadeInUp';
        element.classList.add('is-visible');
        if (!prefersReducedMotion) {
          element.classList.add('animate__animated', animationName);
        }
        revealObserver.unobserve(element);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  observers.push(revealObserver);

  queryAll<HTMLElement>('.reveal').forEach((element, index) => {
    const delay = Math.min(index % 5, 4) * 70;
    element.style.transitionDelay = `${delay}ms`;
    element.style.setProperty('--animate-delay', `${delay}ms`);
    element.style.setProperty('--animate-duration', '820ms');
    revealObserver.observe(element);
  });

  const setAccordionCardOpen = (card: HTMLElement, isOpen: boolean) => {
    const trigger = query<HTMLElement>('[data-accordion-trigger]', card);
    const panel = query<HTMLElement>('[data-accordion-panel]', card);
    card.dataset['expanded'] = String(isOpen);
    trigger?.setAttribute('aria-expanded', String(isOpen));
    if (panel) panel.hidden = !isOpen;
  };

  queryAll<HTMLElement>('[data-accordion-card]').forEach((card, index) => {
    const trigger = query<HTMLElement>('[data-accordion-trigger]', card);
    const panel = query<HTMLElement>('[data-accordion-panel]', card);
    const cardId = card.id || `legal-accordion-card-${index + 1}`;
    const panelId = panel?.id || `${cardId}-panel`;

    card.id = cardId;
    if (panel) panel.id = panelId;
    trigger?.setAttribute('aria-controls', panelId);
    setAccordionCardOpen(card, card.dataset['expanded'] === 'true');

    listen(trigger, 'click', () => {
      const willOpen = card.dataset['expanded'] !== 'true';
      queryAll<HTMLElement>('[data-accordion-card]').forEach((other) => {
        if (other !== card) setAccordionCardOpen(other, false);
      });
      setAccordionCardOpen(card, willOpen);
    });
  });

  const animateCounter = (element: HTMLElement) => {
    if (element.dataset['done']) return;
    element.dataset['done'] = 'true';
    const target = Number(element.dataset['count'] || 0);
    const suffix = element.dataset['suffix'] || '';
    const decimals = String(element.dataset['count'] || '').includes('.') ? 1 : 0;
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
      if (progress < 1) {
        animationFrames.push(window.requestAnimationFrame(tick));
      }
    };

    animationFrames.push(window.requestAnimationFrame(tick));
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) animateCounter(entry.target as HTMLElement);
      });
    },
    { threshold: 0.45 }
  );
  observers.push(counterObserver);
  queryAll<HTMLElement>('[data-count]').forEach((element) => counterObserver.observe(element));

  queryAll<HTMLElement>('[data-carousel]').forEach((carousel) => {
    const track = query<HTMLElement>('[data-carousel-track]', carousel);
    const prevButton = query<HTMLButtonElement>('[data-carousel-prev]', carousel);
    const nextButton = query<HTMLButtonElement>('[data-carousel-next]', carousel);
    if (!track || !prevButton || !nextButton) return;

    const cardStep = () => {
      const card = query<HTMLElement>('.product-card', track);
      if (!card) return track.clientWidth;
      const computed = getComputedStyle(track);
      const gap = Number.parseFloat(computed.columnGap || computed.gap || '0');
      return card.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
      const maxScroll = track.scrollWidth - track.clientWidth - 2;
      prevButton.disabled = track.scrollLeft <= 2;
      nextButton.disabled = track.scrollLeft >= maxScroll;
    };

    listen(prevButton, 'click', () => track.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
    listen(nextButton, 'click', () => track.scrollBy({ left: cardStep(), behavior: 'smooth' }));
    listen(track, 'scroll', updateButtons, { passive: true });
    listen(window, 'resize', updateButtons);
    updateButtons();
  });

  const productModal = query<HTMLElement>('[data-product-modal]');
  const productModalPanel = query<HTMLElement>('.product-modal__panel', productModal || root);
  const productModalImage = query<HTMLImageElement>('[data-product-modal-image]');
  const productModalTitle = query<HTMLElement>('[data-product-modal-title]');
  const productModalTagline = query<HTMLElement>('[data-product-modal-tagline]');
  const productModalDetail = query<HTMLElement>('[data-product-modal-detail]');
  const productModalSpecs = query<HTMLElement>('[data-product-modal-specs]');
  let activeProductCard: HTMLElement | null = null;
  let productPointerStart: { x: number; y: number } | null = null;

  const closeProductModal = () => {
    if (!productModal) return;
    productModal.hidden = true;
    document.body.classList.remove('product-modal-open');
    activeProductCard?.focus();
    activeProductCard = null;
  };

  const openProductModal = (card: HTMLElement) => {
    if (!productModal || !productModalImage || !productModalTitle || !productModalTagline || !productModalDetail || !productModalSpecs) return;
    const image = query<HTMLImageElement>('img', card);
    const title = query<HTMLElement>('h3', card)?.textContent?.trim() || 'Lumocast model';
    const displayTitle = title.replace(/^LUMOCAST(?=\S)/, 'LUMOCAST ');
    const tagline = query<HTMLElement>('p', card)?.textContent?.trim() || '';
    const detail =
      card.dataset['detail'] ||
      'Explore this Lumocast model for digital signage, display scheduling, and cloud-managed screen communication.';
    const specs = (card.dataset['specs'] || 'Cloud managed|Digital signage|Lumocast display')
      .split('|')
      .filter(Boolean);

    activeProductCard = card;
    productModalImage.src = image?.getAttribute('src') || '';
    productModalImage.alt = image?.getAttribute('alt') || `${title} full view`;
    productModalTitle.textContent = displayTitle;
    productModalTagline.textContent = tagline;
    productModalDetail.textContent = detail;
    productModalSpecs.replaceChildren(
      ...specs.map((spec) => {
        const item = document.createElement('span');
        item.textContent = spec;
        return item;
      })
    );

    productModal.hidden = false;
    document.body.classList.add('product-modal-open');
    productModalPanel?.focus({ preventScroll: true });
  };

  queryAll<HTMLElement>('[data-product-card]').forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute(
      'aria-label',
      `View ${query<HTMLElement>('h3', card)?.textContent?.trim() || 'Lumocast model'} full details`
    );

    listen(card, 'pointerdown', (event: Event) => {
      const pointerEvent = event as PointerEvent;
      productPointerStart = { x: pointerEvent.clientX, y: pointerEvent.clientY };
    });

    listen(card, 'click', (event: Event) => {
      const pointerEvent = event as PointerEvent;
      if (productPointerStart) {
        const deltaX = Math.abs(pointerEvent.clientX - productPointerStart.x);
        const deltaY = Math.abs(pointerEvent.clientY - productPointerStart.y);
        if (deltaX > 10 || deltaY > 10) return;
      }
      openProductModal(card);
    });

    listen(card, 'keydown', (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key !== 'Enter' && keyboardEvent.key !== ' ') return;
      keyboardEvent.preventDefault();
      openProductModal(card);
    });
  });

  queryAll<HTMLElement>('[data-product-close]').forEach((control) => listen(control, 'click', closeProductModal));
  listen(query<HTMLElement>('[data-product-contact]'), 'click', closeProductModal);
  listen(document, 'keydown', (event: Event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (!productModal || productModal.hidden) return;
    if (keyboardEvent.key === 'Escape') closeProductModal();
    if (keyboardEvent.key !== 'Tab') return;

    const focusable = queryAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      productModal
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (keyboardEvent.shiftKey && document.activeElement === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  });

  if (!prefersReducedMotion) {
    queryAll<HTMLElement>('.tilt-card').forEach((card) => {
      const isDepth = card.classList.contains('anim-depth-hover');
      listen(card, 'pointermove', (event: Event) => {
        const pointerEvent = event as PointerEvent;
        if (pointerEvent.pointerType === 'touch') return;
        const rect = card.getBoundingClientRect();
        const x = (pointerEvent.clientX - rect.left) / rect.width - 0.5;
        const y = (pointerEvent.clientY - rect.top) / rect.height - 0.5;
        if (isDepth) {
          card.style.transform = `perspective(1200px) rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 16).toFixed(
            2
          )}deg) translateY(${(-y * 6).toFixed(2)}px)`;
        } else {
          card.style.transform = `perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(
            2
          )}deg) translateY(-2px)`;
        }
      });

      listen(card, 'pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  const progressBar = query<HTMLElement>('[data-progress-bar]');
  if (progressBar) {
    listen(
      window,
      'scroll',
      () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      },
      { passive: true }
    );
  }

  const cursor = query<HTMLElement>('[data-cursor]');
  const cursorDot = query<HTMLElement>('[data-cursor-dot]');
  if (cursor && !prefersReducedMotion) {
    let cursorX = -200;
    let cursorY = -200;
    let currentX = -200;
    let currentY = -200;
    let dotX = -200;
    let dotY = -200;
    let dotCurX = -200;
    let dotCurY = -200;
    let destroyed = false;

    listen(document, 'pointermove', (event: Event) => {
      const pointerEvent = event as PointerEvent;
      cursorX = pointerEvent.clientX;
      cursorY = pointerEvent.clientY;
      dotX = pointerEvent.clientX;
      dotY = pointerEvent.clientY;
      cursor.classList.add('is-visible');
      cursorDot?.classList.add('is-visible');
    });

    listen(document, 'pointerleave', () => {
      cursor.classList.remove('is-visible');
      cursorDot?.classList.remove('is-visible');
    });

    queryAll<HTMLElement>('a, button, .product-card, .feature-card, .blog-card, .tilt-card').forEach((element) => {
      listen(element, 'pointerenter', () => cursor.classList.add('is-hovering'));
      listen(element, 'pointerleave', () => cursor.classList.remove('is-hovering'));
    });

    const animateCursor = () => {
      if (destroyed) return;
      currentX += (cursorX - currentX) * 0.08;
      currentY += (cursorY - currentY) * 0.08;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      if (cursorDot) {
        dotCurX += (dotX - dotCurX) * 0.2;
        dotCurY += (dotY - dotCurY) * 0.2;
        cursorDot.style.transform = `translate(${dotCurX}px, ${dotCurY}px) translate(-50%, -50%)`;
      }
      animationFrames.push(window.requestAnimationFrame(animateCursor));
    };

    animationFrames.push(window.requestAnimationFrame(animateCursor));
    cleanups.push(() => {
      destroyed = true;
    });
  }

  queryAll<HTMLElement>('.anim-chip-stagger, .anim-stagger-children').forEach((element) => {
    const parentReveal = element.closest('.reveal');
    if (parentReveal) {
      const mutationObserver = new MutationObserver(() => {
        if (parentReveal.classList.contains('is-visible')) {
          element.classList.add('is-visible');
          mutationObserver.disconnect();
        }
      });
      observers.push(mutationObserver);
      mutationObserver.observe(parentReveal, { attributes: true, attributeFilter: ['class'] });
      if (parentReveal.classList.contains('is-visible')) {
        element.classList.add('is-visible');
        mutationObserver.disconnect();
      }
    } else {
      revealObserver.observe(element);
    }
  });

  const splitTextObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add('is-visible');
        splitTextObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );
  observers.push(splitTextObserver);
  queryAll<HTMLElement>('[data-split-text]').forEach((element) => splitTextObserver.observe(element));

  queryAll<HTMLElement>('[data-carousel-auto]').forEach((track) => {
    const carousel = track.closest('[data-carousel]') as HTMLElement | null;
    const prevButton = carousel ? query<HTMLElement>('[data-carousel-prev]', carousel) : null;
    const nextButton = carousel ? query<HTMLElement>('[data-carousel-next]', carousel) : null;
    let intervalId = 0;

    const cardStep = () => {
      const card = query<HTMLElement>('.product-card', track);
      if (!card) return 370;
      const style = getComputedStyle(track);
      const gap = Number.parseFloat(style.columnGap || style.gap || '0');
      return card.getBoundingClientRect().width + gap;
    };

    const startAutoPlay = () => {
      window.clearInterval(intervalId);
      intervalId = window.setInterval(() => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const step = cardStep();
        const nextPosition = track.scrollLeft + step;
        if (nextPosition >= maxScroll) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: step, behavior: 'smooth' });
        }
      }, 4000);
      intervals.push(intervalId);
    };

    const stopAutoPlay = () => {
      window.clearInterval(intervalId);
    };

    if (!prefersReducedMotion) {
      startAutoPlay();
      listen(track, 'pointerenter', stopAutoPlay);
      listen(track, 'pointerleave', startAutoPlay);
      listen(prevButton, 'pointerenter', stopAutoPlay);
      listen(prevButton, 'pointerleave', startAutoPlay);
      listen(nextButton, 'pointerenter', stopAutoPlay);
      listen(nextButton, 'pointerleave', startAutoPlay);
    }
  });

  if (!prefersReducedMotion) {
    queryAll<HTMLElement>('.button, .nav__cta').forEach((button) => {
      listen(button, 'pointermove', (event: Event) => {
        const pointerEvent = event as PointerEvent;
        const rect = button.getBoundingClientRect();
        const x = (pointerEvent.clientX - rect.left) / rect.width - 0.5;
        const y = (pointerEvent.clientY - rect.top) / rect.height - 0.5;
        const hoverY = button.matches(':hover') ? -2 : 0;
        button.style.transform = `translate(${(x * 8).toFixed(1)}px, ${(y * 8 + hoverY).toFixed(1)}px)`;
      });

      listen(button, 'pointerleave', () => {
        button.style.transform = '';
      });
    });
  }

  queryAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    listen(anchor, 'click', (event: Event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = query<HTMLElement>(targetId);
      if (!target) return;
      event.preventDefault();
      const offset = 100;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  if (!prefersReducedMotion) {
    const parallaxElements = queryAll<HTMLElement>(
      '.hero__visual img, .about__image img, .display-story__media img, .technology__stage img, .iq__media img'
    );
    listen(
      window,
      'scroll',
      () => {
        parallaxElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const centerDistance = rect.top + rect.height / 2 - window.innerHeight / 2;
          const offset = Math.min(Math.max(centerDistance * 0.04, -20), 20);
          const existingTransform = (element.style.transform || '').replace(/translateY\([^)]+\)/, '').trim();
          element.style.transform = existingTransform
            ? `${existingTransform} translateY(${offset}px)`
            : `translateY(${offset}px)`;
        });
      },
      { passive: true }
    );
  }

  queryAll<HTMLElement>('.feature-grid, .blog-grid, .legal-grid, .carousel__track').forEach((grid) => {
    Array.from(grid.children).forEach((child, index) => {
      (child as HTMLElement).style.setProperty('--stagger-index', String(index));
    });
  });

  queryAll<HTMLElement>('.product-card, .feature-card, .blog-card, .insight-card').forEach((card) => {
    listen(card, 'pointermove', (event: Event) => {
      const pointerEvent = event as PointerEvent;
      const rect = card.getBoundingClientRect();
      const x = ((pointerEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((pointerEvent.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  queryAll<HTMLElement>('.button, .nav__cta, .newsletter__form button').forEach((button) => {
    listen(button, 'pointerdown', (event: Event) => {
      const pointerEvent = event as PointerEvent;
      const rect = button.getBoundingClientRect();
      const x = ((pointerEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((pointerEvent.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty('--rx', `${x}%`);
      button.style.setProperty('--ry', `${y}%`);
    });
  });

  const sections = queryAll<HTMLElement>('main section[id]');
  const navLinks = queryAll<HTMLAnchorElement>('.nav a[href^="#"]');
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = (entry.target as HTMLElement).getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { threshold: 0.28 }
  );
  observers.push(activeObserver);
  sections.forEach((section) => activeObserver.observe(section));

  const workflowSteps = queryAll<HTMLElement>('[data-workflow-step]');
  if (workflowSteps.length) {
    const workflowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          workflowSteps.forEach((step) => step.classList.toggle('is-active', step === entry.target));
        });
      },
      { threshold: 0.55 }
    );
    observers.push(workflowObserver);
    workflowSteps.forEach((step) => workflowObserver.observe(step));
  }

  const contactForm = query<HTMLFormElement>('[data-contact-form]');
  listen(contactForm, 'submit', (event: Event) => {
    event.preventDefault();
    if (!contactForm) return;
    const note = query<HTMLElement>('[data-form-note]', contactForm);
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const firstName = String(data.get('firstName') || '');
    const lastName = String(data.get('lastName') || '');
    const inquiryType = String(data.get('inquiryType') || '');
    const model = String(data.get('model') || '');
    const subject = `${inquiryType} | ${model} | ${firstName} ${lastName}`;
    const body = [
      'Hello LUMOCAST Signage Team,',
      '',
      'Please find my inquiry details below:',
      '',
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `Email: ${String(data.get('email') || '')}`,
      `Phone: ${String(data.get('phone') || '')}`,
      `Company Name: ${String(data.get('companyName') || 'N/A')}`,
      `Designation: ${String(data.get('designation') || 'N/A')}`,
      `Inquiry Type: ${inquiryType}`,
      `LUMOCAST Model: ${model}`,
      '',
      'Message:',
      String(data.get('message') || ''),
      '',
      'Regards,',
      `${firstName} ${lastName}`
    ].join('\n');

    window.location.href = `mailto:sales@lumocast.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (note) {
      note.textContent = 'Your email app should open with your inquiry formatted and ready to send.';
    }
    contactForm.reset();
  });

  const newsletterForm = query<HTMLFormElement>('[data-newsletter-form]');
  listen(newsletterForm, 'submit', (event: Event) => {
    event.preventDefault();
    if (!newsletterForm || !newsletterForm.reportValidity()) return;
    const button = query<HTMLButtonElement>('button', newsletterForm);
    if (!button) return;
    button.textContent = 'Subscribed';
    newsletterForm.reset();
    window.setTimeout(() => {
      button.textContent = 'Subscribe';
    }, 2200);
  });

  return () => {
    document.body.classList.remove('menu-open', 'product-modal-open');
    cleanups.forEach((cleanup) => cleanup());
    observers.forEach((observer) => observer.disconnect());
    intervals.forEach((intervalId) => window.clearInterval(intervalId));
    animationFrames.forEach((frameId) => window.cancelAnimationFrame(frameId));
  };
}
