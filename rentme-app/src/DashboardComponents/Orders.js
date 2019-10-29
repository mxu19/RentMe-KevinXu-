/* eslint-disable no-script-url */

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const NewMessageDialog = ({ open, handleClose, messages, markAsRead }) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">New Messages</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {messages.map(msg => (
          <DialogContentText key={msg.id}>
            {msg.message}{" "}
            <Button onClick={() => markAsRead(msg.id)}>Mark As Read</Button>
          </DialogContentText>
        ))}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

const ListingHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>name</TableCell>
      <TableCell>price</TableCell>
      <TableCell>photo</TableCell>
      <TableCell>description</TableCell>
      <TableCell>expiry</TableCell>
      <TableCell align="center">Operations</TableCell>
    </TableRow>
  </TableHead>
);

const SendMessageDialog = ({ open, selectedItem, handleClose, handleData }) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Send a Message to us</DialogTitle>
    <DialogContent>
      <DialogContentText id="mes">
        {selectedItem && selectedItem.name}
      </DialogContentText>

      <input
        autoFocus
        margin="dense"
        id="message-to-send"
        label="Detail"
        style={{ width: "100%" }}
      ></input>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={() => handleData(selectedItem)} color="primary">
        Send
      </Button>
    </DialogActions>
  </Dialog>
);

const AdminListing = ({ items, archiveClick }) => (
  <Table size="small">
    <ListingHeader />
    <TableBody>
      {items.map(item => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>
            <img src={item.imageUrl} alt="error" width={50} />
          </TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{item.expiryDate}</TableCell>
          <TableCell align="right">
            <Button
              color="primary"
              component={Link}
              to={`/home/dash/edit/${item.id}`}
            >
              Update
            </Button>
            <Button color="primary" onClick={archiveClick(item.id)}>
              Archive
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const UserListing = ({ items, handleClickOpen }) => (
  <Table size="small">
    <ListingHeader />
    <TableBody>
      {items.map(item => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>
            <img src={item.imageUrl} alt="error" width={50} />
          </TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{item.expiryDate}</TableCell>
          <TableCell align="right">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClickOpen(item)}
              id="name"
            >
              Send a Message
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

class Orders extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    messages: [],
    selectedItem: null,
    open: false,
    userId: this.props.userId,
    userRole: this.props.userRole
  };

  componentDidMount() {
    const { userRole } = this.state;
    if (userRole === "admin") {
      this.loadMessages();
    }
    this.loadListings();
  }

  loadListings = () => {
    //view listings
    fetch("/listings")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  loadMessages = () => {
    //read messages
    fetch("/messages")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            messages: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  markAsRead = msgId => {
    //mark as read
    fetch(`/messages/${msgId}`, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => {
      this.loadMessages();
    });
  };

  handleClickOpen = item => {
    this.setState({
      open: true,
      selectedItem: item
    });
  };

  handleClickOpen2 = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, selectedItem: null });
  };

  handleData = selectedItem => {
    //send message
    const { userId } = this.state;
    const message = document.getElementById("message-to-send").value;
    fetch("/messages", {
      method: "POST",
      body: JSON.stringify({
        itemId: selectedItem.id,
        userId: userId,
        message: message
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.setState({ selectedItem: null, open: false });
  };

  archiveClick = listingId => e => {
    //archive listing
    e.preventDefault();
    fetch(`/listings/${listingId}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: listingId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => {
      this.loadListings();
    });
  };

  render() {
    const { error, isLoaded, items, open, selectedItem, messages } = this.state;
    if (error) {
      return <div> error</div>;
    } else if (!isLoaded) {
      return <div> loading</div>;
    } else if (this.props.userRole === "admin") {
      return (
        <React.Fragment>
          <Button color="primary" onClick={this.handleClickOpen2}>
            New Message
          </Button>
          <AdminListing items={items} archiveClick={this.archiveClick} />
          <NewMessageDialog
            open={open}
            handleClose={this.handleClose}
            messages={messages}
            markAsRead={this.markAsRead}
          />
          <Button color="primary" component={Link} to="/home/dash/create">
            Create
          </Button>
        </React.Fragment>
      );
    } else if (this.props.userRole === "") {
      // check authentication
      alert("Please Sign in!");
      return <Link to="/">Please Sign in</Link>;
    } else {
      return (
        <React.Fragment>
          <Title>Item List</Title>
          <UserListing items={items} handleClickOpen={this.handleClickOpen} />
          <SendMessageDialog
            selectedItem={selectedItem}
            open={open}
            handleClose={this.handleClose}
            handleData={this.handleData}
          />
        </React.Fragment>
      );
    }
  }
}

export default Orders;
