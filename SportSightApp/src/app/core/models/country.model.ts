export interface Continent {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  continent: Continent;
}
