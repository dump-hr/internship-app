export type TestCase = {
  input: string[];
  expectedOutput: string[];
};

export type TestCluster = {
  id: string;
  maxExecutionTime: number;
  maxMemory: number;
  points: number;
  testQuestionId: string;
  testQuestionTitle: string;
  isSample: boolean;
};

export type TestClusterWithTestCases = TestCluster & {
  testCases: TestCase[];
};

export interface CreateTestCaseDto {
  input: string[];
  expectedOutput: string[];
}

export interface CreateTestClusterDto {
  maxExecutionTime: number;
  maxMemory: number;
  points: number;
  isSample: boolean;
  testCases: CreateTestCaseDto[];
  testQuestionId: string;
}
