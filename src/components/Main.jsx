import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import MySpinner from "./Spinner";
import Header from "./Header";
import { addDays, subDays } from "date-fns";
import { makeStyles, Grid } from "@material-ui/core";

import { GAMES_URL } from "../paths";
import { formatDate, getMatchTimestamp } from "../utils";

export default function Main() {
  const yesterday = subDays(new Date(), 1);
  const [date, setDate] = useState(yesterday);
  const [data, setData] = useState();
  const [sortedData, setSortedData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const formatedDate = formatDate(date, "yyyy-mm-dd");
    const url = new URL(GAMES_URL);
    url.searchParams.append("start_date", formatedDate);
    url.searchParams.append("end_date", formatedDate);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error(error);
        setIsFetching(false);
      });
  }, [date]);

  useEffect(() => {
    if (data !== undefined) {
      setSortedData(
        data.slice().sort((a, b) => {
          const timestampA = getMatchTimestamp(a.date, a.status);
          const timeStampB = getMatchTimestamp(b.date, b.status);
          if (timestampA > timeStampB) {
            return 1;
          }
          if (timestampA < timeStampB) {
            return -1;
          }
          return 0;
        })
      );
    }
  }, [data]);

  return sortedData === undefined || isFetching ? (
    <MySpinner />
  ) : (
    <>
      <Header
        date={date}
        onBackClick={() => {
          setDate(subDays(date, 1));
        }}
        onNextClick={() => {
          setDate(addDays(date, 1));
        }}
      />
      <div
        style={{
          margin: "24px 8px 0 8px",
        }}
      >
        <Grid container>
          {sortedData.map((game) => {
            return (
              <Grid item xs={12} md={6}>
                <GameCard key={game.id} gameDetails={game} date={date} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}
