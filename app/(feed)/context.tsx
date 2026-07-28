'use client';

import { TypeDtoMessage } from '@dispatch/types';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

const FeedContext = createContext<{
  messages: TypeDtoMessage[];
  appendMessages: (messages: TypeDtoMessage[]) => void;
  resetMessages: (messages: TypeDtoMessage[]) => void;
  createMessage: (message: TypeDtoMessage) => void;
  deleteMessage: (message: TypeDtoMessage) => void;
  updateMessage: (message: TypeDtoMessage) => void;
}>({
  messages: [],
  appendMessages: () => {},
  resetMessages: () => {},
  createMessage: () => {},
  deleteMessage: () => {},
  updateMessage: () => {},
});

export function FeedProvider(props: { children: ReactNode }) {
  const [messages, setMessages] = useState<TypeDtoMessage[]>([]);

  const appendMessages = useCallback(
    (nextMessages: TypeDtoMessage[]) =>
      setMessages((current) => [...current, ...nextMessages]),
    [],
  );

  const resetMessages = useCallback(
    (nextMessages: TypeDtoMessage[]) => setMessages(nextMessages),
    [],
  );

  const createMessage = useCallback((message: TypeDtoMessage) => {
    setMessages((current) => [message, ...current]);
    console.log('create message', message);
    // TODO (out of scope for the challenge): persist the creation
  }, []);

  const updateMessage = useCallback((message: TypeDtoMessage) => {
    setMessages((current) =>
      current.map((item) => (item.id === message.id ? message : item)),
    );
    console.log('update message', message.id, message);
    // TODO (out of scope for the challenge): persist the update
  }, []);

  const deleteMessage = useCallback((message: TypeDtoMessage) => {
    setMessages((current) => current.filter((item) => item.id !== message.id));
    console.log('delete message', message.id);
    // TODO (out of scope for the challenge): persist the delete
  }, []);

  return (
    <FeedContext.Provider
      value={{
        messages,
        resetMessages,
        appendMessages,
        createMessage,
        deleteMessage,
        updateMessage,
      }}
    >
      {props.children}
    </FeedContext.Provider>
  );
}

export function useFeedContext() {
  return useContext(FeedContext);
}
