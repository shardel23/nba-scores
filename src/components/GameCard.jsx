import Card from "react-bootstrap/Card";
import TeamIcon from "./TeamIcon";
import TeamName from "./TeamName";
import TeamScore from "./TeamScore";
import EyeIcon from "./EyeIcon";

import {
  isInterestingGame,
  isLiveGame,
  getWinner,
  isNotStarted,
  convertToLocalTime,
} from "../utils";
import { Winner, GameDetails } from "../types";
import { useState } from "react";

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
        <div // Entire Card
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div // Left Side
            style={{
              display: "flex",
              width: "65%",
              justifyContent: "space-between",
            }}
          >
            <div // Icons
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                width: "20%",
                height: "64px",
              }}
            >
              <TeamIcon teamName={gameDetails.visitor_team.name} />
              <TeamIcon teamName={gameDetails.home_team.name} />
            </div>
            <div // Team Names
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <TeamName
                name={gameDetails.visitor_team.name}
                isBold={showScores && winner === Winner.VISITOR}
              />
              <TeamName
                name={gameDetails.home_team.name}
                isBold={showScores && winner === Winner.HOME}
              />
            </div>
            {showScores ? (
              <div // Scores
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "20%",
                }}
              >
                <TeamScore
                  score={gameDetails.visitor_team_score}
                  isBold={winner === Winner.VISITOR}
                />
                <TeamScore
                  score={gameDetails.home_team_score}
                  isBold={winner === Winner.HOME}
                />
              </div>
            ) : (
              <EyeIcon
                onClick={() => {
                  setShowScores(true);
                }}
              />
            )}
          </div>
          <div // Right Side
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
