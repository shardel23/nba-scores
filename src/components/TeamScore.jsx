import Card from "react-bootstrap/Card";

type Props = {
  score: string,
  isBold: boolean,
};

export default function TeamName({ score, isBold }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        fontWeight: isBold ? "bold" : "normal",
      }}
    >
      <Card.Text>{score}</Card.Text>
    </div>
  );
}
