# obsidian-plugin-proxy

It's a proxy tool to help you visit plugin-market faster.

<!-- [![NPM version](https://img.shields.io/npm/v/obsidian-plugin-proxy?color=a1b858&label=)](https://www.npmjs.com/package/obsidian-plugin-proxy) -->


## Startup

1. download plugin files `obsidian-plugin-proxy.zip` here.
  - [Gitee](https://gitee.com/114000/obsidian-plugin-proxy/releases)
  - [Github](https://github.com/binyu1231/obsidian-plugin-proxy/releases)
2. unzip `dist.zip` to yourProject/.obsidian/plugins

## Custom Proxy

Adding struct to  `.obsidian/plugins/obsidian-plugin-proxy/data.json` `proxyList` field

``` json
{
  // ...
  "proxyList": [
    // ... other proxy
    {
      "id": "your proxy id",
      // replace `https://github.com/` for downloading plugin.
      "download": "https://gh.gcdn.mirr.one/",
      // replace https://raw.githubusercontent.com/
      "raw": "https://raw-gh.gcdn.mirr.one/",
      // replace https://github.com/ for displaying plugin README page.
      "page": "https://gh.gcdn.mirr.one/"
    }
  ]
  // ...
}
```

## License

[MIT](./LICENSE) License © 2022 [binyu1231](https://github.com/binyu1231)
