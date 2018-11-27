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
                @toggle-account-active="toggleAccountActive" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Account from "./Account";

export default {
    components: {
        Account
    },
    computed: {
        ...mapState([
            "isLoading"
        ]),
        ...mapState("account", [
            "accounts"
        ]),
        ...mapState("transaction", [
            "transactions"
        ]),
        total: function () {
            return this.transactions.reduce((sum, t) => sum + t.amount, 0);
        }
    },
    methods: {
        ...mapMutations("account", [
            "toggleAccountActive" // this is the same as the commented out method below
        ])
        // toggleAccountActive: function ({ accountId }) {
        //     this.$store.commit("toggleAccountActive", { accountId });
        // }
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