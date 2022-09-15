import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";
import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function AboutPage(props) {
  const classes = useStyles();
  const {...rest} = props;
  return (
    <div>
      <Header
        color="transparent"
        brand="The Shevaverse"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter responsive image="/img/team.webp">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Shevaverse is you</h1>
              <h4>
                Shevaverse based on Goerli Ethereum Testnet with Proof-of-Stake consensus mechanism
              </h4>
              <br />
              <Button
                color="rose"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the whitepaper
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
