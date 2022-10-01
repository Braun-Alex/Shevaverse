import React, {useState, useEffect} from "react";
import Router from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {WhereToVoteRounded, InfoRounded, ContactsRounded, AccountCircleRounded} from "@material-ui/icons";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";
import {useMoralis} from "react-moralis";
import Moralis from "moralis-v1";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const {isAuthenticated, authenticate, user, logout} = useMoralis();
  const [username, setUsername] = useState("Connect wallet");
  useEffect(async() => {
      if (isAuthenticated) {
          const web3Provider = await Moralis.enableWeb3();
          await web3Provider.getSigner().getAddress().then((address) => setUsername(address));
      }
      else setUsername("Connect wallet");
  }, [isAuthenticated]);
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem}>
            <Button
                onClick={() => {Router.push("/polls")}}
                color="transparent"
                disabled={!isAuthenticated}
                target="_blank"
                className={classes.navLink}
            >
                <WhereToVoteRounded className={classes.icons} /> Polls
            </Button>
        </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => {Router.push("/about");}}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <InfoRounded className={classes.icons}>unarchive</InfoRounded> About Shevacoin
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => {Router.push("/contacts");}}
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <ContactsRounded className={classes.icons} /> Contacts
        </Button>
      </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                onClick={async () => {
                    if (!isAuthenticated) await authenticate({
                        signingMessage: "Connecting wallet to the Web3 voting"
                    });
                    else await logout();
                }}
                color="transparent"
                target="_blank"
                className={classes.navLink}
            >
                <AccountCircleRounded className={classes.icons} /> {username}
            </Button>
        </ListItem>
    </List>
  );
}
