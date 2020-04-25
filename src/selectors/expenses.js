import moment from 'moment'

const getVisibleExpense =  (expenses,{text,sortBy,startDate,endDate}) => {
    return expenses.filter((expense) => {
        const craetedAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(craetedAtMoment,'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(craetedAtMoment,'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        startDateMatch 
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

export default getVisibleExpense;