import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import { CodeRunner } from "./components/CodeRunner";

const supportedLanguages = ["python", "csharp", "javascript"];
const defaultPrograms = {
  python: `
print("sretno na ispitu!")
text = input("input: ")
print("echo: " + text)
`,
  csharp: `
Console.WriteLine("sretno na ispitu!");
Console.Write("input: ");
var text = Console.ReadLine();
Console.WriteLine("echo: " + text);
`,
  javascript: `
console.log("sretno na ispitu!");
const text = prompt("input: ");
console.log("echo: " + text);
`,
};

function App() {
  const [code, setCode] = useState(defaultPrograms["python"]);
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    setCode(defaultPrograms[language as keyof typeof defaultPrograms] ?? "");
  }, [language]);

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
          <CodeRunner code={code} language={language} />
        </div>
      </div>
    </div>
  );
}

export default App;
