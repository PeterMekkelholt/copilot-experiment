"use client";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useMakeCopilotReadable } from "@copilotkit/react-core";
import { useCopilotReadable } from "@copilotkit/react-core";

import "@blocknote/core/fonts/inter.css";
import { Block } from "@blocknote/core";
import * as actions from "../_actions";
import "@blocknote/react/style.css";
import "@mantine/core/styles.css";
import { useEffect, useState } from "react";

import { useCopilotAction } from "@copilotkit/react-core";

const Editor = () => {
  const [state, setState] = useState([] as Block[]);
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        props: { level: 1 },
        content: "Results",
      },
      {
        type: "paragraph",
        content: "Following the flow above your results will be pasted here.",
      },
    ],
  });

  function changeName() {
    console.log("changing name");
  }

  useCopilotReadable({
    description: "The blockeditors details",
    value: JSON.stringify(state),
  });
  actions.useInsertParagraph(editor);
  actions.useInsertHeading(editor);
  //   actions.useInsertUnnumberedListItem(editor)
  //   actions.useInsertNumberedListItem(editor)
  //   actions.useSearchCommunities(editor)
  //   actions.useEditBlockContent(editor)
  //   actions.useDeleteBlock(editor)

  useEffect(() => {
    setState(editor?.document);
  }, []);

  useCopilotAction({
    name: "callBrandVoicePrompt",
    description: "Calls the brand voice prompt.",
    parameters: [
      {
        name: "brand_name",
        type: "string",
        description: "name of the person greet and update",
      },
    ],
    handler: async ({ brand_name }) => {
      alert(`Running the brand voice prompt for: ${brand_name}!`);
    },
    render: ({ status, args, result }) => (
      <div>{status === "complete" ? "(Alpha) Done!" : "Processing..."}</div>
    ),
  });
  return (
    <div>
      <h1>Instructions come here</h1>
      <input
        type="brand_name"
        defaultValue={"brand name"}
        className="border-2 border-gray-900 rounded-md"
      />
      <button className="bg-blue-500 p-2 rounded" onClick={changeName}>
        Call brand voice prompt
      </button>
      <textarea
        name="archetypes"
        id="archetypes"
        className="border-2 border-gray-900 rounded-md"
      ></textarea>
      <hr />
      <section className="px-6 py-12">
        <BlockNoteView
          editor={editor}
          theme={"light"}
          onChange={() => {
            setState(editor?.document);
          }}
        />
      </section>
    </div>
  );
};

export default Editor;
