const INTEREST_DIFF = 5;
const LIVE_GAME_STATUS_OPTIONS = [
  "1st Qtr",
  "2nd Qtr",
  "Halftime",
  "3rd Qtr",
  "4th Qtr",
];

export function getMatchTimestamp(date, status) {
  if (!isNotStarted(status)) {
    return 0;
  }
  const time = status;
  const ampm = time.split(" ")[1];
  const hours = (parseInt(time.split(":")[0]) + (ampm === "PM" ? 12 : 0)) % 24;
  const minutes = time.split(" ")[0].split(":")[1];
  const str = date.split("T")[0] + "T" + hours + ":" + minutes + ":00.000Z";
  const res = Date.parse(str);
  return res;
}

export function convertToLocalTime(startTime) {
  const time = startTime.split(" ")[0];
  let hours = parseInt(time.split(":")[0]);
  const minutes = time.split(":")[1];
  const ampm = startTime.split(" ")[1];
  if (ampm === "PM") {
    if (hours === 12) {
      hours = 0;
    } else {
      hours += 12;
    }
  }
  let israelHours = hours + 6;
  israelHours %= 24;
  return israelHours + ":" + minutes;
}

export function isNotStarted(gameStatus) {
  return !isLiveGame(gameStatus) && gameStatus !== "Final";
}

export function isInterestingGame(
  status,
  period,
  homeTeamScore,
  awayTeamScore,
  homeTeam,
  awayTeam
) {
  if (status !== "Final") {
    return false;
  }
  if (homeTeam.name === "Wizards" || awayTeam.name === "Wizards") {
    return true;
  }
  if (period > 4) {
    return true;
  }
  if (Math.abs(homeTeamScore - awayTeamScore) <= INTEREST_DIFF) {
    return true;
  }
  return false;
}

/**
 * 0 - No winner
 * 1 - Home team won
 * -1 - Away team won
 */
export function getWinner(status, homeTeamScore, awayTeamScore) {
  if (status !== "Final") {
    return 0;
  }
  if (homeTeamScore > awayTeamScore) {
    return 1;
  }
  return -1;
}

export function isLiveGame(status) {
  return LIVE_GAME_STATUS_OPTIONS.includes(status);
}

export function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yyyy|yy/gi, (matched) => map[matched]);
}
