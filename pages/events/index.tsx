import { Default } from 'components/layouts/Default';
import { Events } from 'components/templates/events';
import type { NextPage } from 'next';

const EventsPage: NextPage = () => {
  return (
    <Default pageName="Create">
      <Events />
    </Default>
  );
};

export default EventsPage;
