import React from 'react';
import { fetchAccounts } from '../services/AccountService';
import { fetchTransactions } from '../services/TransactionService';
import { Provider } from 'mobx-react';
import UIStore from '../stores/UIStore';
import AccountStore from '../stores/AccountStore';
import TransactionStore from '../stores/TransactionStore';
import App from './App';

const uiStore = new UIStore();
const accountStore = new AccountStore();
const transactionStore = new TransactionStore();

class AppContainer extends React.Component {
    async componentDidMount() {
        const accounts = await fetchAccounts();
        const transactions = await fetchTransactions();

        let activeAccountId = null;
        if (accounts.length) {
            activeAccountId = accounts[0].id;
        }

        uiStore.toggleLoading(false);
        accountStore.setAccounts(accounts);
        accountStore.setActiveAccountId(activeAccountId);
        transactionStore.setTransactions(transactions);
    }

    render() {
        return (
            <Provider uiStore={uiStore} accountStore={accountStore} transactionStore={transactionStore}>
                <App />
            </Provider>
        );
    }
}

export default AppContainer;
