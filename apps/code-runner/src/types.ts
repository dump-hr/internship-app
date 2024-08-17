export enum CodingLanguage {
  JavaScript = 'JavaScript',
  Python = 'Python',
  CSharp = 'CSharp',
  CPP = 'CPP',
  C = 'C',
  Java = 'Java',
  Go = 'Go',
}

export type SpawnProgramRequest = {
  pid: string;
  language: CodingLanguage;
  code: string;
};

export type SendStdinRequest = {
  pid: string;
  text: string;
};

export type TestCase = {
  id: string;
  input: string[];
  expectedOutput: string;
};

export enum TestCaseResult {
  Correct = 'AcceptedAnswer',
  WrongAnswer = 'WrongAnswer',
  TimeLimitExceeded = 'TimeLimitExceeded',
  MemoryLimitExceeded = 'MemoryLimitExceeded',
  RuntimeError = 'RuntimeError',
}

export type CreateEvaluationRequest = {
  testCases: TestCase[];
  code: string;
  codingLanguage: CodingLanguage;
  maxMemory?: number;
  maxExecutionTime?: number;
};

export type EvaluateTestCaseResult = {
  testCaseId: string;
  evaluationStatus: TestCaseResult;
  userOutput: string;
  executionTime?: number;
  memoryUsed?: number;
  error?: string;
};

export type EvaluateClusterResult = {
  testCases: EvaluateTestCaseResult[];
};
