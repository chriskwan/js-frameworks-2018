import React from 'react';
import { connect } from 'react-redux';
import { fetchAccounts } from '../services/AccountService';
import { fetchTransactions } from '../services/TransactionService';
import App from './App';
import { setActiveAccount, toggleLoading, addAccounts, addTransactions } from '../actions';

class AppContainer extends React.Component {
    async componentDidMount() {
        const accounts = await fetchAccounts();
        const transactions = await fetchTransactions();

        let activeAccountId = null;
        if (accounts.length) {
            activeAccountId = accounts[0].id;
        }

        //cwkTODO use thunks and do these separately?
        this.props.dispatch(toggleLoading(false));
        this.props.dispatch(setActiveAccount(activeAccountId));
        this.props.dispatch(addAccounts(accounts));
        this.props.dispatch(addTransactions(transactions));
    }

    render() {
        return <App />;
    }
}

AppContainer = connect()(AppContainer);
export default AppContainer;
