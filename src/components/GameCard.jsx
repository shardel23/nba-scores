import Card from "react-bootstrap/Card";
import { getTeamIcon } from "../logos";

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
              <img
                src={getTeamIcon(gameDetails.visitor_team.name)}
                alt="logo"
                width="25px"
                height="25px"
              />
              <img
                src={getTeamIcon(gameDetails.home_team.name)}
                alt="logo"
                width="25px"
                height="25px"
              />
            </div>
            <div // Team Names
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <div
                style={{
                  fontWeight: showScores && winner === -1 ? "bold" : "normal",
                }}
              >
                <Card.Text>{gameDetails.visitor_team.name}</Card.Text>
              </div>
              <div
                style={{
                  fontWeight: showScores && winner === 1 ? "bold" : "normal",
                }}
              >
                <Card.Text>{gameDetails.home_team.name}</Card.Text>
              </div>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    fontWeight: winner === -1 ? "bold" : "normal",
                  }}
                >
                  <Card.Text>{gameDetails.visitor_team_score}</Card.Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    fontWeight: winner === 1 ? "bold" : "normal",
                  }}
                >
                  <Card.Text>{gameDetails.home_team_score}</Card.Text>
                </div>
              </div>
            ) : (
              <div // Eye Icon
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "20%",
                }}
              >
                <div // Cursor
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    cursor: "pointer",
                  }}
                >
                  <VisibilityIcon
                    onClick={() => {
                      setShowScores(true);
                    }}
                  />
                </div>
              </div>
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
