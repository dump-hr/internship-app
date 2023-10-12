import { CodingLanguage } from './types';

type Config = {
  [key in CodingLanguage]: {
    extension: string;
    command: string;
  };
};

export const config: Config = {
  [CodingLanguage.Python]: {
    extension: 'py',
    command: 'python3 {file}',
  },
  [CodingLanguage.Java]: {
    extension: 'java',
    command: 'java {file}',
  },
  [CodingLanguage.Go]: {
    extension: 'go',
    command: 'go run {file}',
  },
  [CodingLanguage.CPP]: {
    extension: 'cpp',
    command: 'g++ {file} && ./a.out',
  },
  [CodingLanguage.CSharp]: {
    extension: 'cs',
    // create fake csproj so dotnet can run the file
    command: `echo '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net7.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup></Project>' > tmp.csproj && dotnet build && clear && ./bin/Debug/net7.0/tmp`,
  },
  [CodingLanguage.C]: {
    extension: 'c',
    // insert setvbuf(stdout, NULL, _IONBF, 0); in main function to fix stdout buffer not flushing
    command: `sed -i 's/\\(main(.*{\\)/\\1setvbuf(stdout, NULL, _IONBF, 0);/' file.c && sed -i '/main(/{N;s/\\(\\n{\\)/\\1setvbuf(stdout, NULL, _IONBF, 0);/}' file.c && gcc {file} && ./a.out`,
  },
  [CodingLanguage.JavaScript]: {
    extension: 'js',
    command: 'node {file}',
  },
};
