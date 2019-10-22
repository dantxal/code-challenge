import React, { useState, useEffect, useRef } from 'react';
import { formatDistance } from 'date-fns';
import en from 'date-fns/locale/en-US';
import { toast } from 'react-toastify';

import api from '../../services/api';

import {
  Container,
  ChatWindow,
  MessagesList,
  MessageItem,
  Form,
} from './styles';

export default function Chat() {
  const [currentName, setCurrentName] = useState('Dan');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesList = useRef();

  useEffect(() => {
    async function loadMessages() {
      const response = await api.get('/comments');

      setMessages(response.data);
    }
    try {
      loadMessages();
      setInterval(() => {
        loadMessages();
      }, 500);
    } catch (err) {
      toast.error(err.message, {
        autoClose: 200,
      });
    }
  }, []);

  // Auto scrolls window
  useEffect(() => {
    messagesList.current.scrollTop = messagesList.current.scrollHeight;
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const comment = { name: currentName, text: currentMessage };
      api.post('/comments', comment);
      setCurrentMessage('');
      toast.success('Message sent');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container>
      <ChatWindow>
        <header>
          <h2>Chat window name</h2>
        </header>
        <MessagesList ref={messagesList}>
          {messages.map(message => (
            <MessageItem
              key={message.id}
              isCurrentUser={currentName === message.name}
            >
              <strong>{message.name}</strong>
              <p>{message.text}</p>
              <span>
                {formatDistance(message.dateEdited, new Date(), {
                  addSuffix: true,
                  locale: en,
                })}
              </span>
            </MessageItem>
          ))}
        </MessagesList>
        <Form onSubmit={e => handleSubmit(e)}>
          <input
            className="nameInput"
            value={currentName}
            onChange={({ target }) => setCurrentName(target.value)}
            type="text"
            placeholder="Your name here"
          />
          <textarea
            className="messageInput"
            type="text"
            value={currentMessage}
            onChange={({ target }) => setCurrentMessage(target.value)}
            placeholder="Type your message here"
          />
          <button
            type="submit"
            disabled={currentMessage.length < 1 || currentName.length < 3}
          >
            Send
          </button>
        </Form>
      </ChatWindow>
    </Container>
  );
}
