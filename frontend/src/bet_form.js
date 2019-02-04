import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'


export default class BetForm extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" size="small" onClick={this.handleClickOpen}>
          Expand
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Bet Info</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p><b>Title:</b> { this.props.row.title } </p>
              <p><b>Description:</b> { this.props.row.long_description }</p>
              <p><b>Offer:</b> { this.props.row.bet }</p>
              <p><b>Deadline to Accept:</b> { this.props.row.time_accept }</p>
              <p><b>Verify Deadline:</b> { this.props.row.time_end }</p>
              <p><b>Verifiers:</b> { this.props.row.verifiers }</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Doubt It
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Verify
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}