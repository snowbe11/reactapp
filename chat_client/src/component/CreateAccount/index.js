import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { fetchCreate } from "../../context/LoginContext";
import "./style.css";

export default function CreateAccount() {
  const accountState = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const submitContext = async (e) => {
    e.preventDefault();

    const account_data = {
      id: accountNameRef.current.value,
      name: nameRef.current.value,
      password: passwordRef.current.value,
    };

    let fetchResult = await dispatch(
      fetchCreate(account_data, (message) => {
        console.log(message);
      })
    ).unwrap();

    if (fetchResult) {
    }
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
              value="sa"
            />
          </div>
          <div className="account-create-form-content">
            <TextField
              inputRef={nameRef}
              name="name"
              id="outlined-multiline-static"
              variant="outlined"
              label="Display Name"
              value="관리자"
            />
          </div>
          <div className="account-create-form-content">
            <TextField
              inputRef={passwordRef}
              name="password"
              id="outlined-multiline-static"
              variant="outlined"
              label="Password"
              value="1234"
            />
          </div>
          <div className="account-button-group">
            <Button onClick={submitContext}>생성</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
