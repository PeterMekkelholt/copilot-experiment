import { useCopilotAction } from "@copilotkit/react-core";
import { BlockNoteEditor } from "@blocknote/core";

export const useInsertHeading = (editor: BlockNoteEditor) => {
  useCopilotAction({
    name: "insertHeading",
    description: "Function to insert a new heading block.",
    parameters: [
      {
        name: "referenceId",
        description:
          "The ID of the block to insert the new block before or after. Required.",
        type: "string",
      },
      {
        name: "placement",
        description:
          'Whether to insert the block before or after the reference block. Valid values are "before" or "after".',
        type: "string",
      },
      {
        name: "content",
        description: "The content of the new block",
        type: "string",
      },
      {
        name: "level",
        description: "The level of the heading. Can only be 1, 2, 3",
        type: "number",
      },
    ],
    handler: async ({
      content,
      referenceId,
      placement,
      level,
    }: {
      content: string;
      referenceId: string;
      placement: string;
      level: number;
    }) => {
      return editor.insertBlocks(
        [
          {
            content,
            type: "heading",
            props: {
              level: level as 1 | 2 | 3,
            },
          },
        ],
        referenceId,
        placement as "before" | "after"
      );
    },
  });
};
