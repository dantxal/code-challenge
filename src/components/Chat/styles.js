import styled, { css } from 'styled-components';

const userMessage = css`
  align-self: flex-end;
  background: #fff;
  cursor: pointer;
  strong {
    text-align: right;
  }
`;
export const Container = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatWindow = styled.div`
  width: 600px;
  height: 80vh;
  header {
    margin-bottom: 20px;
  }
`;
export const MessagesList = styled.ul`
  display: flex;
  flex-direction: column;
  background: #dfdfdf;
  padding: 20px;
  overflow: auto;
  max-height: 60vh;
`;

export const MessageItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 60%;
  background: #c3ff80;
  padding: 10px;

  strong {
    margin-bottom: 5px;
  }
  p {
    text-align: left;
  }
  span {
    text-align: right;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  }
  & + li {
    margin-top: 10px;
  }

  ${({ isCurrentUser }) => (isCurrentUser ? userMessage : '')}
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #bbb;
  padding: 20px;
  input {
    align-self: flex-start;
    width: 30%;
    padding: 6px;
  }
  textarea {
    width: 100%;
    margin-top: 10px;
    padding: 6px;
    resize: vertical;
    min-height: 6em;
  }
  button {
    margin-top: 20px;
    border: 0;
    padding: 6px 10px;
    &:hover {
      background: rgba(220, 245, 255, 0.6);
    }

    &:disabled {
      background: rgba(255, 255, 255, 0.6);
      cursor: not-allowed;
    }
  }
`;
