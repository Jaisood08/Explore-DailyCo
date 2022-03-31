import React from 'react';

import App from '@custom/basic-call/components/App';
import { ChatProvider } from '../contexts/ChatProvider';
import FlyingEmojiOverlay from './FlyingEmojisOverlay';

// Extend our basic call app component with the chat context
export const AppWithChat = () => (
  <ChatProvider>
    <FlyingEmojiOverlay />
    <App />
  </ChatProvider>
);

export default AppWithChat;
