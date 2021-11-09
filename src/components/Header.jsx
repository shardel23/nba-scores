import Button from "@mui/material/Button";
import { formatDate } from "../utils";

type Props = {
  date: Date,
  onBackClick: () => void,
  onNextClick: () => void,
};

const DATE_DISPLAY_FORMAT = "dd/mm/yyyy";

export default function Header(props: Props) {
  const tomorrowDate = new Date();
  tomorrowDate.setDate(props.date.getDate() + 1);
  const yesterdayDate = new Date();
  yesterdayDate.setDate(props.date.getDate() - 1);
  return (
    <div
      style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    >
      <Button onClick={props.onBackClick}>
        {formatDate(yesterdayDate, DATE_DISPLAY_FORMAT)}
      </Button>
      <div style={{ fontWeight: "bold", margin: "16px" }}>
        {formatDate(props.date, DATE_DISPLAY_FORMAT)}
      </div>
      <Button onClick={props.onNextClick}>
        {formatDate(tomorrowDate, DATE_DISPLAY_FORMAT)}
      </Button>
    </div>
  );
}
