import React, { useEffect, useState } from 'react';
import Button from '@custom/shared/components/Button';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@custom/shared/components/Card';
import Field from '@custom/shared/components/Field';
import {
  TextInput,
  BooleanInput,
  SelectInput,
} from '@custom/shared/components/Input';
import Well from '@custom/shared/components/Well';
import { slugify } from '@custom/shared/lib/slugify';
import PropTypes from 'prop-types';

/**
 * Intro
 * ---
 * Specify which room we would like to join
 */
export const Intro = ({ tokenError, fetching, error, onJoin }) => {
  const [rooms, setRooms] = useState({});
  const [duration, setDuration] = useState('10000');
  const [roomName, setRoomName] = useState('MSMEx-POC-Test');
  const [privacy, setPrivacy] = useState(true);

  const fetchRooms = async () => {
    const res = await fetch('/api/presence', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resJson = await res.json();
    setRooms(resJson);
  };

  useEffect(() => {
    fetchRooms();
    const i = setInterval(fetchRooms, 15000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="intro">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onJoin(slugify.convert(roomName), 'create', duration, privacy);
          }}
        >
          <div className="jc-card">
            <CardHeader>Join as owner</CardHeader>

            <CardFooter>
              <Button loading={fetching} fullWidth type="submit">
                {fetching ? 'Joining...' : 'Join '}
              </Button>
            </CardFooter>
          </div>
        </form>
      </Card>
      <style jsx>
        {`
          .intro {
            display: flex;
            gap: 15px;
            margin: auto;
          }
          .or-text {
            margin: auto;
          }
          .room {
            display: flex;
            width: 25vw;
            border-bottom: 1px solid var(--gray-light);
            padding: var(--spacing-xxs) 0;
            gap: 10px;
          }
          .room .label {
            font-weight: var(--weight-medium);
            color: var(--text-default);
          }
          .room .join-room {
            margin-left: auto;
            margin-bottom: auto;
            margin-top: auto;
          }
          .jc-card {
            width: 25vw;
          }
          @media screen and (max-width: 650px) {
            .intro {
              display: flex;
              flex-direction: column;
            }
            .jc-card {
              width: 75vw;
            }
          }
          @media (min-width: 650px) and (max-width: 1000px) {
            .intro {
              display: flex;
              flex-direction: column;
            }
            .jc-card {
              width: 50vw;
            }
          }
        `}
      </style>
    </div>
  );
};

Intro.propTypes = {
  room: PropTypes.string,
  onJoin: PropTypes.func.isRequired,
};

export default Intro;
