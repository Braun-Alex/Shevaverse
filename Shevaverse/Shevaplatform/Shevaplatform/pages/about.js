import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";
import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import StreamClient from "streamr-client";
import Router from "next/router";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function AboutPage(props) {
  const classes = useStyles();
  const {...rest} = props;
  const [price, setPrice] = useState("0");
  const streamr = new StreamClient({
        auth: {
            privateKey: process.env.NEXT_PUBLIC_ETHEREUM_PRIVATE_KEY
        }
  });
  const connection = streamr.subscribe("binance-streamr.eth/ETHUSDT/ticker", (data) => {
        setPrice(data.bestAskPrice);
  });
  Router.events.on("routeChangeStart", () => {
        connection.then(async (subscription) => {
            await subscription.unsubscribe();
        });
  });
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
              <h1 className={classes.title}>Shevacoin is Web3 e-voting token</h1>
              <h4>
                Shevacoin is ERC-20 token based on Ethereum blockchain. Total
                  supply: 1834 SHEVA. 1 SHEVA = 0.1834 ETH. ETH price: ${price}
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
