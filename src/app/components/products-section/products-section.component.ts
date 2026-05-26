import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ProductCard } from '../../models/site-content';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss']
})
export class ProductsSectionComponent implements AfterViewInit, OnChanges {
  @ViewChild('productsViewport')
  private productsViewport?: ElementRef<HTMLDivElement>;

  @Input() products: ProductCard[] = [];

  currentPage = 0;
  cardsPerView = 3;
  canScrollPrev = false;
  canScrollNext = false;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.products.length / this.cardsPerView));
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.syncViewportState();
  }

  ngAfterViewInit(): void {
    this.syncViewportState();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.syncViewportState();
  }

  scrollProducts(direction: -1 | 1): void {
    const viewport = this.productsViewport?.nativeElement;

    if (!viewport) {
      return;
    }

    const cardWidth = this.getCardWidth(viewport);
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const nextScrollLeft = Math.max(
      0,
      Math.min(maxScrollLeft, viewport.scrollLeft + direction * cardWidth)
    );

    viewport.scrollTo({
      left: nextScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(() => this.updateScrollState(), 320);
  }

  updateScrollState(): void {
    const viewport = this.productsViewport?.nativeElement;

    if (!viewport) {
      return;
    }

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const tolerance = 4;
    const cardWidth = this.getCardWidth(viewport);
    const nextPage = Math.round(viewport.scrollLeft / Math.max(cardWidth, 1));

    this.currentPage = Math.max(0, Math.min(this.totalPages - 1, nextPage));
    this.canScrollPrev = viewport.scrollLeft > tolerance;
    this.canScrollNext = viewport.scrollLeft < maxScrollLeft - tolerance;
  }

  private syncViewportState(): void {
    this.cardsPerView = this.getCardsPerView();

    setTimeout(() => {
      const viewport = this.productsViewport?.nativeElement;

      if (!viewport) {
        return;
      }

      this.currentPage = Math.max(0, Math.min(this.currentPage, this.totalPages - 1));
      viewport.scrollLeft = this.currentPage * this.getCardWidth(viewport);
      this.updateScrollState();
    });
  }

  private getCardWidth(viewport: HTMLDivElement): number {
    const firstCard = viewport.querySelector<HTMLElement>('.product-card');

    if (!firstCard) {
      return viewport.clientWidth;
    }

    const gap = Number.parseFloat(getComputedStyle(viewport).columnGap || getComputedStyle(viewport).gap || '0');

    return firstCard.getBoundingClientRect().width + gap;
  }

  private getCardsPerView(): number {
    if (typeof window === 'undefined') {
      return 3;
    }

    if (window.innerWidth <= 640) {
      return 1;
    }

    if (window.innerWidth <= 1000) {
      return 2;
    }

    return 3;
  }
}
