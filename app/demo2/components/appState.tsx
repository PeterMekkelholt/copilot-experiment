"use client";

import { useCopilotReadable } from "@copilotkit/react-core";
import { use, useState } from "react";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { useCopilotAction } from "@copilotkit/react-core";
import {
  useMakeCopilotDocumentReadable,
  DocumentPointer,
} from "@copilotkit/react-core";
import * as actions from "../_actions";
import dynamic from "next/dynamic";

const DocumentEditor = dynamic(() => import("./document"), { ssr: false });
const AppState = ({ children }) => {
  const [state, setState] = useState({
    userName: "Rust Cohle",
    userAddress: {
      street: "4500 Old Spanish Trail",
      city: "New Orleans",
      state: "LA",
      zip: "70129",
    },
  });

  //const [state, setState] = useState(myAppState);
  const [text, setText] = useState("");
  const [content, setContent] = useState("");

  function changeName() {
    console.log("changing name");
    setState({ ...state, userName: "Marty Hart" });
  }

  const document: DocumentPointer = {
    id: "2",
    name: "Travel Pet Peeves",
    sourceApplication: "Google Docs",
    iconImageUri: "/images/GoogleDocs.svg",
    getContents: () => {
      return "hello document";
    },
  } as DocumentPointer;

  useMakeCopilotDocumentReadable(document); // You can pass top-level data to the Copilot engine by calling `useCopilotReadable`.
  const employeeContextId = useCopilotReadable({
    description: "App state name",
    value: state,
  });

  useCopilotAction({
    name: "updateDetails",
    description: "Updates the users details.",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "name of the person greet and update",
      },
    ],
    handler: async ({ name }) => {
      alert(`Hello, ${name}!`);
      setText(`Hello, ${name}!`);
      const newAddress = { street: "1234 New Path Way", city: "Baton Rouge" };
      setState((prevUser) => ({
        ...prevUser,
        userAddress: {
          ...prevUser.userAddress,
          ...newAddress,
        },
      }));
    },
    render: ({ status, args, result }) => (
      <div>{status === "complete" ? "(Alpha) Done!" : "Processing..."}</div>
    ),
  });

  useCopilotAction({
    name: "insertDocument",
    description: 'Inserts contents to the "Results" div.',
    parameters: [
      {
        name: "new_content",
        type: "string",
        description: "the new content to add ton the results div",
      },
    ],
    handler: async ({ new_content }) => {
      setContent(new_content);
    },
    render: ({ status, args, result }) => (
      <div>{status === "complete" ? "Beta Done!" : "Processing..."}</div>
    ),
  });

  return (
    <div>
      <h1>Interaction Test</h1>
      <p>
        The current user is: <span className="font-bold">{state.userName}</span>
      </p>
      <p>Street: {state.userAddress.street}</p>
      <p>City: {state.userAddress.city}</p>
      <p>State: {state.userAddress.state}</p>
      <p>Zip: {state.userAddress.zip}</p>
      <br />
      <br />
      <button className="bg-blue-500 p-2 rounded" onClick={changeName}>
        Change name
      </button>
      <br />
      <br />
      <CopilotTextarea
        className="px-4 py-4 bg-blue-100 border border-grey-900 border-4 rounded-lg w-full"
        value={text}
        onValueChange={(value: string) => setText(value)}
        placeholder="What are your plans for your vacation?"
        autosuggestionsConfig={{
          textareaPurpose:
            "Travel notes from the user's previous vacations. Likely written in a colloquial style, but adjust as needed.",
          chatApiConfigs: {
            suggestionsApiConfig: {
              forwardedParams: {
                max_tokens: 20,
                stop: [".", "?", "!"],
              },
            },
          },
        }}
      />
      <div id="results">
        <p>This is the results div</p>
        <p>{content}</p>
      </div>
      <p>Document</p>
      <DocumentEditor />
    </div>
  );
};

export default AppState;
