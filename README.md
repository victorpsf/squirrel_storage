# squirrel_storage

Manipulação de arquivos locais

Dependência do pacote <a href="https://www.npmjs.com/package/squirrel_util">squirrel_util</a>
<pre>
$ npm install --save squirrel_util squirrel_storage
</pre>

## Conteudo

- [Estância da classe](#estância-da-classe)
- [Verificação de diretorio](#verificação-de-diretorio)
- [Verificação de conteúdo do diretorio](#verificação-de-conteúdo-do-diretorio)
- [Escrita de arquivo](#escrita-de-arquivo)
- [Sobrescrita de arquivo](#sobrescrita-de-arquivo)
- [Leitura de arquivo](#leitura-de-arquivo)
- [Remoção de arquivo](#remoção-de-arquivo)
- [Outras informações](#outras-informações)

### Estância da classe

Temos alguns parametros

``` js
const { Storage, Path } = require('../STORAGE_MODULE')

const storage = new Storage({
  useWorkspace: true,        // usa caminho até o projeto, que é o diretorio atual do projeto
  createDirIfNotExists: true // cria o diretorio caso não exista
}, 'public/', 'email/')
// no caso eu quero o diretorio public/email/*
```

### Verificação de diretorio

Verficação de existencia de diretorio

``` js
const { Storage, Path } = require('../STORAGE_MODULE')

const storage = new Storage({
  useWorkspace: true,        // usa caminho até o projeto, que é o diretorio atual do projeto
  createDirIfNotExists: true // cria o diretorio caso não exista
}, 'public/', 'email/')

console.log(storage.Exists()) // boolean
```

### Verificação de conteúdo do diretorio

Listagens dos arquivos ou pastas do diretorio

``` js
const { Storage, Path } = require('../STORAGE_MODULE')

const storage = new Storage({
  useWorkspace: true,        // usa caminho até o projeto, que é o diretorio atual do projeto
  createDirIfNotExists: true // cria o diretorio caso não exista
}, 'public/', 'email/')

console.log(storage.ListDirSync()) // lista contendo arquivos do diretorio, também pode conter pastas []
```

### Escrita de arquivo

Escrita de arquivo

``` js
const { Storage, Path } = require('../STORAGE_MODULE')

const storage = new Storage({
  useWorkspace: true,        // usa caminho até o projeto, que é o diretorio atual do projeto
  createDirIfNotExists: true // cria o diretorio caso não exista
}, 'public/', 'email/')

storage.WriteFileSync('teste.html', '<h1>Olá Mundo</h1>') // escreve o arquivo 'teste.html'
```

### Sobrescrita de arquivo

Adiciona ao fim do arquivo o novo conteudo

``` js
const { Storage, Path } = require('../STORAGE_MODULE')

const storage = new Storage({
  useWorkspace: true,        // usa caminho até o projeto, que é o diretorio atual do projeto
  createDirIfNotExists: true // cria o diretorio caso não exista
}, 'public/', 'email/')

storage.AppendFileSync('teste.html', '<h1>Olá Mundo</h1>') // adiciona valor no fim do arquivo 'teste.html'
```

### Leitura de arquivo

Realiza a leitura do arquivo

``` js
const { Storage, Path } = require('../STORAGE_MODULE')

const storage = new Storage({
  useWorkspace: true,        // usa caminho até o projeto, que é o diretorio atual do projeto
  createDirIfNotExists: true // cria o diretorio caso não exista
}, 'public/', 'email/')

storage.ReadFileSync('teste.html') // leitura do arquivo 'teste.html'
/**
 * <h1>Olá Mundo</h1>
 * <h1>Olá Mundo</h1>
 */
```

### Remoção de arquivo

Remove o arquivo

``` js
const { Storage, Path } = require('../STORAGE_MODULE')

const storage = new Storage({
  useWorkspace: true,        // usa caminho até o projeto, que é o diretorio atual do projeto
  createDirIfNotExists: true // cria o diretorio caso não exista
}, 'public/', 'email/')

storage.DeleteFileSync('teste.html') // apaga o arquivo 'teste.html'
```


### Outras informações

Outra forma de criar uma instancia

``` js
const { Storage, Path } = require('../STORAGE_MODULE')

const emailDir = Storage.disk('public', 'email');
const htmlDir = Storage.disk({
  useWorkspace: true,
  createDirIfNotExists: true
}, 'public/', 'email/');

// caminho do projeto
Path.basePath

// obtem informação do diretorio
console.log(Path.pathParser('/teste/seila'))
// { root: '/', dir: '/teste', base: 'seila', ext: '', name: 'seila' }

console.log(Path.pathDir('/teste/seila'))
// /teste/seila

console.log(Path.joinAndUseBasePath('/teste/seila'))
// /home/$USER/$WORKSPACE/teste/seila

console.log(Path.join('/teste/seila', 'hello.html'))
// /teste/seila/hello.html
```

