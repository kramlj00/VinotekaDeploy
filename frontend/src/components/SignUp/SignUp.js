import React, { useEffect, useState } from "react";

import "../SignIn/style.css";
import BusinessUser from "./BusinessUser";
import RegularUser from "./RegularUser";
import { SignUpContainer, Wrapper, Title, Description } from "./SignUpElements";

function SignUp() {
  const [userType, setUserType] = useState("");
  const [isBackPressed, setIsBackPressed] = useState(false);

  useEffect(() => {
    setUserType("");
    setIsBackPressed(false);
  }, [isBackPressed]);

  function handleBusinessUser() {
    setUserType("business");
  }

  function handleRegularUser() {
    setUserType("regular");
  }

  return (
    <SignUpContainer
      justifyContent={userType === "regular" ? "space-between" : ""}
    >
      <h1 className="title">Napravi račun</h1>
      {userType === "business" ? (
        <BusinessUser setIsBackPressed={setIsBackPressed} />
      ) : userType === "regular" ? (
        <RegularUser setIsBackPressed={setIsBackPressed} />
      ) : (
        <div>
          <Wrapper className="wrapper1">
            <Title>
              <h1 className="title">Poslovni korisnik</h1>
            </Title>
            <Description>
              Kako biste mogli predati oglas morate se registrirati kao poslovni
              subjekt.
            </Description>
            <button className="btn ghost" onClick={handleBusinessUser}>
              Odaberi
            </button>
          </Wrapper>
          <Wrapper className="wrapper2">
            <Title>
              <h1 className="title">Obični korisnik</h1>
            </Title>
            <Description>
              S ovim računom moći ćete komentirati vina koja ste naručili i
              pogledati prethodne narudžbe, ali ne i oglasiti svoja vina.
            </Description>
            <button className="btn ghost" onClick={handleRegularUser}>
              Odaberi
            </button>
          </Wrapper>
        </div>
      )}
    </SignUpContainer>
  );
}

export default SignUp;
