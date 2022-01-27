import {css} from "@emotion/react";
import React from "react";
import {Paper, useTheme} from "@mui/material";

const MainLayout: React.FC = (props) => {
  const theme = useTheme();
  const classes = {
    main: css`margin-top: 64px;
      height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    `,

    backgroundDiv: css`
      margin-top: -150px;
      width: 100%;
      height: 66%;
      max-height: 60vh;
      position: absolute;
      top: 0;
      left: 0;
      background: ${theme.palette.primary.main};
      transform: rotate(10deg) scale(1.1);
    `,

    paper: css`width: 800px;
      min-height: 480px;
      height: 80vh;
      max-height: 640px;
      padding: 8px 8px;
      z-index: 2;
    `
  }
  return <main css={classes.main}>
    <div css={classes.backgroundDiv}/>
    <Paper css={classes.paper}> {props.children}</Paper>
  </main>
};
export default MainLayout;