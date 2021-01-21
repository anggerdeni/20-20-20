import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";

// utils
import pad from "../utils/pad";
import max from "../utils/max";

// images
import alarmImg from "../images/alarm.svg";

// styles
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "fit-content",
    width: "fit-content",
  },
  content: {
    position: "absolute",
    alignSelf: "center",
  },
  timerText: {
    color: "#212121",
    fontFamily: "VT323",
    textAlign: "center",
    fontSize: "min(max(1.5rem, 4vw), 100px)",
  },
  startButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  resetButton: {
    padding: "0",
    margin: "0",
    fontFamily: "VT323",
    color: "#fff",
    backgroundColor: "#212121",
    textAlign: "center",
    "&:hover": {
      color: "#212121",
      backgroundColor: "#c1c1c1",
      cursor: "pointer",
    },
  },
});

const secondsToDisplayTime = (s) => {
  var minute = Math.floor(s / 60);
  var seconds = s % 60;

  minute = minute.toString();
  seconds = seconds.toString();

  return `${pad(minute, 2)}:${pad(seconds, 2)}`;
};

const Alarm = () => {
  const classes = useStyles();
  const [start, setStart] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [seconds, setSeconds] = useState(1200);
  const [countDownInterval, setCountDownInterval] = useState(null);
  const duration = 10; // 20 minutes

  useEffect(() => {
    setSeconds(duration);
    if (start) {
      setCountDownInterval(
        setInterval(() => {
          setSeconds(calculateTimeLeft());
        }, 1000)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    if (seconds <= 0) {
      timesUp();
    }
  }, [seconds]);

  const calculateTimeLeft = () => {
    return max(duration - Math.floor((Date.now() - timestamp) / 1000), 0);
  };

  const beginTimer = () => {
    setTimestamp(Date.now());
    setStart(true);
  };

  const resetTimer = () => {
    clearInterval(countDownInterval);
    setStart(false);
  };

  const timesUp = () => {
    console.log("time is up");
    console.log("todo: ring a bell");
    console.log("todo: reset timer");
    console.log("todo: relax countdown?");
  };

  const renderStartButton = () => {
    return (
      <Typography
        className={`${classes.timerText} ${classes.startButton}`}
        variant="h3"
        onClick={() => beginTimer()}
      >
        START
      </Typography>
    );
  };

  const renderCountDown = () => {
    return (
      <>
        <Typography className={classes.timerText} variant="h3">
          {secondsToDisplayTime(seconds)}
        </Typography>
        <Typography
          className={classes.resetButton}
          variant="h6"
          onClick={() => resetTimer()}
        >
          RESET
        </Typography>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {start ? renderCountDown() : renderStartButton()}
      </div>
      <img src={alarmImg} alt="Alarm" />
    </div>
  );
};

export default Alarm;
