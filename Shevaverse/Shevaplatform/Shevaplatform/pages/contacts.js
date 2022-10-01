import React from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import Button from "/components/CustomButtons/Button.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";
import styles from "/styles/jss/nextjs-material-kit/pages/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const {...rest} = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <Header
        color="transparent"
        brand="The Shevaverse"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image="/img/contacts.jpg" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src="/img/faces/portrait.jpg"
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Alex Braun</h3>
                    <h6>STUDENT</h6>
                    <Button href="https://www.linkedin.com/in/oleksii-stepaniuk-183b59249" justIcon link className={classes.margin5}>
                      <i className={"fab fa-linkedin"} />
                    </Button>
                      <Button href="https://www.instagram.com/lamanasakasa" justIcon link className={classes.margin5}>
                          <i className={"fab fa-instagram"} />
                      </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                  The world always changes. Web3 called also Decentralized Web
                  is already here. It is new technological era which consists of
                  artificial intelligence, machine learning and blockchain technology
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
