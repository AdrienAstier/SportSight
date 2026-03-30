import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlayerService } from '../../core/services/player.service';
import { TeamService } from '../../core/services/team.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Player } from '../../core/models/player.model';
import { Team } from '../../core/models/team.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NgApexchartsModule, LoadingSpinnerComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  private readonly playerService = inject(PlayerService);
  private readonly teamService = inject(TeamService);

  loading = signal(true);
  players = signal<Player[]>([]);
  teams = signal<Team[]>([]);

  // Height distribution
  heightSeries = signal<any[]>([]);
  heightOptions = signal<any>({
    chart: { type: 'area', height: 260, background: 'transparent', foreColor: '#94a3b8', toolbar: { show: false }, zoom: { enabled: false } },
    xaxis: { categories: [], labels: { style: { colors: '#94a3b8', fontSize: '11px' } }, axisBorder: { show: false } },
    yaxis: { labels: { style: { colors: '#94a3b8' } } },
    fill: { type: 'gradient', gradient: { shade: 'dark', type: 'vertical', gradientToColors: ['transparent'], stops: [0, 100] } },
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#334155' },
    colors: ['#3b82f6'],
  });

  // Age distribution
  ageSeries = signal<any[]>([]);
  ageOptions = signal<any>({
    chart: { type: 'bar', height: 260, background: 'transparent', foreColor: '#94a3b8', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
    xaxis: { categories: [], labels: { style: { colors: '#94a3b8', fontSize: '11px' } }, axisBorder: { show: false } },
    fill: { colors: ['#6366f1'] },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#334155' },
  });

  // Teams by country
  teamCountrySeries = signal<any[]>([]);
  teamCountryOptions = signal<any>({
    chart: { type: 'bar', height: 260, background: 'transparent', foreColor: '#94a3b8', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '70%' } },
    xaxis: { categories: [], labels: { style: { colors: '#94a3b8', fontSize: '11px' }, rotate: -35 }, axisBorder: { show: false } },
    fill: { colors: ['#10b981'] },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#334155' },
  });

  footStats = computed(() => {
    const players = this.players();
    const counts = { left: 0, right: 0, both: 0, unknown: 0 };
    players.forEach((p) => {
      const foot = p.preferredFoot?.toLowerCase() ?? '';
      if (foot === 'left') counts.left++;
      else if (foot === 'right') counts.right++;
      else if (foot === 'both') counts.both++;
      else counts.unknown++;
    });
    return { ...counts, total: players.length };
  });

  pct(value: number): string {
    const total = this.footStats().total;
    return total ? ((value / total) * 100).toFixed(1) : '0';
  }

  ngOnInit() {
    Promise.all([
      this.playerService.getAll().toPromise(),
      this.teamService.getAll().toPromise(),
    ]).then(([players = [], teams = []]) => {
      this.players.set(players);
      this.teams.set(teams);
      this.buildHeightChart(players);
      this.buildAgeChart(players);
      this.buildTeamCountryChart(teams);
      this.loading.set(false);
    });
  }

  private buildHeightChart(players: Player[]) {
    const ranges = ['<165', '165-170', '170-175', '175-180', '180-185', '185-190', '190-195', '>195'];
    const counts = new Array(ranges.length).fill(0);
    players.forEach((p) => {
      const h = p.height;
      if (!h) return;
      if (h < 165) counts[0]++;
      else if (h < 170) counts[1]++;
      else if (h < 175) counts[2]++;
      else if (h < 180) counts[3]++;
      else if (h < 185) counts[4]++;
      else if (h < 190) counts[5]++;
      else if (h < 195) counts[6]++;
      else counts[7]++;
    });
    this.heightSeries.set([{ name: 'Joueurs', data: counts }]);
    this.heightOptions.update((o: any) => ({ ...o, xaxis: { ...o.xaxis, categories: ranges } }));
  }

  private buildAgeChart(players: Player[]) {
    const getAge = (b: string) => {
      if (!b) return 0;
      const birth = new Date(b), today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      return age;
    };
    const labels = ['<20', '20-25', '25-30', '30-35', '>35'];
    const counts = [0, 0, 0, 0, 0];
    players.forEach((p) => {
      const age = getAge(p.birthdate);
      if (age < 20) counts[0]++;
      else if (age < 25) counts[1]++;
      else if (age < 30) counts[2]++;
      else if (age < 35) counts[3]++;
      else counts[4]++;
    });
    this.ageSeries.set([{ name: 'Joueurs', data: counts }]);
    this.ageOptions.update((o: any) => ({ ...o, xaxis: { ...o.xaxis, categories: labels } }));
  }

  private buildTeamCountryChart(teams: Team[]) {
    const map = new Map<string, number>();
    teams.forEach((t) => {
      const c = t.country?.name ?? 'Inconnu';
      map.set(c, (map.get(c) ?? 0) + 1);
    });
    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
    this.teamCountrySeries.set([{ name: 'Équipes', data: sorted.map(([, v]) => v) }]);
    this.teamCountryOptions.update((o: any) => ({ ...o, xaxis: { ...o.xaxis, categories: sorted.map(([k]) => k) } }));
  }
}
