import { action, observable } from 'mobx';

export default class AccountStore {
    @observable accounts = [];
    @observable activeAccountId = null;

    @action setAccounts = (accounts) => {
        this.accounts = accounts;
    }

    @action setActiveAccountId = (activeAccountId) => {
        this.activeAccountId = activeAccountId;
    }
}