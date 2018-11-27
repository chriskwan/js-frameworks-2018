import React from 'react';
import { fetchAccounts } from '../services/AccountService';
import { fetchTransactions } from '../services/TransactionService';
import App from './App';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoggedIn: false,
            isLoading: true,
            accounts: [],
            activeAccountId: null,
            transactions: []
        };
    }

    async componentDidMount() {
        const accounts = await fetchAccounts();
        const transactions = await fetchTransactions();

        let activeAccountId = null;
        if (accounts.length) {
            activeAccountId = accounts[0].id;
        }

        this.setState({
            isLoading: false,
            accounts,
            activeAccountId,
            transactions
        });
    }

    handleLoginClick = (callback) => {
        this.setState({ isLoggedIn: true }, callback);
    }

    handleLogoutClick = () => {
        this.setState({ isLoggedIn: false });
    }

    handleTransactionListChange = (newTransactions) => {
        this.setState({ transactions: newTransactions });
    }
    
    handleToggleAccountActive = (activeAccountId) => {
        this.setState({ activeAccountId });
    }

    render() {
        return <App isLoggedIn={this.state.isLoggedIn}
            onLoginClick={this.handleLoginClick}
            onLogoutClick={this.handleLogoutClick}
            isLoading={this.state.isLoading}
            accounts={this.state.accounts}
            activeAccountId={this.state.activeAccountId}
            transactions={this.state.transactions}
            onTransactionListChange={this.handleTransactionListChange}
            onToggleAccountActive={this.handleToggleAccountActive}
        />
    }
}

export default AppContainer;
