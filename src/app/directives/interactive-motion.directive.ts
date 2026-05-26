import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appInteractiveMotion]'
})
export class InteractiveMotionDirective implements AfterViewInit, OnDestroy {
  @Input('appInteractiveMotion') intensity: number | string = 1;

  private frameId?: number;
  private reducedMotion = false;
  private isActive = false;
  private isInViewport = true;
  private pointerX = 0;
  private pointerY = 0;
  private scrollProgress = 0;
  private scrollDirection = 1;
  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;

    this.reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.renderer.addClass(element, 'motion-reactive');
    this.renderer.setStyle(element, '--motion-progress', '0');
    this.renderer.setStyle(element, '--motion-tilt-x', '0deg');
    this.renderer.setStyle(element, '--motion-tilt-y', '0deg');
    this.renderer.setStyle(element, '--motion-shift-x', '0px');
    this.renderer.setStyle(element, '--motion-shift-y', '0px');
    this.renderer.setStyle(
      element,
      '--motion-intensity',
      `${this.getIntensity()}`
    );

    if (this.reducedMotion || typeof window === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target !== element) {
            return;
          }

          this.isInViewport = entry.isIntersecting;

          if (!entry.isIntersecting) {
            this.scrollProgress = 0;
            this.scheduleUpdate();
            return;
          }

          this.updateScrollMotion();
          this.scheduleUpdate();
        });
      },
      {
        threshold: 0,
        rootMargin: '20% 0px 20% 0px'
      }
    );

    this.observer.observe(element);
    this.updateScrollMotion();
    this.scheduleUpdate();
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (this.reducedMotion || event.pointerType === 'touch') {
      return;
    }

    const element = this.elementRef.nativeElement;
    const bounds = element.getBoundingClientRect();

    if (!bounds.width || !bounds.height) {
      return;
    }

    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    this.isActive = true;
    this.pointerX = normalizedX;
    this.pointerY = normalizedY;
    this.scheduleUpdate();
  }

  @HostListener('pointerleave')
  @HostListener('pointercancel')
  onPointerLeave(): void {
    if (this.reducedMotion) {
      return;
    }

    this.isActive = false;
    this.pointerX = 0;
    this.pointerY = 0;
    this.scheduleUpdate();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (this.reducedMotion || !this.isInViewport) {
      return;
    }

    this.updateScrollMotion();
    this.scheduleUpdate();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();

    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private scheduleUpdate(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }

    this.frameId = requestAnimationFrame(() => {
      const element = this.elementRef.nativeElement;
      const intensity = this.getIntensity();
      const pointerTiltX = this.pointerY * -5 * intensity;
      const pointerTiltY = this.pointerX * 7 * intensity;
      const pointerShiftX = this.pointerX * 18 * intensity;
      const pointerShiftY = this.pointerY * 14 * intensity;
      const scrollTiltX = this.scrollProgress * -4.5 * intensity;
      const scrollTiltY = this.scrollDirection * this.scrollProgress * 9 * intensity;
      const scrollShiftX = this.scrollDirection * this.scrollProgress * 12 * intensity;
      const scrollShiftY = this.scrollProgress * -20 * intensity;
      const motionProgress = Math.min(
        Math.max(
          Math.max(Math.abs(this.pointerX), Math.abs(this.pointerY)),
          Math.abs(this.scrollProgress)
        ),
        1
      );
      const tiltX = pointerTiltX + scrollTiltX;
      const tiltY = pointerTiltY + scrollTiltY;
      const shiftX = pointerShiftX + scrollShiftX;
      const shiftY = pointerShiftY + scrollShiftY;

      this.renderer.setStyle(
        element,
        '--motion-progress',
        motionProgress.toFixed(3)
      );
      this.renderer.setStyle(element, '--motion-tilt-x', `${tiltX.toFixed(2)}deg`);
      this.renderer.setStyle(element, '--motion-tilt-y', `${tiltY.toFixed(2)}deg`);
      this.renderer.setStyle(element, '--motion-shift-x', `${shiftX.toFixed(2)}px`);
      this.renderer.setStyle(element, '--motion-shift-y', `${shiftY.toFixed(2)}px`);
    });
  }

  private updateScrollMotion(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const bounds = this.elementRef.nativeElement.getBoundingClientRect();

    if (!bounds.width || !bounds.height) {
      this.scrollProgress = 0;
      return;
    }

    const viewportWidth = window.innerWidth || 1;
    const viewportHeight = window.innerHeight || 1;
    const viewportCenterX = viewportWidth / 2;
    const viewportCenterY = viewportHeight / 2;
    const elementCenterX = bounds.left + bounds.width / 2;
    const elementCenterY = bounds.top + bounds.height / 2;
    const normalizedDistanceY =
      (viewportCenterY - elementCenterY) / (viewportHeight * 0.72);

    this.scrollDirection = elementCenterX < viewportCenterX ? -1 : 1;
    this.scrollProgress = Math.max(Math.min(normalizedDistanceY, 1), -1);
  }

  private getIntensity(): number {
    const parsedIntensity = Number(this.intensity);

    if (!Number.isFinite(parsedIntensity)) {
      return 1;
    }

    return Math.min(Math.max(parsedIntensity, 0.35), 1.6);
  }
}
