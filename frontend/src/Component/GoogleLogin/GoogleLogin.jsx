import React from "react";
import GoogleLogin from "react-google-login";
const responseGoogle = (response) => {
    console.log("lkjfslfkjsdlksdfjsdlkfjsdl",response);
  };
  
  const GoogleSignInButton = () => {
    return (
      <GoogleLogin
        clientId="74142053797-ka4tlgo8rben57abttfokrrhvob38c14.apps.googleusercontent.com"
        buttonText="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"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );
  };
  
  export default GoogleSignInButton;