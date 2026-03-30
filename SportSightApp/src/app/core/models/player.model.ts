import { Country } from './country.model';
import { Team } from './team.model';

export interface Position {
  id: number;
  name: string;
}

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  height: number;
  weight: number;
  preferredFoot: string;
  team: Team;
  country: Country;
  position: Position;
}
