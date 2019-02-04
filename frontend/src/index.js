import React from 'react';
import ReactDOM from 'react-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import BetForm from './bet_form.js'

function createData(id, title, bet, time_accept, time_end, long_description, verifiers) {
  return { id, title, bet, time_accept, time_end, long_description, verifiers };
}
const bets = [
  	createData(1, 'Anthony Davis to the Lakers', 50, '4 days', '12 days', 'Anthony Davis will be a LA Laker before the trade deadline.', '0 / 3'),
  	createData(2, 'Beer commercials in Superbowl', 25, '6 hours', '1 day', 'There will be more than 10 beer commercials during the Superbowl. (From kickoff til the end of the game)', '1 / 2'),
];


console.log(bets)

class BetTable extends React.Component {
  	constructor(props){
  		super(props)
  		this.state = {rows: bets}
  	}
	render() { 
	  return (
	    <Table>
	        <TableHead>
	          <TableRow>
	            <TableCell>Title</TableCell>
	            <TableCell align="right">Bet</TableCell>
	            <TableCell align="right">Time to Accept / Verify</TableCell>
	            <TableCell align="right">Verifiers</TableCell>
	            <TableCell align="right">Expand</TableCell>
	          </TableRow>
	        </TableHead>
	        <TableBody>
	          {this.state.rows.map(bet => (
	            <BetRow row={bet} />
	          ))}
	        </TableBody>
	      </Table>
	  );
	}
}

class BetRow extends React.Component {
	constructor(props){
		super(props)
		this.state = {isClicked: false};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState(state => ({
      		isClicked: !state.isClicked
    	}));
	}
	render() {
		return (
	          	<TableRow key={this.props.row.id} onClick={this.handleClick}>
	          		<TableCell component="th" scope="row">{this.props.row.title}</TableCell>
	          		<TableCell align="right">{this.props.row.bet}</TableCell>
	          		<TableCell align="right">{this.props.row.time_accept} / {this.props.row.time_end}</TableCell>
	          		<TableCell align="right">{this.props.row.verifiers}</TableCell>
	          		<TableCell align="right"><BetForm row={this.props.row}/></TableCell>
          		</TableRow>
		);
	}
}



ReactDOM.render(<BetTable/>, document.querySelector('#root'));


