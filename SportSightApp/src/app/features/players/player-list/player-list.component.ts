import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../../core/services/player.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [RouterLink, FormsModule, LoadingSpinnerComponent],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent implements OnInit {
  private readonly playerService = inject(PlayerService);

  loading = signal(true);
  error = signal('');
  allPlayers = signal<Player[]>([]);
  searchQuery = signal('');
  selectedPosition = signal('');
  selectedFoot = signal('');

  positions = computed(() =>
    [...new Set(this.allPlayers().map((p) => p.position?.name).filter((v): v is string => !!v))].sort()
  );

  filteredPlayers = computed(() => {
    let list = this.allPlayers();
    const q = this.searchQuery().toLowerCase();
    if (q) list = list.filter((p) =>
      p.firstName.toLowerCase().includes(q) ||
      p.lastName.toLowerCase().includes(q) ||
      p.team?.name?.toLowerCase().includes(q) ||
      p.country?.name?.toLowerCase().includes(q)
    );
    if (this.selectedPosition()) list = list.filter((p) => p.position?.name === this.selectedPosition());
    if (this.selectedFoot()) list = list.filter((p) => p.preferredFoot?.toLowerCase() === this.selectedFoot());
    return list;
  });

  ngOnInit() {
    this.playerService.getAll().subscribe({
      next: (players) => { this.allPlayers.set(players); this.loading.set(false); },
      error: (err) => { this.error.set(err.displayMessage ?? 'Erreur de chargement'); this.loading.set(false); },
    });
  }

  getAge(birthdate: string): number {
    if (!birthdate) return 0;
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedPosition.set('');
    this.selectedFoot.set('');
  }
}
