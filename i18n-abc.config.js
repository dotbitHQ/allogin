const { makeCrcKey } = require('i18n-abc/lib/shared')

function $t (text) {
  const rawKey = makeCrcKey(text)
  // To resolve i18n key bug in lit-translate
  return rawKey.replace(/[^a-zA-Z0-9]/g, '_')
}

module.exports = {
  scan: {
    input: [
      './src/**/*.{js,ts,vue}',
      '!./src/static/**',
    ],
    output: './src/locales/raw',
    langs: ['en-US', 'zh-CN'],
    generateKey: $t
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
