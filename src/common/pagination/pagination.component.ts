import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  template: `
    <div class="pagination-container">
      <button (click)="onPrevious()" [disabled]="currentPage <= 1">Previous</button>
      <span>Page {{currentPage}} of {{totalPages}}</span>
      <button (click)="onNext()" [disabled]="currentPage >= totalPages">Next</button>
    </div>
  `,
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() previous: EventEmitter<void> = new EventEmitter();

  onNext() {
    this.next.emit();
  }

  onPrevious() {
    this.previous.emit();
  }
}
