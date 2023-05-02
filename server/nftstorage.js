const mime = require('mime')
const { NFTStorage, File } = require('nft.storage')
const fs = require('fs')
const path = require('path')
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY

module.exports = async (app) => {

  app.storeNFT = async (aPath, name, description) => {
    const image = await fileFromPath(aPath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
      image,
      name,
      description,
    })
  }

  /**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
  const fileFromPath = async (filePath) => {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
  }

}
