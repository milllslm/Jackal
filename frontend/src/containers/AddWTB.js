
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
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
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
			likeThisLink: "N/A",
			expiration: null,
			defaultExpiration: null
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.changeRateQualifier= this.changeRateQualifier.bind(this);
	}

	componentDidMount() {
		// format = 2019-03-01T10:30
		let date = new Date();
		date.setDate(date.getDate()+7);
		let month = date.getMonth();
		if (month < 10)
			month = `0${month}`
			console.log(month)
		let day = date.getDate();
		if (day < 10)
			day = `0${day}`
		let hour = date.getHours();
		if (hour < 10)
			hour = `0${hour}`
		let minutes = date.getMinutes();
		if (minutes < 10)
			minutes = `0${minutes}`	
		let dateString = `${date.getFullYear()}-${month}-${day}T${hour}:${minutes}`
		this.setState({defaultExpiration: dateString});
		console.log(dateString)

	}
	async onSubmit() {
		if (this.state.likeThisLink === "")
			this.setState({ likeThisLink: "None" });
		await API.post("bets", "/bets", {
			body: this.state
		});
		await this.props.setCategory("All")
		this.setState({ open: false });
	}
	onChange(ev) {
		this.setState({ [ev.target.id]: ev.target.value });
	}

	changeCategory(ev){
		console.log(ev.target);
		this.setState({category: ev.target.value});
	}

	changeRateQualifier(ev){
		console.log(ev.target);
		this.setState({rateQualifier: ev.target.value});
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
						<FormControl style={{minWidth: 500}}>
          				<InputLabel htmlFor="rateQualifier">Per</InputLabel>
						<Select
							value={this.state.rateQualifier}
							onChange={this.changeRateQualifier}
							inputProps={{
								name: "rateQualifier",
								id: "rateQualifier"
							}}
						>
							<MenuItem value="Hour">
								<em>Hour</em>
							</MenuItem>
							<MenuItem value="Day">Day</MenuItem>
						</Select>
						</FormControl>
						<TextField
							onChange={this.onChange}
							id="maxDuration"
							label="How long do you need the item?"
							type="text"
							fullWidth
						/>
						 <FormControl style={{minWidth: 500}}>
          				<InputLabel htmlFor="category">Category</InputLabel>
						<Select
							value={this.state.category}
							onChange={this.changeCategory}
							inputProps={{
								name: "Category",
								id: "category"
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value="Sports">Sports</MenuItem>
							<MenuItem value="VideoGames">Video Games</MenuItem>
							<MenuItem value="Electronics">Electronics</MenuItem>
							<MenuItem value="Apparel">Apparel</MenuItem>
							<MenuItem value="Accessories">Accessories</MenuItem>
							<MenuItem value="Transportation">Transportation</MenuItem>
							<MenuItem value="Outdoors">Outdoors</MenuItem>
							<MenuItem value="FoodandDrinks">Food and Drinks</MenuItem>
						</Select>
						</FormControl>
						<TextField
							onChange={this.onChange}
							id="expiration"
							label="Date Needed By"
							type="datetime-local"
							defaultValue={this.state.defaultExpiration}
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
