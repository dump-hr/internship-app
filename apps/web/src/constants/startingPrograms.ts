import { CodingLanguage } from '@internship-app/types';

export const startingPrograms = {
  [CodingLanguage.Python]: `
print("sretno na ispitu!")

text = input("input: ")

print("echo: " + text)
`.trim(),
  [CodingLanguage.CSharp]: `
Console.WriteLine("sretno na ispitu!");

Console.Write("input: ");
var text = Console.ReadLine();

Console.WriteLine("echo: " + text);
`.trim(),
  [CodingLanguage.JavaScript]: `
console.log("sretno na ispitu!");

const text = prompt("input: ");

console.log("echo: " + text);
`.trim(),
  [CodingLanguage.Java]: `
import java.util.Scanner;

class Program {
  public static void main(String[] args) {
    System.out.println("sretno na ispitu!"); 

    Scanner scanner = new Scanner(System.in);
    System.out.print("input: ");
    String text = scanner.nextLine();

    System.out.println("echo: " + text); 
  }
}
`.trim(),
  [CodingLanguage.C]: `
#include <stdio.h>

int main() {
  char text[100];

  printf("sretno na ispitu!\\n");

  printf("input: ");
  scanf("%s", text);

  printf("echo: %s\\n", text);

  return 0;
}
`.trim(),
  [CodingLanguage.CPP]: `
#include <iostream>
using namespace std;

int main() {
  string text;

  cout << "sretno na ispitu!" << endl;

  cout << "input: ";
  cin >> text;

  cout << "echo: " << text << endl; 

  return 0;
}
`.trim(),
  [CodingLanguage.Go]: `
package main

import (
  "fmt"
)

func main() {
  var text string

  fmt.Println("sretno na ispitu!")

  fmt.Print("input: ")
  fmt.Scanf("%s", &text)

  fmt.Println("echo:", text)
}
`.trim(),
};
