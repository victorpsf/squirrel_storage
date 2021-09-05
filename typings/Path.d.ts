declare namespace Path {
  interface PathParse {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
  }
}

declare interface Path {
  basePath: string;
  join(arguments: string[]): string;
  joinAndUseBasePath(arguments: string[]): string;
  pathParser(argument: string): Path.PathParse;
  pathDir(argument: string): string;
}

export = Path