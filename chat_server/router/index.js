const { Router } = require("express");

const router = Router();

router.get('/rank', (request, response) => {
    console.log(request);
    console.log('client request');

    response.send('hello world');
});

module.exports = router;
