import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { createAccount } from "../../reducer/account";
import "./style.css";

export default function CreateAccount() {
  const [result, setResult] = useState(false);
  const dispatch = useDispatch();

  const submitContext = (e) => {
    e.preventDefault();

    createAccount(dispatch, {
      id: accountNameRef.current.value,
      name: nameRef.current.value,
      password: passwordRef.current.value,
    }).then((result) => {
      setResult(result);
    });
  };

  const accountNameRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="account-input-container">
      <div className="accout-input-caption">
        <div>계정 정보를 입력하세요.</div>
      </div>
      <form onSubmit={submitContext}>
        <div className="account-create-form">
          <div className="account-create-form-content">
            <TextField
              inputRef={accountNameRef}
              name="accountName"
              id="outlined-multiline-static"
              variant="outlined"
              label="Account Name"
            />
          </div>
          <div className="account-create-form-content">
            <TextField
              inputRef={nameRef}
              name="name"
              id="outlined-multiline-static"
              variant="outlined"
              label="Display Name"
            />
          </div>
          <div className="account-create-form-content">
            <TextField
              inputRef={passwordRef}
              name="password"
              id="outlined-multiline-static"
              variant="outlined"
              label="Password"
            />
          </div>
          <div className="account-button-group">
            <Button onClick={submitContext}>생성</Button>
          </div>
          {result && <div>계정을 생성했습니다.</div>}
        </div>
      </form>
    </div>
  );
}
