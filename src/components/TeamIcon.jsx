import { getTeamIcon } from "../logos";

type Props = {
  teamName: string,
};

export default function TeamIcon({ teamName }: Props) {
  return (
    <img src={getTeamIcon(teamName)} alt="logo" width="25px" height="25px" />
  );
}
