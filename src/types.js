export const Winner = {
  VISITOR: -1,
  HOME: 1,
  NONE: 0,
};

export type TeamDetails = {
  id: number,
  abbreviation: string,
  city: string,
  conference: string,
  division: string,
  full_name: string,
  name: string,
};

export type GameDetails = {
  id: number,
  date: string,
  home_team: TeamDetails,
  home_team_score: number,
  period: number,
  postseason: boolean,
  season: number,
  status: string,
  time: string,
  visitor_team: TeamDetails,
  visitor_team_score: number,
};
