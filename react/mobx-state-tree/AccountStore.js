import { types } from 'mobx-state-tree';

const Account = types
    .model("Account", {
        id: types.identifier,
        name: types.string
    });

const AccountStore = types
    .model("AccountStore", {
        accounts: types.optional(types.array(Account), []),
        activeAccountId: types.maybeNull(types.string, null)
    })
    .actions(self => ({
        setAccounts(accounts) {
            self.accounts = accounts;
        },
        setActiveAccountId(activeAccountId) {
            self.activeAccountId = activeAccountId;
        }
    }));

export default AccountStore;