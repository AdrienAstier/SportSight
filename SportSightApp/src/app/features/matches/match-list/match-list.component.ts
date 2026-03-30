import { Component } from '@angular/core';

@Component({
  selector: 'app-match-list',
  standalone: true,
  template: `
    <div class="page-enter">
      <div class="page-header">
        <h1>Matchs</h1>
        <p>Historique et statistiques des matchs</p>
      </div>
      <div class="card" style="text-align:center; padding: 4rem 2rem;">
        <div class="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <h2 style="font-size:1.2rem;font-weight:600;color:white;margin:0 0 0.5rem">Bientôt disponible</h2>
        <p style="color:#94a3b8;font-size:0.875rem;max-width:400px;margin:0 auto;line-height:1.6">
          Cette section affichera l'historique complet des matchs avec les statistiques détaillées
          (buts, possession, tirs, passes...) une fois les endpoints disponibles dans l'API.
        </p>
      </div>
    </div>
  `,
  styles: [`.icon-wrap{width:64px;height:64px;background:rgba(59,130,246,.1);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;svg{width:32px;height:32px;color:#60a5fa;}}`],
})
export class MatchListComponent {}
