export type Url = {
  id?: string;
  createdAt?: string;
  codePoints: string;
  teenyCode: string;
  longUrl: string;
  shortrl: string;
  hits: number;
};

export type TopEmoji = Record<string, number>;
