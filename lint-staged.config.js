/* eslint-env node */
const path = require('path')

const eslintCommand = filenames =>
  `next lint --file ${filenames.map(f => path.relative(process.cwd(), f)).join(' --file ')}`

const formatCommand = 'prettier --write'
const stylelintCommand = 'stylelint --allow-empty-input "app/*.{css,scss}"'
module.exports = {
  'app/*.{js,jsx,ts,tsx}': [formatCommand, eslintCommand],
  'app/*.{css,scss}': [formatCommand, stylelintCommand],
  'app/!*.{js,jsx,ts,tsx,css,scss}': [formatCommand]
}
