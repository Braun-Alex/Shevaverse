import React, {useEffect} from "react";
import Router from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import {useMoralis} from "react-moralis";
import Pills from "/pages-sections/Components-Sections/SectionPills.js";

const useStyles = makeStyles(styles);

export default function PollsPage(props) {
  const {isAuthenticated} = useMoralis();
  const classes = useStyles();
  const {...rest} = props;
  useEffect(async () => {
      if (!isAuthenticated) await Router.push("/welcome");
      }, [isAuthenticated]);
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="The Shevaverse"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/login.webp')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
            <Pills />
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
