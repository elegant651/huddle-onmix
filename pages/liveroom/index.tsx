import { Default } from 'components/layouts/Default';
import { LiveRoom } from 'components/templates/liveroom';
import type { NextPage } from 'next';

const LiveRoomPage: NextPage = () => {
  return (
    <Default pageName="LiveRoom">
      <LiveRoom />
    </Default>
  );
};

export default LiveRoomPage;
