import React from "react";
import styled from "styled-components";

function QuestionModal({
  questionText,
  closeModal,
  confirmButtonText,
  handleConfirm,
}) {
  const handleConfirmButtonClick = async () => {
    await handleConfirm();
  };

  return (
    <OverlayModal>
      <article>
        <ModalText>{questionText}</ModalText>
        <ModalButtonsWrapper>
          <ConfirmButton onClick={handleConfirmButtonClick}>
            {confirmButtonText}
          </ConfirmButton>
          <CancelButton onClick={closeModal}>Zatvori</CancelButton>
        </ModalButtonsWrapper>
      </article>
    </OverlayModal>
  );
}

export default QuestionModal;

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
    color: ${theme.color.main.onyxBlack};
    font-size: ${theme.fontSize.medium};
    border: 1px solid ${theme.color.main.black};
    background-color: ${theme.color.main.white};
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
  margin-top: 5rem;

  & > * {
    margin: 0;
  }
`;

const ModalText = styled.p`
  text-align: center;
  text-transform: uppercase;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger}; 
    margin-bottom: ${theme.spacing.superLarge};
  `};
`;

const ConfirmButton = styled.button`
  padding: 10px 60px;
  cursor: pointer;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger}; 
    border: 1px solid ${theme.color.main.roseRed};
    background-color: ${theme.color.main.roseRed};
    color: ${theme.color.main.white};
    border-radius: 10px;
  `};
`;

const CancelButton = styled.button`
  padding: 10px 40px;
  cursor: pointer;

  ${({ theme }) => `
    font-size: ${theme.fontSize.mediumLarger}; 
    border: 1px solid ${theme.color.main.black};
    border-radius: 10px;
  `};
`;
