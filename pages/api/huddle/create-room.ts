import axios from 'axios';
 
import type { NextApiRequest, NextApiResponse } from 'next';
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log('p', process.env.NEXT_PUBLIC_HUDDLE_API_KEY)
    const { data } = await axios.post(
      'https://iriko.testing.huddle01.com/api/v1/create-room',
      {
        title: 'huddle-onmix-01',
        hostWallets: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
        roomLock: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_HUDDLE_API_KEY,
        },
      }
    );
 
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
 
export default handler;