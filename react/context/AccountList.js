import React from 'react';
import { AccountContext } from './AppContainer';
import WithLoading from './WithLoading';
import Account from './Account';
import "./AccountList.css";

class AccountList extends React.Component {
    computeBalance = (accountId) => {
        const {transactions} = this.props;

        const transactionsForAccount = transactions.filter(
            t => t.accountId === accountId);

        const balance = transactionsForAccount.reduce(
            (acc, tran) => {
                let sum;
                if (tran.type === "Deposit") {
                    sum = acc + tran.amount;
                } else if (tran.type === "Withdrawal") {
                    sum = acc - tran.amount;
                }
                return sum;
            },
            0
        );
        return balance;
    }

    render() {
        const { accounts, activeAccountId } = this.props;

        return (
            <AccountContext.Consumer>{
                ({ handleToggleAccountActive }) => {
                    return (
                        <div>
                            {accounts.map((account, index) =>
                                <Account key={account.id}
                                    isActive={account.id === activeAccountId}
                                    account={account}
                                    onToggleAccountActive={handleToggleAccountActive}
                                    balance={this.computeBalance(account.id)}
                                />
                            )}
                        </div>
                    );
                }
            }</AccountContext.Consumer>
        );
    }
};

export default WithLoading(AccountList);