const express = require("express");
const { rankManager, accountManager, passport } = require("../service");

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

router.post(
  "/passport",
  passport.authenticate("local", {
    //successRedirect: "/",
    failureRedirect: "/redirect/account",
    session: false,
  }),
  (req, res) => {
    console.log(`passport response to ${req.body.id}`);

    // 세션을 사용하지 않기 때문에 송수신 정보에 한계가 있다.
    // 근데 매뉴얼에는 되는 것 처럼 보이는데 vertify 함수를 더 건들어보자
    console.log(`req.user ${req.user.id}, ${req.user.password}`);

    res.json({ status: "success", payload: { id: req.body.id } });
  }
);

router.get("/redirect/account", (req, res) => {
  console.log("/redirect/account");

  res.redirect("/");
});

router.get("/debugpassport", (req, res) => {
  console.log("render debugpassport");

  res.json({
    "req.session": req.session,
    "req.user": req.user,
    "req._passport": req._passport,
  });
});

module.exports = router;
