const Path = require('./Path')
const fs = require('fs')
const { Types } = require('squirrel_util')

const privated = {
  useWorkspace: false,
  createDirIfNotExists: false,
  diskPath: ""
}

const constants = {
  contentType: 'utf-8',
  contentTypes: ['ascii' , 'utf8' , 'utf-8' , 'utf16le' , 'ucs2' , 'ucs-2' , 'base64' , 'base64url' , 'latin1' , 'binary' , 'hex']
}

class Storage {
  constructor(option, argString) {
    if (Types.Equal(option, privated))
      Object.keys(privated).forEach(key => { 
        if (Types.Equal(privated[key], option[key])) privated[key] = option[key];
      });

      privated.diskPath = Path.join.apply(null, argString);
  }

  SetType(contentType = 'utf-8') {
    if (
      Types(contentType).IsString() === false &&
      Types(
        constants.contentTypes.find((a) => a === contentType)
      ).IsString() === false
    ) throw new Error('Invalid Value in parameter');

    constants.contentType = contentType;
    return this;
  }

  GetType() {
    return constants.contentType;
  }

  FullPath() {
    const { useWorkspace, diskPath } = privated

    return (useWorkspace) ? Path.join.apply(null, [Path.basePath, diskPath]) : Path.join.apply(null, [diskPath]);
  }

  ListDirSync() {
    try {
      return fs.readdirSync(this.FullPath())
    } catch (error) { return [] }
  }

  Exists() {
    return fs.existsSync(
      this.FullPath()
    );
  }

  CreateDir() {
    fs.mkdirSync(this.FullPath(), { recursive: true })    
  }

  WriteFileSync(filename, value) {
    if (this.Exists() == false && privated.createDirIfNotExists)
      this.CreateDir()
    fs.writeFileSync(
      Path.join(this.FullPath(), filename),
      value,
      { encoding: this.GetType() }
    );
  }

  AppendFileSync(filename, value) {
    if (this.Exists() == false && privated.createDirIfNotExists)
      this.CreateDir()
    fs.appendFileSync(
      Path.join(this.FullPath(), filename),
      value,
      { encoding: this.GetType() }      
    )
  }

  ReadFileSync(filename) {
    return fs.readFileSync(
      Path.join(this.FullPath(), filename),
      { encoding: this.GetType() }
    );
  }

  static Disk(option, ...args) {
    const storage = (
      Types(option).IsObject()) ? 
        new Storage(option, args): 
        new Storage(null, [option].concat(args)
    )
    return storage
  }
}

module.exports = Storage;