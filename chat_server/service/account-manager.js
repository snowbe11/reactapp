class AccountManager {
  constructor() {
    this.account = [];
  }

  isExists = (id) => {
    let filteredResult = this.account.filter((e) => e.id === id);
    return filteredResult.length > 0;
  };

  createAccount = ({ id, name, password }) => {
    this.account.push({ id, name, password });
  };

  auth = (id, password) => {
    let accountMatched = this.account.filter((e) => e.id === id);

    for (const account of accountMatched) {
      if (account.password === password) {
        return account.name;
      }
    }

    return undefined;
  };
}

module.exports = new AccountManager();
