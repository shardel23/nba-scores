import Card from "react-bootstrap/Card";

type Props = {
  name: string,
  isBold: boolean,
};

export default function TeamName({ name, isBold }: Props) {
  return (
    <div
      style={{
        fontWeight: isBold ? "bold" : "normal",
      }}
    >
      <Card.Text>{name}</Card.Text>
    </div>
  );
}
