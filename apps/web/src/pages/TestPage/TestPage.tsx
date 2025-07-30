import { CodingLanguage } from '@internship-app/types';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRoute } from 'wouter';

import { useStartTestSlot } from '../../api/useStartTestSlot';
import { useSubmitTestSlot } from '../../api/useSubmitTestSlot';
import c from './TestPage.module.css';
import { Countdown, CodeEditor, ConfirmDialog } from '@components/index';
import { Path } from '@constants/paths';
import { startingPrograms } from '@constants/startingPrograms';
import DUMPLogo from '../../assets/dump-logo.png';
import { useLocalSave } from '../../hooks/index';

type Answer = {
  isDirty: boolean;
  currentLanguage: CodingLanguage;
  codes: {
    [key in CodingLanguage]?: string;
  };
};

export const TestPage = () => {
  const [, params] = useRoute(Path.Test);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  const { data, ...startTest } = useStartTestSlot();
  const submitTest = useSubmitTestSlot();

  useLocalSave(
    !!data,
    `answers:${data?.id}:${email.toLowerCase()}`,
    answers,
    (answers) => setAnswers(answers as Answer[]),
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

    const { testQuestions } = await startTest.mutateAsync({
      testSlotId: params?.testSlotId ?? '',
      internEmail: email,
    });

    setAnswers(
      testQuestions.map(
        () =>
          ({
            isDirty: false,
            currentLanguage: CodingLanguage.JavaScript,
            codes: {
              [CodingLanguage.JavaScript]:
                startingPrograms[CodingLanguage.JavaScript],
            },
          }) as Answer,
      ),
    );
  };

  const handleSubmit = async () => {
    if (!data) return;
    await submitTest.mutateAsync({
      testSlotId: data.id,
      internEmail: email,
      answers: data.testQuestions.map((q, i) => ({
        questionId: q.id,
        code: answers[i].codes[answers[i].currentLanguage] ?? '',
        language: answers[i].currentLanguage,
      })),
    });
  };

  const handleChangeLanguage = (language: CodingLanguage, index: number) => {
    setAnswers((prev) =>
      prev.map((ans, i) =>
        i === index
          ? {
              ...ans,
              isDirty: true,
              currentLanguage: language,
              codes: {
                ...ans.codes,
                [language]: ans.codes[language]
                  ? ans.codes[language]
                  : startingPrograms[language],
              },
            }
          : ans,
      ),
    );
  };

  useEffect(() => {
    setAnswers((prev) => {
      if (!selectedQuestion || prev[selectedQuestion].isDirty) return prev;

      const prevLang = prev[selectedQuestion - 1].currentLanguage;
      return prev.map((ans, i) =>
        i === selectedQuestion
          ? {
              ...ans,
              currentLanguage: prevLang,
              codes: { ...ans.codes, [prevLang]: startingPrograms[prevLang] },
            }
          : ans,
      );
    });
  }, [selectedQuestion]);

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
            size="small"
            value={email}
            onChange={handleEmailChange}
            error={!isValidEmail}
            helperText={!isValidEmail ? 'Please enter valid email' : ''}
          />
          <Button type="submit" variant="contained" color="secondary">
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
          <Countdown toDate={new Date(data.end)} />
          {email}
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="language-select">Language</InputLabel>
            <Select
              labelId="language-select"
              value={answers[selectedQuestion].currentLanguage}
              label="Language"
              onChange={(e) => {
                const language = e.target.value as CodingLanguage;
                handleChangeLanguage(language, selectedQuestion);
              }}
            >
              {Object.values(CodingLanguage).map((language) => (
                <MenuItem value={language} key={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setSubmitDialogOpen(true)}
          >
            Predaj ispit
          </Button>
        </div>
      </header>

      <CodeEditor
        language={answers[selectedQuestion].currentLanguage}
        code={
          answers[selectedQuestion].codes[
            answers[selectedQuestion].currentLanguage
          ] ?? ''
        }
        setCode={(code) => {
          setAnswers((prev) =>
            prev.map((ans, i) =>
              i === selectedQuestion
                ? {
                    ...ans,
                    isDirty: true,
                    codes: { ...ans.codes, [ans.currentLanguage]: code ?? '' },
                  }
                : ans,
            ),
          );
        }}
        questionTitle={data.testQuestions[selectedQuestion].title}
        questionText={data.testQuestions[selectedQuestion].text}
        nextQuestion={() => setSelectedQuestion((prev) => prev + 1)}
        prevQuestion={() => setSelectedQuestion((prev) => prev - 1)}
        isFirstQuestion={selectedQuestion === 0}
        isLastQuestion={selectedQuestion === data.testQuestions.length - 1}
      />

      <ConfirmDialog
        open={!!submitDialogOpen}
        handleClose={(confirmed) => {
          if (confirmed) handleSubmit();
          setSubmitDialogOpen(false);
        }}
        title="Potvrdi predaju ispita"
        description="Oprezno - nije moguće ponovo otvoriti ispit nakon predaje."
      />
    </>
  );
};
