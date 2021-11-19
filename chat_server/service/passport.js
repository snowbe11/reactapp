const passport = require("passport");
const strategy = require("passport-local").Strategy;

const accountManager = require("./account-manager");

passport.serializeUser((user, done) => {
  // 세션에 저장

  console.log(`serializeUser ${JSON.stringify(user)}`);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // 세션으로부터 값을 가져오는

  console.log(`deserializeUser ${JSON.stringify(user)}`);
  done(null, user);
});

passport.use(
  "local",
  new strategy(
    {
      usernameField: "id",
      passwordField: "password",
    },
    (id, password, done) => {
      console.log(`passport verify (${id}:${password})`);

      if (accountManager.isExists(id)) {
        const user = accountManager.auth(id, password);

        if (user) {
          console.log(`passport accept as ${user}`);

          return done(null, { id: id, name: user });
        } else {
          console.log(`passport ivalid password`);

          return done(null, null, { message: "Incorrect password" });
        }
      } else {
        console.log(`passport account not found`);
        return done("Account not exists");
      }
    }
  )
);

module.exports = passport;
