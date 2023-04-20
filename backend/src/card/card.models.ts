export interface Card {
  title: string;
  description: string;
}

export interface CardDto extends Card {
  id: number;
}
