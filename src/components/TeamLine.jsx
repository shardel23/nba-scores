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
    <div style={{ display: "flex" }}>
      <div style={{ width: "10%" }}>
        <img
          src={getTeamIcon(teamName)}
          alt="logo"
          width="25px"
          height="25px"
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
          fontWeight: showScores && bold ? "bold" : "normal",
        }}
      >
        <Card.Text>{teamName}</Card.Text>
        <Card.Text>{!showScores ? "" : teamScore}</Card.Text>
      </div>
    </div>
  );
}
