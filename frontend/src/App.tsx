import { useState } from "react";
import Editor from "@monaco-editor/react";

import CodeRunner from "./components/codeRunner";

const supportedLanguages = ["javascript", "typescript", "python", "csharp"];

function App() {
  const [code, setCode] = useState(`
def a():
    b = input('hi:')
    print('echo:'+b)

a()
a()
a()
print('the end')`);
  const [language, setLanguage] = useState(supportedLanguages[2]);

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
          value={code}
          onChange={(code) => setCode(code ?? "")}
        />
        <div className="sidebar">
          <div className="content">zadatak</div>
          <CodeRunner code={code} />
        </div>
      </div>
    </div>
  );
}

export default App;
