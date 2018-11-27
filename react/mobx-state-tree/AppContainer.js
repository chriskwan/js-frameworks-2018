import React from 'react';
import { fetchAccounts } from '../services/AccountService';
import { fetchTransactions } from '../services/TransactionService';
import { Provider } from 'mobx-react';
import AppStore from '../stores/AppStore';
import App from './App';
import makeInspectable from 'mobx-devtools-mst';

const store = AppStore.create();
makeInspectable(store);

class AppContainer extends React.Component {
    async componentDidMount() {
        const accounts = await fetchAccounts();
        const transactions = await fetchTransactions();

        let activeAccountId = null;
        if (accounts.length) {
            activeAccountId = accounts[0].id;
        }

        store.ui.toggleLoading(false);
        store.account.setAccounts(accounts);
        store.account.setActiveAccountId(activeAccountId);
        store.transaction.setTransactions(transactions);
    }

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default AppContainer;
