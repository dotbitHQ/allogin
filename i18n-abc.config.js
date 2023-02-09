module.exports = {
  scan: {
    input: [
      './src/**/*.{js,ts,vue}',
      '!./src/static/**',
    ],
    output: './src/locales/raw',
    langs: ['en-US', 'zh-CN'],
  },
  clean: {
    input: './src/locales/raw',
    output: './src/locales',
  },
  translate: {
    input: './src/locales/translation',
    output: './src/locales/raw',
    langs: ['en-US', 'zh-CN'],
  },
  diff: {
    input: './src/locales/raw',
    output: './src/locales/diff',
    langs: ['en-US', 'zh-CN'],
  },
}
