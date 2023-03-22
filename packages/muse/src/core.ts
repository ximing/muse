import { Hooks } from './hooks';
import { GraphManager } from './manager/graph';

export class Muse {
  container: HTMLElement;
  hooks: Hooks;
  graphManager: GraphManager;
  constructor(id: string) {
    const container = document.getElementById(id);
    if (!container) {
      throw new Error('id 异常');
    }
    this.container = container;
    this.hooks = new Hooks();
    this.graphManager = new GraphManager(this);
    this.graphManager.init();
  }
}
