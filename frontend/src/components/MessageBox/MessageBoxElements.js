import styled from "styled-components";

export const MessageContainer = styled.div`
  &.alert {
    padding: 12px;
    border: 0.1rem solid transparent;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  &.alert-info {
    color: #2020a0;
    background-color: #e0e0ff;
  }

  &.alert-danger {
    color: #a02020;
    background-color: #ffe0e0e0;
  }
`;
