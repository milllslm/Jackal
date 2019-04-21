
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { API } from "aws-amplify";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";


// accept card: betId as path, other user id as data field
// 

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
class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			firstName: "",
			lastName: "",
			school: "",
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
	}


	async componentDidMount() {
		this.setState({
			open: false,
			firstName: this.props.user === null ? "" : this.props.user.firstName,
			lastName: this.props.user === null ? "" : this.props.user.lasttName,
			school: this.props.user === null ? "" : this.props.user.school,
		});
	}

	async onSubmit() {
		await API.put("bets", "/updateUserProfile", {
			body: this.state
		});
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
		return (
			<div>
				<Dialog
					open={this.state.open}
					onClose={this.handleClickClose}
					aria-labelledby="form-dialog-title"
					fullWidth
				>
					<DialogTitle id="max-width-dialog-title">
						Edit Profile
					</DialogTitle>
					<DialogContent>
						<TextField
							onChange={this.onChange}
							autoFocus
							fontSize="100px"
							margin="normal"
							id="firstName"
							label="First Name"
							type="text"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							fontSize="100px"
							margin="normal"
							id="lastName"
							label="Last Name"
							type="text"
							fullWidth
						/>
						<TextField
							onChange={this.onChange}
							fontSize="100px"
							margin="normal"
							id="school"
							label="College"
							type="text"
							fullWidth
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
				<Button
                key={5}
                variant="outlined"
                size="large"
                onClick={this.handleClickOpen}
              >
                Edit Profile
              </Button>
			</div>
		);
	}
}

export default withStyles(styles)(EditProfile);
