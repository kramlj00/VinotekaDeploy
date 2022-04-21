import React from "react";
import SignIn from "../components/SignIn/SignIn";
import styled from "styled-components";

function SignInPage(props) {
  return (
    <PageContainer>
      <SignIn props={props} />
    </PageContainer>
  );
}

export default SignInPage;

const PageContainer = styled.div`
  height: 100vh;
`;
