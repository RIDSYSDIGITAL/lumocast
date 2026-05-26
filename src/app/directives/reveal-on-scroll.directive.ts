import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appReveal]'
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  @Input('appReveal') delay: number | string = 0;

  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    const parsedDelay = Number(this.delay);

    this.renderer.addClass(element, 'reveal');
    this.renderer.setStyle(
      element,
      '--reveal-delay',
      `${Number.isFinite(parsedDelay) ? parsedDelay : 0}ms`
    );

    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.renderer.addClass(element, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          this.renderer.addClass(element, 'is-visible');
          this.observer?.disconnect();
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
