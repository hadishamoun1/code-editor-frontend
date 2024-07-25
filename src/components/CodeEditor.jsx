import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("# Write your code here");
  const [language, setLanguage] = useState("python"); // Default language is Python

  return (
    <div style={{ height: "90vh", border: "1px solid #ddd" }}>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="cpp">C++</option>
      </select>
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(newValue) => setCode(newValue)}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          theme: "vs-dark",
        }}
      />
    </div>
  );
};

export default CodeEditor;
