import { Core } from '.'

export class PluginManager {
  private plugins: any[] = []
  private readonly core

  constructor (core: Core) {
    this.core = core
  }

  addPlugins (plugins: any[]): void {
    // add remove duplicate logic
    this.plugins = [...this.plugins, plugins]
  }
}
