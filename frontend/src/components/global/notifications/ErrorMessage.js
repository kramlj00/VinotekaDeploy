import styled from "styled-components";

export const ErrorMessage = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-top: -11px;
  font-weight: bold;

  ${(props) => `
    visibility: ${props.visibility};
    padding-bottom: ${props.hasPadding ? "4px" : ""};
    color: ${props.theme.color.main.roseRed};
    font-size: ${props.theme.fontSize.medium};

    @media(max-width: ${props.theme.breakpoints.tablet}) {
        font-size: ${props.theme.fontSize.mediumSmall};
    }
 `}
`;
