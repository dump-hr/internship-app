import { CodingLanguage } from '@internship-app/types';
import Editor from '@monaco-editor/react';
import { Button, ButtonGroup } from '@mui/material';
import type { FC } from 'react';

import { CodeRunner } from '../CodeRunner/CodeRunner';
import c from './CodeEditor.module.css';

type Props = {
  language: CodingLanguage;
  code: string;
  setCode: (code: string) => void;
  questionTitle: string;
  questionText: string;
  nextQuestion: () => void;
  prevQuestion: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  headerHeight?: number;
};

export const CodeEditor: FC<Props> = ({
  language,
  code,
  setCode,
  questionTitle,
  questionText,
  nextQuestion,
  prevQuestion,
  isFirstQuestion,
  isLastQuestion,
  headerHeight = 64,
}) => {
  return (
    <main className={c.main}>
      <Editor
        height={`calc(100vh - ${headerHeight}px)`}
        theme="vs-dark"
        language={language.toLowerCase()}
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

      <div
        className={c.sidebar}
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
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
        <div
          className={c.text}
          dangerouslySetInnerHTML={{ __html: questionText }}
        ></div>

        <div className={c.terminal}>
          <CodeRunner code={code} language={language} />
        </div>
      </div>
    </main>
  );
};
