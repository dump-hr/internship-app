import { CodingLanguage } from '@internship-app/types';
import CodeEditor from '@monaco-editor/react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';

// import { useRoute } from 'wouter';
import DUMPLogo from '../../assets/dump-logo.png';
// import { Path } from '../../constants/paths';
import { startingPrograms } from '../../constants/startingPrograms';
import c from './TestPage.module.css';

const TestPage = () => {
  // const [, params] = useRoute(Path.Test);
  const [code, setCode] = useState(startingPrograms[CodingLanguage.JavaScript]);
  const [language, setLanguage] = useState(CodingLanguage.JavaScript);

  return (
    <>
      <header className={c.header}>
        <div className={c.logoContainer}>
          <img className={c.logo} src={DUMPLogo} alt="DUMP Logo" />
          <h3 className={c.text}>Internship - Dev ispit</h3>
        </div>

        <div className={c.actions}>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="language-select">Language</InputLabel>
            <Select
              labelId="language-select"
              value={language}
              label="Language"
              onChange={(e) => {
                const language = e.target.value as CodingLanguage;
                setLanguage(language);
                setCode(startingPrograms[language]);
              }}
            >
              {Object.values(CodingLanguage).map((language) => (
                <MenuItem value={language}>{language}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained">Predaj ispit</Button>
        </div>
      </header>

      <main className={c.main}>
        <CodeEditor
          width="55%"
          height="calc(100vh - 64px)"
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

        <div className={c.sidebar}>
          <div className={c.task}>task</div>

          <div className={c.terminal}>terminal</div>
        </div>
      </main>
    </>
  );
};

export default TestPage;
