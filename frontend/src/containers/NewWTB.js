import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



export default class WTB_Button extends Component {
	constructor(props) {
		 super(props);
		 this.state = { first: "", last: "", open: false };
		 this.onSubmit = this.onSubmit.bind(this);
		 this.onChange = this.onChange.bind(this);
		 this.handleClickOpen = this.handleClickOpen.bind(this);
		 this.handleClickClose = this.handleClickClose.bind(this);
	 }
	 onSubmit() {
	 	alert("done");
	 }
	 onChange(ev) {
	 	this.setState({ [ev.target.name]: ev.target.value });
	 }
	 render() {
		 return (
			 <div>
			 <input onChange={this.onChange} name="first" value={this.state.first} />
			 <input onChange={this.onChange} name="last" value={this.state.last} />
			 <button onClick={this.onSubmit}>Submit</button>
			 </div>
		 );
	 }

	handleClickOpen = () => {
    	this.setState({ open: true });
  	};

  	handleClickClose = () => {
    	this.setState({ open: false });
  	};

	render() {
		const fields = ['title', ]
		return (
			<div>
			<Dialog
          		open={this.state.open}
          		onClose={this.handleClickClose}
          		aria-labelledby="form-dialog-title"
          		fullWidth
        	>
        	<DialogTitle id="max-width-dialog-title">Place a new request</DialogTitle>
        	<DialogContent>
	        	<TextField
	              autoFocus
	              margin="dense"
	              id="title"
	              label="Title"
	              type="email"
	              fullWidth
	            />

        	</DialogContent>
        	<DialogActions>
	            <Button onClick={this.handleClickClose} color="primary">
	              Cancel
	            </Button>
            </DialogActions>
            </Dialog>
				<Fab color="primary" aria-label="Add" onClick={this.handleClickOpen}>
        			<AddIcon />
      			</Fab>
			</div>
		);
	}


}