<template>
    <div id="overview-tab">
        <AccountList class="section-body" />
        <TransactionList class="section-body" :count="10" />
    </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import AccountList from './AccountList';
import TransactionList from './TransactionList';

export default {
    components: {
        AccountList,
        TransactionList
    },
    methods: {
        ...mapMutations([
            "setIsLoading" // map this.setIsLoading() to this.$store.dispatch("setIsLoading")
        ]),
        ...mapActions("account", [
            "loadAccounts",
        ]),
        ...mapActions("transaction", [
            "loadTransactions"
        ])
    },
    mounted: async function () {
        await this.loadAccounts();
        await this.loadTransactions();
        this.setIsLoading({ isLoading: false });
    }
}
</script>

<style scoped>
#overview-tab {
    display: flex;
    flex-wrap: wrap;
}
</style>