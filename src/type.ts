export enum ProxyRequestType {
  Unknown,
  Download = 'download',
  Raw = 'raw',
  Page = 'page',
}

export interface ProxyRequestConfig {
  [ProxyRequestType.Download]: string
  [ProxyRequestType.Raw]: string
  [ProxyRequestType.Page]: string
}

export const proxyRequestMatchRegex: [ProxyRequestType, RegExp][] = [
  [ProxyRequestType.Download, /\release\/download\//g],
  [ProxyRequestType.Raw, /^https?:\/\/raw.githubusercontent.com\//],
  [ProxyRequestType.Page, /^https?:\/\/github.com\//],
]

export const proxyRequestReplaceHostMap: Map<ProxyRequestType, string> = new Map([
  [ProxyRequestType.Download, 'https://github.com/'],
  [ProxyRequestType.Raw, 'https://raw.githubusercontent.com/'],
  [ProxyRequestType.Page, 'https://github.com/'],
])

export interface DataConfigProxyItem {
  id: string
  download: string
  raw: string
  page: string
}

export interface DataConfig {
  currentProxy: string
  defaultProxy: string
  proxyList: DataConfigProxyItem[]
  customProxyEnable: boolean
  currentCustomProxy: string
  customProxyList: DataConfigProxyItem[]
}

export enum IpcRendererSendType {
  requestUrl = 'request-url',
  remoteBrowserDereference = 'REMOTE_BROWSER_DEREFERENCE',
}
