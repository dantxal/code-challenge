import React, { useState, useEffect } from 'react';
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
  const [messages, setMessages] = useState([
    {
      name: 'Tim',
      text: 'this is a test message',
      id: '2d418fa1-6b4e-46f0-a12b-99810dde6ce9',
      dateAdded: 1537539445183,
      dateEdited: 1537539445183,
    },
  ]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await api.get('/comments');

        setMessages(response.data);
      } catch (err) {
        toast(err.data.error);
      }
    }
    loadMessages();
    setInterval(() => {
      loadMessages();
    }, 100);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const comment = { name: currentName, text: currentMessage };
    api.post('/comments', comment);
    setCurrentMessage('');
  }

  return (
    <Container>
      <ChatWindow>
        <header>
          <h2>Chat window name</h2>
        </header>
        <MessagesList>
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
