import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="flex items-center justify-center" [style.padding]="padding()">
      <div
        class="animate-spin rounded-full border-2 border-surface-700 border-t-primary-500"
        [style.width]="size()"
        [style.height]="size()"
      ></div>
      @if (label()) {
        <p class="ml-3 text-sm text-slate-400">{{ label() }}</p>
      }
    </div>
  `,
})
export class LoadingSpinnerComponent {
  size = input<string>('32px');
  padding = input<string>('2rem');
  label = input<string>('');
}
