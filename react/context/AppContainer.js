import React from 'react';
import { fetchAccounts } from '../services/AccountService';
import { fetchTransactions } from '../services/TransactionService';
import App from './App';

export const UIContext = React.createContext();
export const AccountContext = React.createContext();
export const TransactionContext = React.createContext();

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            isLoggedIn: false,
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

    render() {
        return (
            // NOTE: setting the value this way may cause unnecessary re-renders (https://reactjs.org/docs/context.html#caveats)
            // but fixing that might be a premature optimization
            // To get around that, we could also have context live in a separate Provider file
            // and pass the whole state as the value (https://alligator.io/react/context-api/)
            <UIContext.Provider value={{
                isLoading: this.state.isLoading,
                isLoggedIn: this.state.isLoggedIn,
                handleLoginClick: (callback) => {
                    this.setState({ isLoggedIn: true }, callback);
                },
                handleLogoutClick: () => {
                    this.setState({ isLoggedIn: false });
                }
            }}>
                <AccountContext.Provider value={{
                    accounts: this.state.accounts,
                    activeAccountId: this.state.activeAccountId,
                    handleToggleAccountActive: (activeAccountId) => {
                        this.setState({ activeAccountId });
                    }
                }}>
                    <TransactionContext.Provider value={{
                        transactions: this.state.transactions,
                        handleTransactionListChange: (newTransactions) => {
                            this.setState({ transactions: newTransactions });
                        }
                    }}>
                        <App />
                    </TransactionContext.Provider>
                </AccountContext.Provider>
            </UIContext.Provider>
        );
    }
}

export default AppContainer;
