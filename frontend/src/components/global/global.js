import styled from "styled-components";

export const SelectBtn = styled.button`
  border-radius: 20px;
  border: 1px solid #e83946;
  background-color: #e83946;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  ${(props) => `
    background-color: ${props.ghost ? "transparent" : ""};
    border-color: ${props.ghost ? "#ffffff" : ""};
    margin-top: ${props.hasMarginTop ? "15px" : ""};

    @media screen and (max-width: 900px) {
      background-color: ${props.color ? props.color : ""};
      border-color: ${props.color ? props.color : ""};
    }
  `}
`;

export const BackIconContainer = styled.div`
  display: flex;
  color: #e83946;
  cursor: pointer;
  border: 1px solid #e83946;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  align-self: flex-start;
  display: ${(props) => props.display};
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 10px 0;
  width: 100%;
  font-family: "Quicksand", sans-serif;

  ${(props) => `
    margin-right: ${props.hasMarginRight ? "20px" : "0px"};

    @media screen and (max-width: 500px) {
      margin right: 0px;
    }
  `}

  @media screen and (max-width: 400px) {
    font-size: 13px;
    padding-left: 8px;
    margin-right: 0px;
  }
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  font-size: 20px;
  background-color: #fcd2e3;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;

  @media screen and (max-width: 1300px) {
    width: 95%;
  }

  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

export const ErrorMessage = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-top: -9px;
  font-size: 14px;
  font-weight: bold;
  color: #e83946;

  ${(props) => `
    visibility: ${props.visibility};
    padding-bottom: ${props.hasPadding ? "4px" : ""};
  `}

  @media screen and (max-width: 800px) {
    font-size: 13px;
  }
`;
