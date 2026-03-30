import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TeamService } from '../../../core/services/team.service';
import { PlayerService } from '../../../core/services/player.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Team } from '../../../core/models/team.model';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.scss',
})
export class TeamDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly teamService = inject(TeamService);
  private readonly playerService = inject(PlayerService);

  loading = signal(true);
  error = signal('');
  team = signal<Team | null>(null);
  squad = signal<Player[]>([]);

  playersByPosition = computed(() => {
    const map = new Map<string, Player[]>();
    this.squad().forEach((p) => {
      const pos = p.position?.name ?? 'Inconnu';
      if (!map.has(pos)) map.set(pos, []);
      map.get(pos)!.push(p);
    });
    return map;
  });

  positionEntries() { return [...this.playersByPosition().entries()]; }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      team: this.teamService.getById(id),
      players: this.playerService.getAll(),
    }).subscribe({
      next: ({ team, players }) => {
        this.team.set(team);
        this.squad.set(players.filter((p) => p.team?.id === id));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.displayMessage ?? 'Équipe introuvable');
        this.loading.set(false);
      },
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
}
