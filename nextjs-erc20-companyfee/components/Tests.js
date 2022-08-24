import React from "react";
import { useMoralis } from "react-moralis";

export default function Tests() {
  const { authenticate, isAuthenticated, user, account } = useMoralis();

  if (!isAuthenticated) {
    console.log(account);
    return (
      <div>
        <h2>CIAO { account }</h2>
        <button onClick={() => authenticate()}>Authenticate</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
    </div>
  );
}