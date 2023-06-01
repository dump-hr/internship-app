import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { editor } from "monaco-editor";
import CodeRunner from "./components/codeRunner";

const supportedLanguages = ["javascript", "typescript", "python", "csharp"];

function App() {
  const [language, setLanguage] = useState(supportedLanguages[2]);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  return (
    <div>
      <nav>
        <h1>DUMP Dev ispit</h1>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {supportedLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </nav>

      <div className="layout">
        <Editor
          height="calc(100vh - 4 * 24px)"
          theme="vs-dark"
          language={language}
          defaultValue={`
def a():
    b = input('hi:')
    print('echo:'+b)

a()
a()
a()
print('the end')`}
          onMount={(editor) => (editorRef.current = editor)}
        />
        <div className="sidebar">
          <div className="content">zadatak</div>
          <CodeRunner
            getCode={() => editorRef.current?.getValue().trim() ?? ""}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
