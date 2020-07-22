import { assertEquals } from 'https://deno.land/std@0.60.0/testing/asserts.ts';
import { json2yaml } from '../mod.ts';

/**
 * Simple test cases
 */
Deno.test('a number', () => {
  const input = 2;
  const expected = '2\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a boolean', () => {
  const input = true;
  const expected = 'true\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a string', () => {
  const input = 'hello';
  const expected = 'hello\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('null', () => {
  const input = null;
  const expected = 'null\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('an empty array', () => {
  const input: [] = [];
  const expected = '[]\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('an empty object', () => {
  const input = {};
  const expected = '{}\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a simple array', () => {
  const input = [1, 'a', true];
  const expected = '- 1\n- a\n- true\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a simple object', () => {
  const input = {hello: 'world'};
  const expected = 'hello: world\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

/**
 * Runs a set of prepared test cases under the tests directory.
 *
 * The tests directory is set up such that each subdirectory contains tests for a test "category".
 * The subdirectory name === the category name, which is the input parameter to this function.
 *
 * The tests within these categories are also organized as directories themselves,
 * with two required files residing in them: input.json and output.yaml.
 * input.json contains the string supplied as an argument to json2yaml(), and output.yaml
 * contains the expected output YAML string from json2yaml().
 *
 * @param category The name of the test category. Must be one of the subdirectories in tests
 * @param numSpaces The number of spaces to use for indents, supplied to json2yaml()
 */
function runPreparedTests(category: string, numSpaces = 2) {
  const __dirname = new URL('.', import.meta.url).pathname;
  const decoder = new TextDecoder('utf-8');
  for (const test of Deno.readDirSync(`${__dirname}${category}`)) {
    if (test.isDirectory) {
      const jsonContent = Deno.readFileSync(`${__dirname}${category}/${test.name}/input.json`);
      const yamlContent = Deno.readFileSync(`${__dirname}${category}/${test.name}/output.yaml`);
      const inputJSON = decoder.decode(jsonContent);
      const expectedYAML = decoder.decode(yamlContent);
      Deno.test(`${category}: ${test.name}`, () => {
        assertEquals(json2yaml(inputJSON, numSpaces), expectedYAML);
      });
    }
  }
}

runPreparedTests('complicated');
runPreparedTests('threeSpaces', 3)
