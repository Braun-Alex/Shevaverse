/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "/styles/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://drive.google.com/file/d/1XQCDywsDSh6584NI_X7VTda9fxx9Ju6n/view"
                className={classes.block}
                target="_blank"
              >
                Blockchain expertise
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                  href="https://goerli.etherscan.io/token/0x60c434e76c10bf5b1725a78b263a58ef0ada8f3b"
                  className={classes.block}
                  target="_blank"
              >
                Shevacoin contract
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://docs.google.com/document/d/1oVtju05hC2DRht2eyKsfOHRfO4MnyqpEdeMBB1zdqU8/edit"
                className={classes.block}
                target="_blank"
              >
                All tasks
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()}, made by Alex Braun
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
