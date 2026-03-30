import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../../core/services/match.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Match } from '../../../core/models/match.model';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [RouterLink, FormsModule, LoadingSpinnerComponent],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.scss',
})
export class MatchListComponent implements OnInit {
  private readonly matchService = inject(MatchService);

  loading = signal(true);
  error = signal('');
  allMatches = signal<Match[]>([]);
  searchQuery = signal('');
  selectedCompetition = signal('');
  selectedSeason = signal('');

  competitions = computed(() =>
    [...new Set(this.allMatches().map((m) => m.competition?.name).filter((v): v is string => !!v))].sort()
  );

  seasons = computed(() =>
    [...new Set(this.allMatches().map((m) => m.season?.name).filter((v): v is string => !!v))].sort().reverse()
  );

  filteredMatches = computed(() => {
    let list = this.allMatches();
    const q = this.searchQuery().toLowerCase();
    if (q) list = list.filter((m) =>
      m.homeTeam?.name?.toLowerCase().includes(q) ||
      m.awayTeam?.name?.toLowerCase().includes(q) ||
      m.stadium?.name?.toLowerCase().includes(q) ||
      m.competition?.name?.toLowerCase().includes(q)
    );
    if (this.selectedCompetition()) list = list.filter((m) => m.competition?.name === this.selectedCompetition());
    if (this.selectedSeason()) list = list.filter((m) => m.season?.name === this.selectedSeason());
    return list;
  });

  ngOnInit() {
    this.matchService.getAll().subscribe({
      next: (matches) => { this.allMatches.set(matches); this.loading.set(false); },
      error: (err) => { this.error.set(err.displayMessage ?? 'Erreur de chargement'); this.loading.set(false); },
    });
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCompetition.set('');
    this.selectedSeason.set('');
  }
}
