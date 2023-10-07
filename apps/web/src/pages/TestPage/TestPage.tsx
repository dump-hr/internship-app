import { CodingLanguage } from '@internship-app/types';
import CodeEditor from '@monaco-editor/react';
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRoute } from 'wouter';

import { useStartTestSlot } from '../../api/useStartTestSlot';
import DUMPLogo from '../../assets/dump-logo.png';
import { Path } from '../../constants/paths';
import { startingPrograms } from '../../constants/startingPrograms';
import { useLocalSave } from '../../hooks/useLocalSave';
import c from './TestPage.module.css';

const TestPage = () => {
  const [, params] = useRoute(Path.Test);
  const [code, setCode] = useState<string[]>([]);
  const [language, setLanguage] = useState(CodingLanguage.JavaScript);
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const { data, mutateAsync } = useStartTestSlot();

  useLocalSave(
    !!data,
    `code:${data?.id}:${email.toLowerCase()}`,
    code,
    (code) => setCode(code as string[]),
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleStart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail) {
      toast.error('Invalid email');
      return;
    }

    const { testQuestions } = await mutateAsync({
      testSlotId: params?.testSlotId ?? '',
      internEmail: email,
    });

    setCode(testQuestions.map(() => startingPrograms[language]));
  };

  if (!data) {
    return (
      <>
        <header className={c.header}>
          <div className={c.logoContainer}>
            <img className={c.logo} src={DUMPLogo} alt="DUMP Logo" />
            <h3 className={c.text}>Internship - Dev ispit</h3>
          </div>
        </header>
        <form className={c.startForm} onSubmit={handleStart}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmail}
            helperText={!isValidEmail ? 'Please enter valid email' : ''}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </>
    );
  }

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
                setCode((prev) =>
                  prev.map((_, i) =>
                    i === selectedQuestion ? startingPrograms[language] : _,
                  ),
                );
              }}
            >
              {Object.values(CodingLanguage).map((language) => (
                <MenuItem value={language} key={language}>
                  {language}
                </MenuItem>
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
          value={code[selectedQuestion]}
          onChange={(code) =>
            setCode((prev) =>
              prev.map((_, i) => (i === selectedQuestion ? code ?? '' : _)),
            )
          }
        />

        <div className={c.sidebar}>
          <div className={c.task}>
            <div className={c.taskHeader}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button
                  disabled={selectedQuestion === 0}
                  onClick={() => setSelectedQuestion((prev) => prev - 1)}
                >
                  Prethodni
                </Button>
                <Button
                  disabled={selectedQuestion === data.testQuestions.length - 1}
                  onClick={() => setSelectedQuestion((prev) => prev + 1)}
                >
                  Sljedeći
                </Button>
              </ButtonGroup>

              <h2 className={c.title}>
                {data.testQuestions[selectedQuestion].title}
              </h2>
            </div>
            <p className={c.text}>
              {data.testQuestions[selectedQuestion].text}
            </p>
          </div>

          <div className={c.terminal}>terminal</div>
        </div>
      </main>
    </>
  );
};

export default TestPage;
