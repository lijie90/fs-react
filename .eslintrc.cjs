module.exports = {
  env: {
    node: true, // 标志当前的环境，不然使用module.exports 会报错
    es2021: true
  },
  extends: [
    'eslint:recommended', // 使用eslint推荐的语法规范
    'plugin:react/recommended', // react推荐的语法规范
    'plugin:@typescript-eslint/recommended', // ts推荐的语法规范
    'prettier', // prettier
    'plugin:prettier/recommended' // prettier推荐的配置
  ],
  parser: '@typescript-eslint/parser', // 使用解析器来解析ts的代码，使得eslint可以规范ts的代码
  parserOptions: {
    ecmaFeatures: {
      jsx: true // 允许使用jsx的语法
    },
    ecmaVersion: 'latest', // es的版本为最新版本
    sourceType: 'module' // 代码的模块化方式，使用module的模块方式
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'], // 使用对应的react, react-hooks, @typescript-eslint 等插件
  rules: {
    quotes: ['error', 'single'], // 配置单引号的规则，如果不是单引号，报错
    semi: 'off', //  不需要使用分号；
    'react/react-in-jsx-scope': 'off', // 在jsx中不需要导入 react的包,
    'react/no-unescaped-entities': 'off', // 允许在jsx中使用单引号
    'prettier/prettier': 'error', // eslint 和prettier 用prettier的错误
    'no-empty-function': 'off', // 允许空函数
    '@typescript-eslint/no-empty-function': 'off', // 不允许空函数
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用any类型
    'no-var-requires': 'off',
    'no-empty': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
