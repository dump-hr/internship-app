export type TestCase = {
  input: string[];
  output: string[];
};

export type TestCluster = {
  id: string;
  maxExecutionTime: number;
  maxMemory: number;
  points: number;
  testQuestionId: string;
  isSample: boolean;
};

export type TestClusterWithTestCases = TestCluster & {
  testCases: TestCase[];
};
