import {UAuthMoralisConnector} from '@uauth/moralis'

// Instantiate your other connectors.
export const injected = {}

export const walletconnect = {provider: 'walletconnect'}

UAuthMoralisConnector.setUAuthOptions({
  clientID: process.env.NEXT_PUBLIC_UAUTH_CLIENT_ID!,
  redirectUri: process.env.NEXT_PUBLIC_UAUTH_REDIRECT_URI!,

  // Scope must include openid and wallet
  scope: 'openid wallet',
  // Injected and walletconnect connectors are required
  connectors: {injected, walletconnect},
});

export const uauth = {connector: UAuthMoralisConnector};

const connectors: Record<string, any> = {
  injected,
  walletconnect,
  uauth,
}

export default connectors