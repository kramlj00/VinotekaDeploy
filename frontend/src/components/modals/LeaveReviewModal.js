import React from "react";
import styled, { keyframes } from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import { FaArrowCircleDown } from "react-icons/fa";

function LeaveReviewModal({ closeModal, handleConfirm }) {
  return (
    <OverlayModal>
      <article>
        <ModalText>Ostavite recenziju</ModalText>
        <ModalButtonsWrapper>
          <CancelContainer onClick={closeModal}>
            <ClearIcon />
          </CancelContainer>
        </ModalButtonsWrapper>
        <ArrowContainer>
          <ArrowDown onClick={handleConfirm} />
        </ArrowContainer>
      </article>
    </OverlayModal>
  );
}

export default LeaveReviewModal;

const jumpAnimation = keyframes`
    0% { transform: translate(-50%, -50%); }
    50% { transform: translate(-50%, -65%); }
    100% { transform: translate(-50%, -50%); }
`;

const OverlayModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: max-content;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 75vw;

  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.main};
    border: 1px solid ${theme.color.main.black};
    background-color: ${theme.color.main.dimGrey};
    padding: ${theme.spacing.extraLarge} ${theme.spacing.superLarge};
    @media(max-width: ${theme.breakpoints.tablet}) {
      width: 90%;
      max-width: 90vw;
      padding: ${theme.spacing.mediumSmall} ${theme.spacing.medium};
    }
  `}
`;

const ModalButtonsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  /* margin-top: 5rem; */

  & > * {
    margin: 0;
  }
`;

const ModalText = styled.p`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger}; 
    margin-bottom: ${theme.spacing.superLarge};
  `};
`;

const CancelContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger}; 
    background-color: ${theme.color.main.dimGrey};
  `};
`;

const ArrowDown = styled(FaArrowCircleDown)`
  cursor: pointer;
`;

const ArrowContainer = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  animation-name: ${jumpAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  &:hover {
    animation-play-state: paused;
  }

  ${({ theme }) => `
    font-size: ${theme.fontSize.subtitle}; 
    color: ${theme.color.main.roseRed};
  `};
`;
