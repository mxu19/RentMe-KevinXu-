import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import LayersIcon from "@material-ui/icons/Layers";

import { useHistory } from "react-router-dom";

export default function MainListItems(props) {
  const history = useHistory();
  const logOutClick = h => e => {
    e.preventDefault();

    fetch("/logout", {
      //log out
      method: "POST"
    })
      .then(r => {
        console.log("User has successfully logged out.");
      })
      .catch(function(e) {
        console.log("Error incurred while logging out.", e);
      })
      .then(function() {
        // Reset user role state
        props.setUserRole("");
        // Redirect user to login page
        h.push("/");
      });
  };

  return (
    <div>
      <ListItem button onClick={logOutClick(history)}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </ListItem>
    </div>
  );
}

export const secondaryListItems = <div></div>;
