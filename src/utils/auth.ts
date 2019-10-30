
export function login(password: string): object {
  const dev = process.env.NODE_ENV !== "production";
  const devPassword = process.env.DEV_PASS;
  var authStatus = {invalid: true, err: ""};

  if(devPassword) {
    authStatus.invalid = password != devPassword;
    if(authStatus.invalid) authStatus.err = "Incorrect password";
  } else {
    authStatus.err = "Dev password required. production authentication not implemented yet.";
  }
  return authStatus;
}