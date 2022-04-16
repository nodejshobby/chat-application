const getIndexPage = (req, res) => {
  res.render("index");
};

const getChatPage = (req, res) => {
  res.render("chat", {
    chatRoom: 1,
  });
};

module.exports = {
  getIndexPage,
  getChatPage,
};
