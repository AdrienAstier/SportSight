import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../../core/services/team.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Team } from '../../../core/models/team.model';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [RouterLink, FormsModule, LoadingSpinnerComponent],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss',
})
export class TeamListComponent implements OnInit {
  private readonly teamService = inject(TeamService);

  loading = signal(true);
  error = signal('');
  allTeams = signal<Team[]>([]);
  searchQuery = signal('');
  selectedContinent = signal('');

  continents = computed(() =>
    [...new Set(this.allTeams().map((t) => t.country?.continent?.name).filter((v): v is string => !!v))].sort()
  );

  filteredTeams = computed(() => {
    let list = this.allTeams();
    const q = this.searchQuery().toLowerCase();
    if (q) list = list.filter((t) =>
      t.name.toLowerCase().includes(q) || t.country?.name?.toLowerCase().includes(q)
    );
    if (this.selectedContinent()) list = list.filter((t) => t.country?.continent?.name === this.selectedContinent());
    return list;
  });

  ngOnInit() {
    this.teamService.getAll().subscribe({
      next: (teams) => { this.allTeams.set(teams); this.loading.set(false); },
      error: (err) => { this.error.set(err.displayMessage ?? 'Erreur de chargement'); this.loading.set(false); },
    });
  }
}
