import { Default } from 'components/layouts/Default';
import { View } from 'components/templates/view';
import type { NextPage } from 'next';

const EventViewPage: NextPage = () => {
  return (
    <Default pageName="view">
      <View />
    </Default>
  );
};

export default EventViewPage;
