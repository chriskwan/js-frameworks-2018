<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else id="total-balance">
        <div class="section-header">
            <h2>Total Balance: {{ `$${total}` }}</h2>
        </div>
        <div class="section-body">
            <Account v-for="account in accounts"
                :key="account.id"
                :account="account"
                :activeAccountId="activeAccountId"
                :transactions="transactions"
                @toggle-account-active="toggleAccountActive" />
        </div>
    </div>
</template>

<script>
import Account from "./Account";
export default {
    components: {
        Account
    },
    props: [ "isLoading", "accounts", "activeAccountId", "transactions" ],
    computed: {
        total: function () {
            return this.transactions.reduce((sum, t) => sum + t.amount, 0);
        }
    },
    methods: {
        toggleAccountActive: function (accountId) {
            // Pass up to parent
            this.$emit("toggle-account-active", accountId)
        }
    }
}
</script>

<style scoped>
#total-balance {
    flex: 1 1 auto;
    margin: 20px;
    margin-right: 10px;
}
</style>