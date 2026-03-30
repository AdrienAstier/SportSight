import { Team } from './team.model';
import { Player } from './player.model';

export interface Stadium {
  id: number;
  name: string;
  capacity: string;
}

export interface Season {
  id: number;
  name: string;
}

export interface Competition {
  id: number;
  name: string;
}

export interface EventType {
  id: number;
  name: string;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  stadium: Stadium;
  season: Season;
  competition: Competition;
  date: string;
}

export interface FactMatchSummary {
  id: number;
  match: Match;
  team: Team;
  possessionPct: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  fouls: number;
  corners: number;
  goals: number;
}

export interface FactEvent {
  id: number;
  match: Match;
  player: Player;
  team: Team;
  eventType: EventType;
  minute: string;
}
