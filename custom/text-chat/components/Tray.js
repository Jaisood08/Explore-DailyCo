import React, { useEffect, useState } from 'react';

import Button from '@custom/shared/components/Button';
import { TrayButton } from '@custom/shared/components/Tray';
import { useUIState } from '@custom/shared/contexts/UIStateProvider';
import { ReactComponent as IconChat } from '@custom/shared/icons/chat-md.svg';
import { useChat } from '../contexts/ChatProvider';
import { CHAT_ASIDE } from './ChatAside';
import { ReactComponent as IconStar } from '@custom/shared/icons/star-md.svg';

const COOLDOWN = 1500;

export const Tray = () => {
  const { toggleAside } = useUIState();
  const { hasNewMessages } = useChat();

  const [showEmojis, setShowEmojis] = useState(false);
  const [isThrottled, setIsThrottled] = useState(false);

  function sendEmoji(emoji) {
    // Dispatch custom event here so the local user can see their own emoji
    window.dispatchEvent(
      new CustomEvent('reaction_added', { detail: { emoji } })
    );
    setShowEmojis(false);
    setIsThrottled(true);
  }

  // Pseudo-throttling (should ideally be done serverside)
  useEffect(() => {
    if (!isThrottled) {
      return false;
    }
    const t = setTimeout(() => setIsThrottled(false), COOLDOWN);
    return () => clearTimeout(t);
  }, [isThrottled]);

  return (
    <div>
      {showEmojis && (
        <div className="emojis">
          <Button
            variant="outline-gray"
            size="small-square"
            onClick={() => sendEmoji('fire')}
          >
            🔥
          </Button>
          <Button
            variant="outline-gray"
            size="small-square"
            onClick={() => sendEmoji('squid')}
          >
            🦑
          </Button>
          <Button
            variant="outline-gray"
            size="small-square"
            onClick={() => sendEmoji('laugh')}
          >
            🤣
          </Button>
        </div>
      )}
      <TrayButton
        label="Emoji"
        onClick={() => setShowEmojis(!showEmojis)}
        disabled={isThrottled}
      >
        <IconStar />
      </TrayButton>
      <TrayButton
        label="Chat"
        bubble={hasNewMessages}
        onClick={() => {
          toggleAside(CHAT_ASIDE);
        }}
      >
        <IconChat />
      </TrayButton>
      <style jsx>{`
        position: relative;

        .emojis {
          position: absolute;
          display: flex;
          top: calc(-100% + var(--spacing-xs));
          left: 0px;
          transform: translateX(calc(-50% + 26px));
          z-index: 99;
          background: white;
          padding: var(--spacing-xxxs);
          column-gap: 5px;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-depth-2);
        }
      `}</style>
    </div>
  );
};

export default Tray;
