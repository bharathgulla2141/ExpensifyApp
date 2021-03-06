import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            description : props.expense ? props.expense.description : '',
            note : props.expense ? props.expense.note : '',
            amount : props.expense ? (props.expense.amount / 100 ).toString() : '',
            createdAt : props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused : false,
            error : ''
        };
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
    };

    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState(() => ({description}));
    };

    onNoteChange(e) {
        const note = e.target.value;
        this.setState(() => ({note}));
    };

    onAmountChange(e) {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,5}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}));
        }    
    };

    onDateChange(createdAt) {
        if(createdAt){
            this.setState(() => ({createdAt}));
        }
    }

    onFocusChange({focused}) {
        this.setState(() => ({calendarFocused :focused}));
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({error:'Please provide description and amount'}));
        }
        else{
            this.setState(() => ({error:''}));
            this.props.onSubmit({
                description :this.state.description,
                amount : parseFloat(this.state.amount,10)*100,
                createdAt : this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>} 
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" placeholder="Description" autoFocus value={this.state.description} 
                        onChange={this.onDescriptionChange}/>

                    <input type="text" placeholder="Amount" value={this.state.amount}
                        onChange={this.onAmountChange.bind(this)}/>

                    <SingleDatePicker 
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange.bind(this)}
                        focused = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange.bind(this)}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />

                    <textarea placeholder="Add a Note for your expense" value={this.state.note}
                              onChange={this.onNoteChange.bind(this)}></textarea>

                    <button>Add Expense</button>

                </form>
            </div>
        );
    };
};

export default ExpenseForm;