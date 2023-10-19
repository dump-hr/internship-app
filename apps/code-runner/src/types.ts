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
