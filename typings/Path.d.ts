declare namespace Path {
  interface PathParse {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
  }
}

class Path {
  static basePath: string;
  static join(arguments: string[]): string;
  static joinAndUseBasePath(arguments: string[]): string;
  static pathParser(argument: string): Path.PathParse;
  static pathDir(argument: string): string;
}

export = Path