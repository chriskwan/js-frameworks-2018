import React from 'react';
import WithLoading from './WithLoading';
import Account from './Account';
import "./AccountList.css";

class AccountList extends React.Component {
    handleToggleAccountActive = (activeAccountId) => {
        const { onToggleAccountActive } = this.props;

        onToggleAccountActive(activeAccountId);
    }

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
            <div>
                {accounts.map((account, index) =>
                    <Account key={account.id}
                        isActive={account.id === activeAccountId}
                        account={account}
                        onToggleAccountActive={this.handleToggleAccountActive}
                        balance={this.computeBalance(account.id)}
                    />
                )}
            </div>
        );
    }
};

export default WithLoading(AccountList);