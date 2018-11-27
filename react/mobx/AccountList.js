import React from 'react';
import { inject, observer } from 'mobx-react';
import WithLoading from './WithLoading';
import Account from './Account';
import "./AccountList.css";

@inject("accountStore", "transactionStore")
@observer class AccountList extends React.Component {
    computeBalance = (accountId) => {
        const { transactions } = this.props.transactionStore;

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
        const { accounts, activeAccountId } = this.props.accountStore;
        return (
            <div>
                {accounts.map((account, index) =>
                    <Account key={account.id}
                        isActive={account.id === activeAccountId}
                        account={account}
                        balance={this.computeBalance(account.id)}
                    />
                )}
            </div>
        );
    }
};

export default WithLoading(AccountList);