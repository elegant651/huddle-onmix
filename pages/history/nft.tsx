import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { NFTTransfers } from 'components/templates/transfers/NFT';

const NFTHistoryPage: NextPage = (props) => {
  return (
    <Default pageName="NFT Transfers">
      <NFTTransfers {...props} />
    </Default>
  );
};

export default NFTHistoryPage;
