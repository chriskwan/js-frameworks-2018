export default {
    state: {
        isLoading: true,
        activeAccountId: null,
        accounts: [],
        transactions: [],
    },
    toggleAccountActive: function (accountId) {
        this.state.activeAccountId = accountId;
    },
    updateTransactions: function (newTransactions) {
        this.state.transactions = newTransactions;
    },
    removeTransaction: function (transaction) {
        this.state.transactions = this.state.transactions.filter(t => t.id !== transaction.id);
    }
};