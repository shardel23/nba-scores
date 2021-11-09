import Spinner from "react-bootstrap/Spinner";

export default function MySpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30%",
      }}
    >
      <Spinner animation="border" role="status" />
    </div>
  );
}
