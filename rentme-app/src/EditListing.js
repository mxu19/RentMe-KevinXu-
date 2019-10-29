import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useHistory, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Listing from "./Listing";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      // backgroundColor: theme.palette.common.white
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

export default function EditListing() {
  const classes = useStyles();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [hasError, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch(`/listings/${id}`) //api call find listing
      .then(res => res.json())
      .then(r => {
        setName(r.name);
        setPrice(r.price);
        setImageUrl(r.imageUrl);
        setDescription(r.description);
        setExpiryDate(r.expiryDate);
      })
      .catch(function(error) {
        alert("Error fetching listing details, redirecting to dashboard.");
        history.push("/home/dash");
      });
  }, [id]);

  const submitClick = h => e => {
    e.preventDefault();

    if (!name || price <= 0 || !imageUrl || !description || !expiryDate) {
      setError(true);
      return;
    }
    fetch(`/listings/${id}`, {
      //api call put method to edit listing
      method: "PUT",
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
        alert("Listing has been updated successfully. Click to proceed.");
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
            Update
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
        Edit listing
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
        Submit
      </Button>
      <br />
      <br />
      {hasError && (
        <Typography variant="caption" color="error">
          Update listing failed, please check the details.
        </Typography>
      )}
    </div>
  );
}
