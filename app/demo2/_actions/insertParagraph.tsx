import { useCopilotAction } from "@copilotkit/react-core";
import { BlockNoteEditor } from "@blocknote/core";

export const useInsertParagraph = (editor: BlockNoteEditor) => {
  useCopilotAction({
    name: "insertParagraphs",
    description:
      "Function to insert new paragraph blocks. Pass an array of content to insert one or more paragraphs.",
    parameters: [
      {
        name: "referenceId",
        description:
          "The ID of the block to insert the new blocks before or after.",
        type: "string",
      },
      {
        name: "placement",
        description:
          'Whether to insert the blocks before or after the reference block. Valid values are "before" or "after".',
        type: "string",
      },
      {
        name: "content",
        description: "An array of the content of the new blocks",
        type: "string[]",
      },
    ],
    handler: async ({
      content,
      referenceId,
      placement,
    }: {
      content: string[];
      referenceId: string;
      placement: string;
    }) => {
      return editor.insertBlocks(
        content.map((c) => ({ content: c, type: "paragraph" })),
        referenceId,
        placement as "before" | "after"
      );
    },
    render: ({ status, args, result }) => (
      <div>{status === "complete" ? "(Delta) Done!" : "Processing..."}</div>
    ),
  });
};
