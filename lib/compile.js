'use strict';

const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const t = require('babel-types');
const generate = require('babel-generator').default;
const util = require('util');
const R = require('ramda');

function compile (def) {
  const output = JSON.stringify(def.output);
  const code = `function mapper (input) { return ${output}; }`;
  const ast = babylon.parse(code);

  R.map(x => {
    // console.log('----------->>>>>');
    const currentPath = [];
    traverse(ast, {
      ObjectProperty: {
        enter (path) {
          // console.log('Entering ' + path.node.key.value);
          currentPath.push(path.node.key.value);
          const stringPath = R.join('.', currentPath);
          if (stringPath === x.target.value) {
            path.replaceWith(t.objectProperty(
              t.stringLiteral(R.last(currentPath)),
              t.identifier(`input.${x.source.value}`)
            ));
            path.stop();
          }
        },
        exit (path) {
          // console.log('Leaving ' + path.node.key.value);
          currentPath.pop(path.node.key.value);
        }
      }
    });
  }, def.mappings);

  return generate(ast).code;
}

module.exports = compile;
