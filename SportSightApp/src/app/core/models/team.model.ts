import { Country } from './country.model';

export interface Team {
  id: number;
  name: string;
  country: Country;
}
