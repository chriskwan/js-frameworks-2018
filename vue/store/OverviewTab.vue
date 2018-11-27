<template>
    <div id="overview-tab">
        <AccountList class="section-body" />
        <TransactionList class="section-body" :count="10" />
    </div>
</template>

<script>
import Store from "../Store";
import { fetchAccounts } from "../services/AccountService";
import { fetchTransactions } from "../services/TransactionService";
import AccountList from './AccountList';
import TransactionList from './TransactionList';

export default {
    components: {
        AccountList,
        TransactionList
    },
    data: function () {
        return {
            sharedState: Store.state
        };
    },
    mounted: async function () {
        this.sharedState.accounts = await fetchAccounts();

        if (this.sharedState.accounts.length) {
            this.sharedState.activeAccountId = this.sharedState.accounts[0].id;
        }

        this.sharedState.transactions = await fetchTransactions();

        this.sharedState.isLoading = false;
    }
}
</script>

<style scoped>
#overview-tab {
    display: flex;
    flex-wrap: wrap;
}
</style>