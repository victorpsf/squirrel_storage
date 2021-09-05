const path = require('path')
const { Types } = require('squirrel_util')

this.basePath = path.dirname(require.main.filename);

const filterArguments = function (value, index, array) {
  return Types(value).IsString();
}

this.join = function (...args) {
  if (Types(args).IsArray(args) === false) 
    return "";
  args = args.filter(filterArguments);

  if (!args.length)
    return "";
  return path.join.apply(null, args)
}

this.joinAndUseBasePath = function (...parameters) {
  return this.join.apply(this, [this.basePath].concat(parameters))
}

this.pathParser = function (argument) {
  return path.parse(argument)
}

this.pathDir = function (argument) {
  const { dir, base, ext } = path.parse(argument)

  if (ext)
    return dir
  else
    return this.join(dir, base)
}