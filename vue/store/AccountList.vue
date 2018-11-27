<template>
    <div v-if="sharedState.isLoading">
        Loading...
    </div>
    <div v-else id="total-balance">
        <div class="section-header">
            <h2>Total Balance: {{ `$${total}` }}</h2>
        </div>
        <div class="section-body">
            <Account v-for="account in sharedState.accounts"
                :key="account.id"
                :account="account"
                @toggle-account-active="toggleAccountActive" />
        </div>
    </div>
</template>

<script>
import Store from "../Store";
import Account from "./Account";

export default {
    components: {
        Account
    },
    data: function () {
        return {
            sharedState: Store.state
        };
    },
    computed: {
        total: function () {
            return this.sharedState.transactions.reduce((sum, t) => sum + t.amount, 0);
        }
    },
    methods: {
        toggleAccountActive: function (accountId) {
            Store.toggleAccountActive(accountId);
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