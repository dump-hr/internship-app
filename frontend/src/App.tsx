import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import { CodeRunner } from "./components/CodeRunner";

const supportedLanguages = [
  "python",
  "csharp",
  "javascript",
  "java",
  "c",
  "cpp",
  "go",
];
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
  java: `
import java.util.Scanner;

class Program {
  public static void main(String[] args) {
    System.out.println("sretno na ispitu!"); 

    Scanner scanner = new Scanner(System.in);
    System.out.print("input: ");
    String text = scanner.nextLine();

    System.out.println("echo: " + text); 
  }
}
`,
  c: `
#include <stdio.h>

int main() {
  char text[100];

  printf("sretno na ispitu!\\n");

  printf("input: ");
  scanf("%s", text);

  printf("echo: %s\\n", text);

  return 0;
}
`,
  cpp: `
#include <iostream>
using namespace std;

int main() {
  string text;

  cout << "sretno na ispitu!" << endl;

  cout << "input: ";
  cin >> text;
  cout << "echo: " << text << endl; 

  return 0;
}
`,
  go: `
package main

import (
  "fmt"
)

func main() {
  var text string

  fmt.Println("sretno na ispitu!")

  fmt.Print("input: ")
  fmt.Scanf("%s", &text)
  fmt.Println("echo:", text)
}
`,
};

function App() {
  const [code, setCode] = useState(defaultPrograms["python"].trim());
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    setCode(
      defaultPrograms[language as keyof typeof defaultPrograms].trim() ?? ""
    );
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
