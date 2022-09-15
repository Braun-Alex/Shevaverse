/*eslint-disable*/
import React from "react";
import Link from "next/link";
import Router from "next/router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { AccountCircleRounded, InfoRounded, Contacts } from "@material-ui/icons";

// core components
import CustomDropdown from "/components/CustomDropdown/CustomDropdown.js";
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => {Router.push("/about");}}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <InfoRounded className={classes.icons}>unarchive</InfoRounded> About
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => {Router.push("/contacts")}}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Contacts className={classes.icons} /> Contacts
        </Button>
      </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                onClick={() => {Router.push("/login")}}
                color="transparent"
                target="_blank"
                className={classes.navLink}
            >
                <AccountCircleRounded className={classes.icons} /> Login
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                color="rose"
                target="_blank"
                className={classes.navLink}
            >
                Connect wallet
            </Button>
        </ListItem>
    </List>
  );
}
