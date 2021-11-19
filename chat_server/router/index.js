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

// 기본 콜백을 사용할 경우 authenticate fail 이면 http 500 에러를 보내고 끝이다.
// 클라이언트에서 에러를 핸들링하도록 하는 방법도 있을 텐데,
// 리다이렉트를 이용할 경우 좀 뭔가 이게 아니다 싶은 느낌이 든다.
// router.post(
//   "/passport",
//   passport.authenticate(
//     "local",
//     {
//       //successRedirect: "/",
//       failureRedirect: "/redirect/login",
//       session: false,
//       //passReqToCallback: true,
//     },
//     (error) => {
//       console.log(`passport.authenticate failed ${error}`);
//     }
//   ),
//   (req, res) => {
//     console.log(`passport response req.user ${req.user.id}, ${req.user.name}`);

//     res.json({ status: "success", payload: { id: req.user.name } });
//   }
// );

router.post("/passport", (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      console.log(`authenticate failed "${error}"`);

      return res.json({ status: "failed", message: error });
    } else if (user) {
      req.login(user, (err) => {
        if (err) {
          console.log(`authenticate login failed ${err}`);

          return res.json({ status: "failed", message: err });
        } else {
          return res.json({
            status: "success",
            payload: { id: req.user.name },
          });
        }
      });
    } else {
      // done(error) 로 잡으면 제일 첫줄의 'if (error)' 에서 캣치할 수 있다.
      // 이 부분은 req.login(== verify) 하지 않고 passport.authenticate 에서 실패한 경우이다.
      console.log("authenticate account not exists");

      return res.json({ status: "failed", message: "account not exists" });
    }
  })(req, res, next);
});

router.get("/redirect/login", (req, res) => {
  console.log("/redirect/login");

  // server force redirect
  let newHost = req.headers.host.replace("4000", "3000");
  res.redirect(`http://${newHost}/login`);

  // way 2),
  // res.send(
  //   '<html><meta http-equiv="refresh" content="0; url=http://localhost:3000/login"></meta></html>'
  // );
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
