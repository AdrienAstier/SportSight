import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlayerService } from '../../../core/services/player.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [RouterLink, NgApexchartsModule, LoadingSpinnerComponent],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss',
})
export class PlayerDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly playerService = inject(PlayerService);

  loading = signal(true);
  error = signal('');
  player = signal<Player | null>(null);

  radarSeries = signal<any[]>([]);
  radarOptions = signal<any>({
    chart: { type: 'radar', height: 320, background: 'transparent', foreColor: '#94a3b8', toolbar: { show: false } },
    xaxis: { categories: ['Taille', 'Poids', 'Vitesse', 'Technique', 'Endurance', 'Force'] },
    yaxis: { show: false, max: 100 },
    fill: { type: 'solid', opacity: 0.2, colors: ['#3b82f6'] },
    stroke: { width: 2, colors: ['#3b82f6'] },
    markers: { size: 4, colors: ['#3b82f6'] },
    tooltip: { theme: 'dark' },
  });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getById(id).subscribe({
      next: (player) => {
        this.player.set(player);
        this.buildRadar(player);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.displayMessage ?? 'Joueur introuvable');
        this.loading.set(false);
      },
    });
  }

  private buildRadar(player: Player) {
    const h = Math.min(100, Math.max(0, ((player.height ?? 175) - 160) * 2.5));
    const w = Math.min(100, Math.max(0, ((player.weight ?? 75) - 55) * 2));
    this.radarSeries.set([{
      name: `${player.firstName} ${player.lastName}`,
      data: [h, w, 72, 78, 68, 65],
    }]);
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
