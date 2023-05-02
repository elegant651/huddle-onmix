import {connect} from  "@tableland/sdk"
import { ethers } from 'ethers';
import type { ExternalProvider } from '@ethersproject/providers';

export const TABLE_NAME = 'cmtable_80001_3068'
export const TABLE_NAME_COMMENT = 'cmtable_comment_80001_3071'

export type ROW_TYPE_EVENT = {
  id: number,
  pic: string,
  title: string,
  info: string,
  message: string,
  creator: string
}

export type ROW_TYPE_COMMENT = {
  id: number,
  name: string,
  address: string,
  amount: number,
  message: string,
}

export function useTableland() {
  const getConnection = async (ethereumProvider : ExternalProvider) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    console.log('dd', signer)

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain
    const tableland = await connect({ network: "testnet", chain: "polygon-mumbai", signer });
    return tableland
  }

  /* create event */
  const createEvent = async (ethereumProvider : ExternalProvider) => {
    const tableland = await getConnection(ethereumProvider)
    console.log('tt', tableland)
    const { name } = await tableland.create(
      `id int, pic text, title text, info text, message text, creator text, primary key (id)`, // Table schema definition
      { prefix: `cmtable` } // Optional `prefix` used to define a human-readable string
    );
    console.log('ddddd', name)
    return name
  }

  const writeQueryOnEvent = async (ethereumProvider : ExternalProvider, tableName: string, data: ROW_TYPE_EVENT) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    console.log('dd', signer)

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain
    const tableland = await connect({ network: "testnet", chain: "polygon-mumbai", signer });
    const writeRes = await tableland.write(`INSERT INTO ${tableName} (id, pic, title, info, message, creator) VALUES (${data.id}, '${data.pic}', '${data.title}', '${data.info}', '${data.message}', '${data.creator}');`);
    return writeRes
  }

  /* create comment */
  const createComment = async (ethereumProvider : ExternalProvider) => {
    const tableland = await getConnection(ethereumProvider)
    console.log('tt', tableland)
    const { name } = await tableland.create(
      `id int, name text, address text, amount text, message text, primary key (id)`, // Table schema definition
      { prefix: `cmtable_comment` }
    );
    console.log('ddddd', name)
    return name
  }

  const writeQueryOnComment = async (ethereumProvider : ExternalProvider, tableName: string, data: ROW_TYPE_COMMENT) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain
    const tableland = await connect({ network: "testnet", chain: "polygon-mumbai", signer });
    const writeRes = await tableland.write(`INSERT INTO ${tableName} (id, name, address, amount, message) VALUES (${data.id}, '${data.name}', '${data.address}', '${data.amount}', '${data.message}');`);
    return writeRes
  }


  const readQuery = async (ethereumProvider : ExternalProvider, tableName: string) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner()

    console.log('dd', signer)

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain
    const tableland = await connect({ network: "testnet", chain: "polygon-mumbai", signer });
    const readRes = await tableland.read(`SELECT * FROM ${tableName};`);
    return readRes
  }

  return { getConnection, createEvent, writeQueryOnEvent, createComment, writeQueryOnComment, readQuery }
}