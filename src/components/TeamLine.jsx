import { getTeamIcon } from "../logos";
import Card from "react-bootstrap/Card";

type Props = {
  teamName: string,
  teamScore: number,
  showScores: boolean,
  bold: boolean,
};

export default function TeamLine({
  teamName,
  teamScore,
  showScores,
  bold,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: showScores && bold ? "bold" : "normal",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          width: "20%",
        }}
      >
        <img
          src={getTeamIcon(teamName)}
          alt="logo"
          width="25px"
          height="25px"
        />
      </div>
      <div
        style={{
          width: "60%",
        }}
      >
        <Card.Text>{teamName}</Card.Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          width: "20%",
        }}
      >
        <Card.Text>{!showScores ? "" : teamScore}</Card.Text>
      </div>
    </div>
  );
}
