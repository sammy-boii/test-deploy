// tools.js
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";

import ExtraCues from "./customTools/extraCues/extra-cues";
import FillInTheBlanks from "./customTools/FillInTheBlanks/FillInTheBlanks";
import MCQs from "./customTools/MCQs/MCQs";
import Youtube from "./customTools/youtube/youtube";
import SimpleImage from "./simple-image";

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  simpleImage: SimpleImage,
  heading: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1,
    },
  },
  //   extraCues: {
  //     class: ExtraCues,
  //   },
  youtube: {
    class: Youtube,
  },
  //   MCQs: {
  //     class: MCQs,
  //   },
  //   fillInTheBlanks: {
  //     class: FillInTheBlanks,
  //   },
  raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
};
