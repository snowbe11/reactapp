class ChatManager {
  constructor() {
    this.chat = [];
  }

  pushMessage = ({ name, message }) => {
    this.chat.push({ date: new Date(), name, message });
  };

  getMessage = (from, to) => {
    const filterFrom = this.chat.filter((e) => (from ? e.date > from : e));
    const rest = filterFrom.filter((e) => (to ? e.date < to : e));

    return rest;
  };
}

module.exports = new ChatManager();
