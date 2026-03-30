import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlayerService } from '../../core/services/player.service';
import { TeamService } from '../../core/services/team.service';
import { CountryService } from '../../core/services/country.service';
import { AuthService } from '../../core/services/auth.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Player } from '../../core/models/player.model';
import { Team } from '../../core/models/team.model';
import { Country } from '../../core/models/country.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, StatCardComponent, LoadingSpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly playerService = inject(PlayerService);
  private readonly teamService = inject(TeamService);
  private readonly countryService = inject(CountryService);
  readonly authService = inject(AuthService);

  loading = signal(true);
  players = signal<Player[]>([]);
  teams = signal<Team[]>([]);
  countries = signal<Country[]>([]);
  recentPlayers = signal<Player[]>([]);

  // Position chart
  positionSeries = signal<any[]>([]);
  positionOptions = signal<any>({
    chart: { type: 'bar', height: 280, background: 'transparent', foreColor: '#94a3b8', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
    dataLabels: { enabled: false },
    fill: { type: 'gradient', gradient: { shade: 'dark', type: 'vertical', gradientToColors: ['#6366f1'], stops: [0, 100] } },
    xaxis: { categories: [], labels: { style: { colors: '#94a3b8', fontSize: '12px' } }, axisBorder: { show: false }, axisTicks: { show: false } },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#334155' },
  });

  // Country donut chart
  countrySeries = signal<number[]>([]);
  countryLabels = signal<string[]>([]);
  countryOptions = signal<any>({
    chart: { type: 'donut', height: 280, background: 'transparent', foreColor: '#94a3b8' },
    legend: { position: 'bottom', labels: { colors: '#94a3b8' } },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    tooltip: { theme: 'dark' },
  });

  ngOnInit() {
    forkJoin({
      players: this.playerService.getAll(),
      teams: this.teamService.getAll(),
      countries: this.countryService.getAll(),
    }).subscribe({
      next: ({ players, teams, countries }) => {
        this.players.set(players);
        this.teams.set(teams);
        this.countries.set(countries);
        this.recentPlayers.set(players.slice(0, 6));
        this.buildPositionChart(players);
        this.buildCountryChart(players);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  private buildPositionChart(players: Player[]) {
    const map = new Map<string, number>();
    players.forEach((p) => {
      const pos = p.position?.name ?? 'Inconnu';
      map.set(pos, (map.get(pos) ?? 0) + 1);
    });
    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);
    this.positionSeries.set([{ name: 'Joueurs', data: sorted.map(([, v]) => v) }]);
    this.positionOptions.update((o: any) => ({
      ...o, xaxis: { ...o.xaxis, categories: sorted.map(([k]) => k) },
    }));
  }

  private buildCountryChart(players: Player[]) {
    const map = new Map<string, number>();
    players.forEach((p) => {
      const c = p.country?.name ?? 'Inconnu';
      map.set(c, (map.get(c) ?? 0) + 1);
    });
    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    this.countryLabels.set(sorted.map(([k]) => k));
    this.countrySeries.set(sorted.map(([, v]) => v));
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
