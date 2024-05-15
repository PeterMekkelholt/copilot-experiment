"use client";

import { useCopilotReadable } from "@copilotkit/react-core";
import { useState } from "react";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { useCopilotAction } from "@copilotkit/react-core";
// import {
//   useMakeCopilotDocumentReadable,
//   DocumentPointer,
// } from "@copilotkit/react-core";

const AppState = ({ children }) => {
  const [address, setAddress] = useState({
    userName: "Rust Cohle",
    userAddress: {
      street: "4500 Old Spanish Trail",
      city: "New Orleans",
      state: "LA",
      zip: "70129",
    },
  });

  const [textArea, setTextArea] = useState("");
  const [content, setContent] = useState("");

  function changeName() {
    console.log("changing name");
    setAddress({ ...address, userName: "Marty Hart" });
  }

  // const document: DocumentPointer = {
  //   id: "2",
  //   name: "Travel Pet Peeves",
  //   sourceApplication: "Google Docs",
  //   iconImageUri: "/images/GoogleDocs.svg",
  //   getContents: () => {
  //     return "hello document";
  //   },
  // } as DocumentPointer;

  // useMakeCopilotDocumentReadable(document); // You can pass top-level data to the Copilot engine by calling `useCopilotReadable`.

  //  const employeeContextId = useCopilotReadable({
  useCopilotReadable({
    description: "Current users details",
    value: address,
  });

  useCopilotAction({
    name: "updateDetails",
    description: "Updates the users details.",
    parameters: [
      {
        name: "current_user_name",
        type: "string",
        description: "name of the person greet and update",
      },
    ],
    handler: async ({ current_user_name }) => {
      alert(`Updating, ${current_user_name}!`);
      setTextArea(`Hello, ${current_user_name}!`);
      const newAddress = { street: "1234 New Path Way", city: "Baton Rouge" };
      setAddress((prevAddress) => ({
        ...prevAddress,
        userAddress: {
          ...prevAddress.userAddress,
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
      <code>
        <ul>
          <li>
            Ask copilot "who is the current user?" to confirm it can access
            state{" "}
          </li>
          <li>Click "Change name" and confirm copilot reads the new name</li>
          <li>
            Ask copilot to update the Users details to confirm copilot can
            access `address` state variable and update it. And also update the
            var in textArea
          </li>
          <li>Ask copilot to insert a paragraph in the "Results" div </li>
        </ul>
      </code>
      <p>
        The current user is:{" "}
        <span className="font-bold">{address.userName}</span>
      </p>
      <p>Street: {address.userAddress.street}</p>
      <p>City: {address.userAddress.city}</p>
      <p>State: {address.userAddress.state}</p>
      <p>Zip: {address.userAddress.zip}</p>
      <br />
      <br />
      <button className="bg-blue-500 p-2 rounded" onClick={changeName}>
        Change name
      </button>
      <br />
      <br />
      <CopilotTextarea
        className="px-4 py-4 bg-blue-100 border border-grey-900 border-4 rounded-lg w-full"
        value={textArea}
        onValueChange={(value: string) => setTextArea(value)}
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
        <h2>Results div</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default AppState;
