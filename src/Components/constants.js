
const monacoLanguages = [];
const languages = [
  "js",
  "typescript5",
  "py",
  "java",
  "cpp",
  "gcc",
  "go",
];
const boilerplateCode = {
  javascript: `// JavaScript Boilerplate
  function greet(name) {
    return 'Hello, ' + name;
  }
  
  console.log(greet('World'));`,

  typescript: `// TypeScript Boilerplate
  function greet(name: string): string {
    return 'Hello, ' + name;
  }
  
  console.log(greet('World'));`,

  python: `# Python Boilerplate
  def greet(name):
      return "Hello, " + name
  
  print(greet("World"))`,

  java: `// Java Boilerplate
  public class Main {
    public static void main(String[] args) {
      System.out.println(greet("World"));
    }
  
    public static String greet(String name) {
      return "Hello, " + name;
    }
  }`,

  cpp: `// C++ Boilerplate
  #include <iostream>
  using namespace std;
  
  string greet(string name) {
      return "Hello, " + name;
  }
  
  int main() {
      cout << greet("World") << endl;
      return 0;
  }`,

  csharp: `// C# Boilerplate
  using System;
  
  class Program {
      static void Main() {
          Console.WriteLine(Greet("World"));
      }
  
      static string Greet(string name) {
          return "Hello, " + name;
      }
  }`,

  bash: `#!/bin/bash
  echo "Hello, World!"`,

  c: `#include <stdio.h>
  
  int main() {
      printf("Hello, World!\\n");
      return 0;
  }`,

  go: `package main
  
  import "fmt"
  
  func main() {
      fmt.Println("Hello, World!")
  }`
};

export { monacoLanguages, boilerplateCode,languages };
