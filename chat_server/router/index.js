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

router.post("/login", (request, response) => {
  const context = request.body;

  console.log(`'${context.id}' request login`);

  if (accountManager.isExists(context.id)) {
    const accountName = accountManager.auth(context.id, context.password);
    if (accountName) {
      response.json({
        status: "success",
        name: accountName,
      });

      console.log(`${context.id} login success`);
    } else {
      response.json({
        status: "reject",
        name: "auth failed",
      });
    }
  } else {
    response.json({
      status: "reject",
      message: "id not exists",
    });
  }
});

module.exports = router;
