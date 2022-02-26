import styled from "styled-components";

export const SignUpContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  height: 92%;
  justify-content: ${(props) => props.justifyContent};
`;

export const Wrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;

  &.wrapper1 {
    background: #b93327;
  }
  &.wrapper2 {
    background: #ea985c;
  }
`;

export const Title = styled.div`
  color: white;
  font-size: 14px;
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
`;

export const Description = styled.p`
  color: white;
  padding: 10px;
  @media screen and (max-width: 700px) {
    padding: 7px;
  }
`;

export const DataTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 370px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const BtnData = styled.button`
  background-color: white;
  border-radius: 20px;
  font-size: 18px;
  font-weight: bold;
  padding: 7px 15px;
  letter-spacing: 1px;
  border: 1.5px solid #afafaf;
  color: #afafaf;
  cursor: pointer;

  &.active-data {
    border: 1.5px solid #e83946;
    color: #e83946;
  }
`;

export const BackIconContainer = styled.div`
  display: flex;
  padding: 2px;
  color: #e83946;
  cursor: pointer;
  border: 1px solid #e83946;
  border-radius: 50%;
  align-self: flex-start;
`;
