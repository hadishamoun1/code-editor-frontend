import { Box, Button, HStack, Select, VStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";
import debounce from 'lodash.debounce';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [codeId, setCodeId] = useState(null); // To track the code ID for saving and updating
  const [codeList, setCodeList] = useState([]); // To store the list of codes
  const [selectedCode, setSelectedCode] = useState(null); // To track selected code
  const [copilotSuggestion, setCopilotSuggestion] = useState("");

  useEffect(() => {
    if (selectedCode) {
      setValue(selectedCode.content);
      setCodeId(selectedCode.id);
    }
  }, [selectedCode]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const getUserId = () => {
    // Retrieve user_id from session storage
    return sessionStorage.getItem("user_id");
  };

  const user_id = getUserId();

  const saveCode = async () => {
    if (!user_id) {
      console.error("User ID is not available in session storage.");
      return;
    }

    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const title = "My Code";

      try {
        if (codeId) {
          // Update existing code
          await axios.put(`http://localhost:8000/api/code/${codeId}`, {
            user_id,
            title,
            content: code,
            language,
          });
        } else {
          // Save new code
          const response = await axios.post("http://localhost:8000/api/code", {
            user_id,
            title,
            content: code,
            language,
          });
          setCodeId(response.data.id);
        }
        loadCodeList(); // Refresh the list after saving
      } catch (error) {
        console.error("Error saving code:", error);
      }
    }
  };

  const loadCodeList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/code?user_id=${user_id}`
      );
      setCodeList(response.data);
    } catch (error) {
      console.error("Error loading code list:", error);
    }
  };

  const loadCode = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/code/${id}`);
      setSelectedCode(response.data);
    } catch (error) {
      console.error("Error loading code:", error);
    }
  };

  const fetchCopilotSuggestions = async (code) => {
    if (!code.trim()) return;
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: value },
          ],
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          },
        }
      );
       setCopilotSuggestion(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Failed to fetch suggestions from Copilot:", error);
      return "Error fetching suggestions.";
    }
  };

  const debouncedFetchSuggestions = debounce(fetchCopilotSuggestions, 1000);

  const onEditorChange = (newValue, event) => {
    setValue(newValue);
    debouncedFetchSuggestions(newValue);
  };
  useEffect(() => {
    fetchCopilotSuggestions(value); // Optionally fetch initial suggestions when the component mounts
  }, []);

  useEffect(() => {
    loadCodeList(); // Load the code list when the component mounts
  }, []);

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <HStack spacing={2} mb={4}>
            <Button onClick={saveCode} bg="#00C0A3">
              Save
            </Button>
            <Button onClick={() => loadCodeList()} bg="#00C0A3">
              Refresh List
            </Button>
          </HStack>
          <VStack spacing={4} mb={4}>
            <Select
              placeholder="Select a code snippet"
              onChange={(e) => loadCode(e.target.value)}
              value={selectedCode ? selectedCode.id : ""}
            >
              {codeList.map((code) => (
                <option key={code.id} value={code.id}>
                  {code.title}
                </option>
              ))}
            </Select>
          </VStack>
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={onEditorChange}
          />
        </Box>
        <Output editorRef={editorRef} language={language} copilotSuggestion={copilotSuggestion}/>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
