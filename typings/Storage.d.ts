type contents = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'base64url' | 'latin1' | 'binary' | 'hex'

declare namespace Storage {
  interface ConstructorStorage {
    useWorkspace?: boolean;
    createDirIfNotExists?: boolean; 
  }
}

declare class Storage {
  constructor(option: Storage.ConstructorStorage, path: string[]);
  SetType(content: contents): Storage;
  GetType(): contents;
  FullPath(): string;
  ListDirSync(): string[];
  Exists(): boolean;
  CreateDir(): void;
  DeleteFileSync(): void;
  WriteFileSync(filename: string, value: any): void;
  AppendFileSync(filename: string, value: any): void;
  ReadFileSync(filename: string): void;
  static Disk(option: Storage.ConstructorStorage, args: string[]): Storage;
}

export = Storage;