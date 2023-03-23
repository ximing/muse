// import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';
import '@remirror/styles/extension-gap-cursor.css';
import './editor.css';
import css from 'refractor/lang/css.js';
import javascript from 'refractor/lang/javascript.js';
import json from 'refractor/lang/json.js';
import markdown from 'refractor/lang/markdown.js';
import typescript from 'refractor/lang/typescript.js';
import html from 'refractor/lang/cshtml';
import {
  BoldExtension,
  BlockquoteExtension,
  UnderlineExtension,
  ItalicExtension,
  CalloutExtension,
  CodeBlockExtension,
  CodeExtension,
  DropCursorExtension,
  ImageExtension,
  FontFamilyExtension,
  FontSizeExtension,
  GapCursorExtension,
  HardBreakExtension,
  HeadingExtension,
  HistoryExtension,
  HorizontalRuleExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  LinkExtension,
  TableExtension,
  TextColorExtension,
  TextCaseExtension,
  TextHighlightExtension
} from 'remirror/extensions';
import { useRemirror, Remirror } from '@remirror/react';
import { EditorState } from '@remirror/pm';
import { Extension, RemirrorEventListenerProps } from 'remirror';

const extensions = () => [
  new TableExtension(),
  new BoldExtension({}),
  new TextColorExtension({}),
  new TextCaseExtension({}),
  new TextHighlightExtension({}),
  new BlockquoteExtension(),
  new UnderlineExtension(),
  new ItalicExtension(),
  new CalloutExtension({}),
  new CodeBlockExtension({
    supportedLanguages: [css, javascript, json, markdown, typescript, html]
  }),
  new CodeExtension(),
  new ImageExtension(),
  new DropCursorExtension(),
  new FontFamilyExtension(),
  new FontSizeExtension({}),
  new GapCursorExtension(),
  new HardBreakExtension(),
  new BulletListExtension({}),
  new OrderedListExtension(),
  new TaskListExtension(),
  new HeadingExtension({}),
  new HistoryExtension({}),
  new HorizontalRuleExtension(),
  new LinkExtension({ autoLink: true })
];

export function MuseEditor(props: {
  width: number;
  height: number;
  state: any;
  onChange: (state: EditorState) => void;
  onFocus?: (
    params: RemirrorEventListenerProps<Extension>,
    event: Event
  ) => void;
  onBlur?: (
    params: RemirrorEventListenerProps<Extension>,
    event: Event
  ) => void;
}) {
  const { manager, state, setState } = useRemirror({
    extensions,
    content: { type: 'doc', content: [{ type: 'paragraph' }] }
  });
  return (
    <div
      className={'muse-editor'}
      style={{ width: props.width, height: props.height }}
    >
      <Remirror
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        manager={manager}
        state={state}
        // onChange={onChange}
        onChange={(parameter) => {
          let nextState = parameter.state;
          // // Check if the document content for the editor changed.
          // if (parameter.tr?.docChanged) {
          //   // Insert text into the editor via a new state.
          //   nextState = state.applyTransaction(
          //     state.tr.insertText(' NO!!!')
          //   ).state;
          // }
          // Update the state to the latest value.
          props.onChange(nextState);
          setState(nextState);
        }}
      />
    </div>
  );
}
