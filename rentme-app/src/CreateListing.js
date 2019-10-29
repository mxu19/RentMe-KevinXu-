import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import addDays from "date-fns/addDays";
import { useHistory, Link } from "react-router-dom";
import Listing from "./Listing";

import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundImage:
        "url(" +
        "https://d39l2hkdp2esp1.cloudfront.net/img/photo/170256/170256_00_2x.jpg" +
        ")",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

export default function CreateListing() {
  const classes = useStyles();
  const newExpiryDate = addDays(new Date(), 7);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState(newExpiryDate);
  const [hasError, setError] = useState(false);
  const history = useHistory();
  const submitClick = h => e => {
    e.preventDefault();

    if (!name || price <= 0 || !imageUrl || !description || !expiryDate) {
      setError(true);
      return;
    }
    //api call post to create new listing
    fetch("/listings", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description,
        expiryDate: expiryDate
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => {
      if (r.ok) {
        alert("Listing has been created successfully. Click to proceed.");
        h.push("/home/dash");
      } else {
        setError(true);
      }
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Create
          </Typography>
          <Button color="inherit" component={Link} to="/home/dash">
            Back
          </Button>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <br />
      <Typography component="h1" variant="h5">
        Add a New Item
      </Typography>
      <Listing
        name={name}
        onNameChange={setName}
        price={price}
        onPriceChange={setPrice}
        imageUrl={imageUrl}
        onImageUrlChange={setImageUrl}
        description={description}
        onDescriptionChange={setDescription}
        expiryDate={expiryDate}
        onExpiryDateChange={setExpiryDate}
        hasError={hasError}
      />
      <br />
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={submitClick(history)}
      >
        SUBMIT
      </Button>
      <br />
      <br />
      {hasError && (
        <Typography variant="caption" color="error">
          Create listing failed, please check the details.
        </Typography>
      )}
    </div>
  );
}
