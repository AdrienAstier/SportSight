import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatchService } from '../../../core/services/match.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Match } from '../../../core/models/match.model';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent],
  templateUrl: './match-detail.component.html',
  styleUrl: './match-detail.component.scss',
})
export class MatchDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly matchService = inject(MatchService);

  loading = signal(true);
  error = signal('');
  match = signal<Match | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.matchService.getById(id).subscribe({
      next: (match) => { this.match.set(match); this.loading.set(false); },
      error: (err) => { this.error.set(err.displayMessage ?? 'Match introuvable'); this.loading.set(false); },
    });
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  }
}
