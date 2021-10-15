import styled from "styled-components";

export const MessageContainer = styled.div`
  &.alert {
    padding: 1rem;
    border: 0.1rem solid transparent;
    border-radius: 0.5rem;
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
