import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { editor } from "monaco-editor";

const supportedLanguages = ["javascript", "typescript", "python", "csharp"];

function App() {
  const [language, setLanguage] = useState(supportedLanguages[2]);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function showValue() {
    alert(editorRef.current?.getValue());
  }

  return (
    <div>
      <nav>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {supportedLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <button onClick={showValue}>Show value</button>
      </nav>
      <Editor
        height="95vh"
        width="50vw"
        theme="vs-dark"
        language={language}
        defaultValue={`
def a():
    b = input('hi:')
    print('echo:'+b)

a()
a()
a()
print('success')`}
        onMount={(editor) => (editorRef.current = editor)}
      />
    </div>
  );
}

export default App;
