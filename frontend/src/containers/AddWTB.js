import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { API } from "aws-amplify";

const styles = theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	},
	dense: {
		marginTop: 19
	},
	menu: {
		width: 200
	}
});
class AddWantToBuy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			title: "",
			description: "",
			category: "",
			rate: 0,
			rateQualifier: "",
			maxDuration: "",
			likeThisLink: "",
			expiration: null
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
	}
	async onSubmit() {
		await API.post("bets", "/bets", {
			body: this.state
		});
		this.setState({ open: false });
	}
	onChange(ev) {
		this.setState({ [ev.target.id]: ev.target.value });
	}

	handleClickOpen() {
		this.setState({ open: true });
	}

	handleClickClose() {
		this.setState({ open: false });
	}

	render() {
		const fields = ["title"];
		return (
			<div>
				<Dialog
					open={this.state.open}
					onClose={this.handleClickClose}
					aria-labelledby="form-dialog-title"
					fullWidth
				>
					<DialogTitle id="max-width-dialog-title">
						Place a new request
					</DialogTitle>
					<DialogContent>
						<TextField
							onChange={this.onChange}
							autoFocus
							fontSize="100px"
							margin="normal"
							id="title"
							label="Title"
							type="text"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							id="description"
							label="Description"
							type="email"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							id="rate"
							label="Rate"
							type="Rate to rent at"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							id="rateQualifier"
							label="Hour or Day?"
							type="text"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							id="category"
							label="Category"
							type="email"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							id="maxDuration"
							label="What is the maximum time you would need this for?"
							type="text"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							id="likeThisLink"
							label="Link to similiar item (optional)"
							type="text"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							id="expiration"
							label="Date Needed By"
							type="datetime-local"
							defaultValue="2019-03-01T10:30"
							InputLabelProps={{
								shrink: true
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClickClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.onSubmit} color="primary">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
				<Fab
					color="primary"
					aria-label="Add"
					onClick={this.handleClickOpen}
				>
					<AddIcon />
				</Fab>
			</div>
		);
	}
}

export default withStyles(styles)(AddWantToBuy);
