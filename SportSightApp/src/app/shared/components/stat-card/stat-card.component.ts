import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type StatCardVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  title = input.required<string>();
  value = input.required<string | number>();
  subtitle = input<string>('');
  variant = input<StatCardVariant>('default');
}
