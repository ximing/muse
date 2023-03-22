// @if MPE_COMMAND != 'dev'
module.exports = require('./dist/index');
// @endif
// @if MPE_COMMAND == 'dev'
module.exports = require('./dist/index.dev');
// @endif
