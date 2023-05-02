import { Default } from 'components/layouts/Default';
import { Events } from 'components/templates/events';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Default pageName="Events">
      <Events />
    </Default>
  );
};

export default HomePage;
