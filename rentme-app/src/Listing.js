import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function Listing(props) {
  const classes = useStyles();

  return (
    <>
      <TextField
        id="itemname"
        label="Name"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={props.name}
        onChange={e => props.onNameChange(e.target.value)}
        error={props.hasError}
      />
      <TextField
        id="itemprice"
        label="Price"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={props.price}
        onChange={e => props.onPriceChange(e.target.value)}
        error={props.hasError}
      />
      <br />
      <TextField
        id="itemimg"
        label="Img's url"
        multiline
        rows="4"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={props.imageUrl}
        onChange={e => props.onImageUrlChange(e.target.value)}
        error={props.hasError}
      />
      <TextField
        id="itemdesc"
        label="Description"
        multiline
        rows="4"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={props.description}
        onChange={e => props.onDescriptionChange(e.target.value)}
        error={props.hasError}
      />
      <br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="outlined"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label="Expiry date"
          value={props.expiryDate}
          onChange={props.onExpiryDateChange}
          error={props.hasError}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}
