export const languageConfig = [
  { language: "python", extension: "py", command: "python3 {file}" },
  { language: "java", extension: "java", command: "java {file}" },
  {
    language: "csharp",
    extension: "cs",
    // create fake csproj so dotnet can run the file
    command: `echo '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net7.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup></Project>' > tmp.csproj && dotnet build && clear && ./bin/Debug/net7.0/tmp`,
  },
  {
    language: "c",
    extension: "c",
    // insert setvbuf(stdout, NULL, _IONBF, 0); in main function to fix stdout buffer not flushing
    command: `sed -i 's/\\(main(.*{\\)/\\1setvbuf(stdout, NULL, _IONBF, 0);/' file.c && sed -i '/main(/{N;s/\\(\\n{\\)/\\1setvbuf(stdout, NULL, _IONBF, 0);/}' file.c && gcc {file} && ./a.out`,
  },
];
