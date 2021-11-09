export function getTeamIcon(teamName) {
  const logo = require("./res/icons/" +
    teamName.toLowerCase() +
    ".png").default;
  return logo;
}
