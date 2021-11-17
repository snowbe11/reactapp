class AccountManager {
  constructor() {
    this.account = [];
  }

  createAccount = ({ id, name, password }) => {
    console.log(`create account ${id}, ${name}`);

    let filteredResult = this.account.filter((e) => e.id == id);

    if (filteredResult.length === 0) {
      this.account.push({ id, name, password });
      return true;
    } else {
      return false;
    }
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
