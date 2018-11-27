<template>
    <div id="overview-tab">
        <AccountList class="section-body"
            :isLoading="isLoading"
            :accounts="accounts"
            :activeAccountId="activeAccountId"
            :transactions="transactions"
            @toggle-account-active="toggleAccountActive" />
        <TransactionList class="section-body"
            :isLoading="isLoading"
            :activeAccountId="activeAccountId"
            :accounts="accounts"
            :transactions="transactions"
            :count="10"
            @update-transactions="updateTransactions"
            @remove-transaction="removeTransaction" />
    </div>
</template>

<script>
import { fetchAccounts } from "../services/AccountService";
import { fetchTransactions } from "../services/TransactionService";
import AccountList from './AccountList';
import TransactionList from './TransactionList';

let accounts = [];
let transactions = [];

export default {
    components: {
        AccountList,
        TransactionList
    },
    data: function () {
        return {
            isLoading: true,
            activeAccountId: null,
            accounts,
            transactions,
        }
    },
    mounted: async function () {
        this.accounts = await fetchAccounts();

        if (this.accounts.length) {
            this.activeAccountId = this.accounts[0].id;
        }

        this.transactions = await fetchTransactions();

        this.isLoading = false;
    },
    methods: {
        toggleAccountActive: function (accountId) {
            this.activeAccountId = accountId;
        },
        updateTransactions: function (newTransactions) {
            this.transactions = newTransactions;
        },
        removeTransaction: function (transaction) {
            this.transactions = this.transactions.filter(t => t.id !== transaction.id);
        }
    }
}
</script>

<style scoped>
#overview-tab {
    display: flex;
    flex-wrap: wrap;
}
</style>