import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { DisplayStat } from '../../models/site-content';

@Component({
  selector: 'app-display-section',
  templateUrl: './display-section.component.html',
  styleUrls: ['./display-section.component.scss']
})
export class DisplaySectionComponent implements AfterViewInit, OnDestroy {
  @Input() image = '';
  @Input() stats: DisplayStat[] = [];

  readonly headingWords = [
    'Fully',
    'Autonomous,',
    'Uncompromisingly',
    'Sustainable'
  ];
  readonly bodyParagraphs = [
    'Experience the full potential of high-definition display screens with a myriad of benefits. Notably, these screens offer unparalleled advantages, starting with the production of exceptionally clear images at heightened resolutions.',
    'Dive into the world of 4K, where colors come to life with unrivaled crispness, rendering it ideal for professional applications. Plus, a superior contrast ratio ensures a brighter and more vivid display even from a distance. LED displays also reduce energy use while extending panel life.'
  ];
  animatedValues: string[] = [];

  private observer?: IntersectionObserver;
  private frameId?: number;
  private hasAnimated = false;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.animatedValues = this.stats.map(stat => stat.value);
      return;
    }

    this.animatedValues = this.stats.map(stat => this.formatAnimatedValue(stat, 0));

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || this.hasAnimated) {
            return;
          }

          this.hasAnimated = true;
          this.animateStats();
          this.observer?.disconnect();
        });
      },
      {
        threshold: 0.28
      }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();

    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  getAnimatedValue(index: number, stat: DisplayStat): string {
    return this.animatedValues[index] ?? stat.value;
  }

  private animateStats(): void {
    const startedAt = performance.now();
    const duration = 1400;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      this.animatedValues = this.stats.map(stat =>
        this.formatAnimatedValue(stat, easedProgress)
      );

      if (progress < 1) {
        this.frameId = requestAnimationFrame(step);
      }
    };

    this.frameId = requestAnimationFrame(step);
  }

  private formatAnimatedValue(stat: DisplayStat, progress: number): string {
    const match = stat.value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

    if (!match) {
      return stat.value;
    }

    const [, prefix, rawNumber, suffix] = match;
    const targetValue = Number(rawNumber);

    if (!Number.isFinite(targetValue)) {
      return stat.value;
    }

    const decimalPlaces = rawNumber.includes('.') ? rawNumber.split('.')[1].length : 0;
    const currentValue = targetValue * progress;
    const formattedNumber =
      decimalPlaces > 0
        ? currentValue.toFixed(decimalPlaces)
        : Math.round(currentValue).toString();

    return `${prefix}${formattedNumber}${suffix}`;
  }
}
