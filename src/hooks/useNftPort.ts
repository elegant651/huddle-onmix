import axios from 'axios'

export function useNftPort() {
  const CONTRACT_ADDRESS = '0xB4967cb579330A89A285Fe6E875ac95ac09D7B3f'

  const METADATA_URI = 'bafkreiczu5gz5swlb4hvpdkh25n3dkgcmquapgfmkufyoogac6i5gvumdi'
  const METADATA_IMG = 'https://ipfs.io/ipfs/bafkreiftkw4huljmjwykewkd3rkvl5yyv3vdsk2js3ws3huznwx2inokve'

  const API_KEY = process.env.NEXT_PUBLIC_NFTPORT_KEY


  const uploadFileToIPFS = async (file: any) => {
    const form = new FormData();
    form.append('file', file);
    
    const options = {
      method: 'POST',
      body: form,
      headers: {
        "Authorization": API_KEY!,
      },
    };

    const resp = await fetch("https://api.nftport.xyz/v0/files", options)
    const json = await resp.json();
    console.log('j', json)
    return json
  }

  const uploadMetadataToIPFS = async (name: string, desc: string, file_url: string) => {
    const response = await axios.post('https://api.nftport.xyz/v0/metadata', {
      "name": name,
      "description": desc,
      "file_url": file_url,
      // "external_url": external_url,
    }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY!
      }
    })
    console.log(response)
    return response.data
  }

  const mintNFT = async (ca: string, metadata_uri: string, mint_to_address: string) => {
    console.log('dg', ca +"/"+metadata_uri+"/"+mint_to_address)
    const response = await axios.post('https://api.nftport.xyz/v0/mints/customizable', {
      "chain": "polygon",
      "contract_address": '0xB8F255B608afB2Cd82c93577ca20db9e1c4F8E1B',
      "metadata_uri": "ipfs://"+metadata_uri,
      "mint_to_address": mint_to_address,
      "token_id": 1
    }, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY!
      }
    })
    console.log(response)   
    return response.data
  }

  const getTokenIDOfMintedNFT = async (tx_hash: string) => {
    const response = await axios.get(`https://api.nftport.xyz/v0/mints/${tx_hash}?chain=polygon`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': API_KEY!
      }
    })
    console.log(response)
    return response
  }

  return {CONTRACT_ADDRESS, METADATA_URI, METADATA_IMG, uploadFileToIPFS, uploadMetadataToIPFS, mintNFT, getTokenIDOfMintedNFT}
}