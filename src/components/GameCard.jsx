import Card from "react-bootstrap/Card";
import TeamLine from "./TeamLine";

import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  isInterestingGame,
  isLiveGame,
  getWinner,
  isNotStarted,
  convertToLocalTime,
} from "../utils";
import { useState } from "react";

type TeamDetails = {
  id: number,
  abbreviation: string,
  city: string,
  conference: string,
  division: string,
  full_name: string,
  name: string,
};

type GameDetails = {
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

type Props = {
  gameDetails: GameDetails,
  date: Date,
};

export default function GameCard({ gameDetails, date }: Props) {
  const [showScores, setShowScores] = useState(
    !isInterestingGame(
      gameDetails.status,
      gameDetails.period,
      gameDetails.home_team_score,
      gameDetails.visitor_team_score,
      gameDetails.home_team,
      gameDetails.visitor_team
    )
  );

  const winner = getWinner(
    gameDetails.status,
    gameDetails.home_team_score,
    gameDetails.visitor_team_score
  );

  return (
    <Card>
      <Card.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "65%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <TeamLine
                teamName={gameDetails.visitor_team.name}
                teamScore={gameDetails.visitor_team_score}
                showScores={showScores}
                bold={winner === -1}
              />
              <TeamLine
                teamName={gameDetails.home_team.name}
                teamScore={gameDetails.home_team_score}
                showScores={showScores}
                bold={winner === 1}
              />
            </div>
            {!showScores && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <VisibilityIcon
                  onClick={() => {
                    setShowScores(true);
                  }}
                />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              width: "30%",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: "1px solid rgba(0,0,0,.125)",
              color: isLiveGame(gameDetails.status) ? "#31a730" : "",
            }}
          >
            <Card.Text>
              {isNotStarted(gameDetails.status)
                ? convertToLocalTime(gameDetails.status)
                : gameDetails.status}
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
