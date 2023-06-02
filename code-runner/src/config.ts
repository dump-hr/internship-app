export const languageConfig = [
  { language: "python", extension: "py", command: "python3 {file}" },
  {
    language: "csharp",
    extension: "cs",
    command: `echo '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net7.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup></Project>' > tmp.csproj && dotnet run`,
  },
];
