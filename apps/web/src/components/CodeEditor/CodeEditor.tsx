import Editor from '@monaco-editor/react';
import { Button, ButtonGroup } from '@mui/material';
import React from 'react';

import { CodeRunner } from '../CodeRunner/CodeRunner';
import c from './CodeEditor.module.css';

type Props = {
  language: string;
  code: string;
  setCode: (code: string) => void;
  questionTitle: string;
  questionText: string;
  nextQuestion: () => void;
  prevQuestion: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
};

export const CodeEditor: React.FC<Props> = ({
  language,
  code,
  setCode,
  questionTitle,
  questionText,
  nextQuestion,
  prevQuestion,
  isFirstQuestion,
  isLastQuestion,
}) => {
  return (
    <main className={c.main}>
      <Editor
        height="calc(100vh - 64px)"
        theme="vs-dark"
        language={language}
        options={{
          quickSuggestions: {
            other: false,
            comments: false,
            strings: false,
          },
          parameterHints: {
            enabled: false,
          },
          suggestOnTriggerCharacters: false,
          acceptSuggestionOnEnter: 'off',
          tabCompletion: 'off',
          wordBasedSuggestions: false,
        }}
        value={code}
        onChange={(code) => setCode(code ?? '')}
      />

      <div className={c.sidebar}>
        <div className={c.task}>
          <div className={c.taskHeader}>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button disabled={isFirstQuestion} onClick={() => prevQuestion()}>
                Prethodni
              </Button>
              <Button disabled={isLastQuestion} onClick={() => nextQuestion()}>
                Sljedeći
              </Button>
            </ButtonGroup>

            <h2 className={c.title}>{questionTitle}</h2>
          </div>
          <p className={c.text}>{questionText}</p>
        </div>

        <CodeRunner />
      </div>
    </main>
  );
};
