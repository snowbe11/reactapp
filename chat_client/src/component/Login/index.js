import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Link } from "@material-ui/core";
import { login } from "../../reducer/account";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [result, setResult] = useState(false);
  const dispatch = useDispatch();

  const submitContext = (e) => {
    e.preventDefault();

    login(dispatch, {
      id: idRef.current.value,
      password: pwRef.current.value,
    }).then((result) => {
      console.log(`로그인 결과 ${result}`);
      setResult(result);
    });
  };

  const idRef = useRef();
  const pwRef = useRef();

  return (
    <div className="account-input-container">
      <div className="accout-input-caption">
        <div>로그인 정보를 입력하세요.</div>
      </div>
      <form onSubmit={submitContext}>
        <div className="account-create-form">
          <div className="account-create-form-content">
            <TextField
              inputRef={idRef}
              name="accountName"
              id="outlined-multiline-static"
              variant="outlined"
              label="Account Name"
            />
          </div>
          <div className="account-create-form-content">
            <TextField
              inputRef={pwRef}
              name="password"
              id="outlined-multiline-static"
              variant="outlined"
              label="Password"
            />
          </div>
          <div className="account-button-group">
            <Button onClick={submitContext}>로그인</Button>
            <Link href="/account">계정생성</Link>
          </div>
        </div>
      </form>
      {result && <Navigate to="/" />}
    </div>
  );
}
