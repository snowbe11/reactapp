const express = require("express");
const { rankManager, accountManager } = require("../service");

const router = express.Router();

router.get("/rank", (request, response) => {
  console.log("client request rank");

  response.json({
    status: "success",
    payload: rankManager.getRank(),
  });
});

router.post("/account", (request, response) => {
  const context = request.body;

  console.log(`client request create account ${context.id}`);

  if (accountManager.isExists(context.id)) {
    response.json({
      status: "reject",
      message: "id aleady exists",
    });
  } else {
    accountManager.createAccount(context);

    response.json({
      status: "success",
    });

    console.log(`account ${context.id} created success`);
  }
});

module.exports = router;
