import { ipcRenderer } from 'electron'
import { IpcRendererSendType, ProxyRequestType, proxyRequestMatchRegex, proxyRequestReplaceHostMap } from './type'
import type { DataConfigProxyItem } from './type'

function matchUrl(e?: any) {
  let type = ProxyRequestType.Unknown
  if (!e || typeof e.url !== 'string')
    return type

  proxyRequestMatchRegex.some(([tp, regExp]) => {
    const matched = regExp.test(e.url)
    if (matched)
      type = tp
    return matched
  })

  return type
}

export function delegateIpcRendererSend(config: DataConfigProxyItem) {
  const ipcRendererSend = ipcRenderer.send

  ipcRenderer.send = function (...args) {
    const [type,,e] = args
    if (type === IpcRendererSendType.requestUrl) {
      const requestType = matchUrl(e)
      if (requestType !== ProxyRequestType.Unknown) {
        e.url = e.url.replace(proxyRequestReplaceHostMap.get(requestType), config[requestType])
        if (!e.headers)
          e.headers = {}
        e.headers['content-type'] = 'application/x-www-form-urlencoded'
        e.headers['Access-Control-Allow-Origin'] = '*'
      }
    }

    ipcRendererSend.bind(ipcRenderer)(...args)
  }
}
