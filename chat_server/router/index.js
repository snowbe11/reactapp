const { Router } = require("express");
const { rankManager } = require("../service");

const router = Router();

router.get("/rank", (request, response) => {
  console.log("client request rank");

  response.json({
    status: "success",
    payload: rankManager.getRank(),
  });
});

module.exports = router;
