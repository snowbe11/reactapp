const { Router } = require("express");
const { rankManager, accountManager } = require("../service");

const router = Router();

router.get("/rank", (request, response) => {
  console.log("client request rank");

  response.json({
    status: "success",
    payload: rankManager.getRank(),
  });
});

router.post("/create", (request, response) => {
  const context = request.body;

  console.log(`client request create account ${context}`);

  accountManager.createAccount(context);

  response.json({
    status: "success",
    payload: rankManager.getRank(),
  });
});

module.exports = router;
