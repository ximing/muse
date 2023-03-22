import { Muse } from '../core';
import { BaseManager } from './base';
import { Graph } from '@antv/x6';
import { Scroller } from '@antv/x6-plugin-scroller';
import { Selection } from '@antv/x6-plugin-selection';
import { History } from '@antv/x6-plugin-history';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';

export class GraphManager extends BaseManager {
  graph!: Graph;

  constructor(muse: Muse) {
    super(muse);
  }

  init() {
    this.graph = new Graph({
      container: this.muse.container,
      width: 80000,
      height: 80000,
      background: {
        color: '#F2F7FA'
      }
    });
    this.graph.use(
      new Scroller({
        graph: this.graph,
        enabled: true,
        pannable: true
      })
    );
    this.graph.use(
      new Selection({
        enabled: true
      })
    );
    this.graph.use(
      new History({
        enabled: true
      })
    );
    this.graph.use(
      new Snapline({
        enabled: true,
        resizing: true
      })
    );
    this.graph.use(
      new Transform({
        resizing: {
          enabled: true
        },
        rotating: {
          enabled: true
        }
      })
    );
    this.graph.addNode({
      shape: 'rect',
      x: 100,
      y: 40,
      width: 100,
      height: 40
    });
  }
}