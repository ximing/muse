import { register } from '@antv/x6-react-shape';
import { MuseEditor } from '@typoer/editor';
import { Graph, Node } from '@antv/x6';

export const EditorShape = 'mose-editor';

const NodeComponent = (props: { node: Node; graph: Graph }) => {
  const prop = props.node.getProp();
  const { width, height } = prop.size || { width: 100, height: 40 };
  return (
    <div
      className="react-node"
      style={{
        height,
        width
      }}
    >
      <MuseEditor
        width={width}
        height={height}
        state={{}}
        onChange={(state) => {}}
        onFocus={() => {
          props.node.setData({ disableMove: true });
          props.graph.lockScroller();
          props.graph.disablePanning();
        }}
        onBlur={() => {
          props.node.setData({ disableMove: false });
          props.graph.unlockScroller();
          props.graph.enablePanning();
        }}
      />
    </div>
  );
};
register({
  shape: EditorShape,
  width: 300,
  height: 100,
  component: NodeComponent,
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 5,
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            magnet: true,
            stroke: '#8f8f8f',
            r: 5,
          },
        },
      },
    },
  },
});
