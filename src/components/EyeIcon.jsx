import VisibilityIcon from "@mui/icons-material/Visibility";

type Props = {
  onClick: (void) => void,
};

export default function EyeIcon({ onClick }: Props) {
  return (
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
        <VisibilityIcon onClick={onClick} />
      </div>
    </div>
  );
}
