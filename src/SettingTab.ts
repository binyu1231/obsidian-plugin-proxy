import { PluginSettingTab, Setting } from 'obsidian'
import type { App, Plugin } from 'obsidian'
import type { DataConfig, DataConfigProxyItem } from './type'
export class SettingTab extends PluginSettingTab {
  plugin: Plugin

  constructor(app: App, plugin: Plugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  async saveData(config?: DataConfig) {
    config = config || await this.plugin.loadData()
    this.plugin.saveData(config)
  }

  async display() {
    const { containerEl: cont } = this

    cont.empty()
    cont.createEl('h2', { text: 'Plugin Proxy Setting' })
    cont.createEl('br')

    new Setting(cont)
      .setName('代理服务器')
      .setDesc('通过选择不同的服务器来切换代理，可以解决某些情况下，某个服务器无法访问的情况。')
      .addDropdown(async (dropDown) => {
        const config: DataConfig = await this.plugin.loadData()
        config.proxyList.forEach((item: DataConfigProxyItem) => {
          dropDown.addOption(item.id, item.id)
        })

        dropDown.setValue(config.currentProxy)

        // set dropdown value
        dropDown.onChange(async (value) => {
          config.currentProxy = value
          this.saveData(config)
        })
      })

    new Setting(cont)
      .setName('自定义代理服务器')
      .setDesc('可以在插件目录下的 data.json 中自定义代理。e.g. <project>/.obsidian/plugins/obsidian-plugin-proxy/data.json')
  }
}
