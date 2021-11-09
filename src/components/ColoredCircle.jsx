import "./ColoredCircle.css";

export default function ColoredCircle({ color }) {
  const styles = { backgroundColor: color };

  return color ? <span className="colored-circle" style={styles} /> : null;
}
