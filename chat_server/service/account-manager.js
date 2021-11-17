class AccountManager {
  constructor() {
    this.account = [];
  }

  isExists = (id) => {
    let filteredResult = this.account.filter((e) => e.id == id);

    return filteredResult.length > 0;
  };

  createAccount = ({ id, name, password }) => {
    this.account.push({ id, name, password });
  };

  getAccount = ({ id, password }) => {
    let account = this.account.filter((e) => e.id == id);

    if (account && account.password === password) {
      return account.name;
    } else {
      return "";
    }
  };
}

module.exports = new AccountManager();
