# json2yaml

A Deno module that converts a JSON string to a (pretty) YAML string 🦕

*Inspired by https://github.com/alexcrist/json-to-pretty-yaml*

> **Note**: there already exists a module
> ([`stringify()`](https://deno.land/std/encoding/#yaml))
> to convert JavaScript objects to YAML strings in the Deno standard library.
> Consider using this instead if you prefer working with JavaScript objects!

## Module

Basic usage:

```js
import { json2yaml } from 'https://deno.land/x/json2yaml/mod.ts';

const jsonString = '{"hello": "world"}';
const yamlString = json2yaml(jsonString);

console.log(yamlString);
```

Output:

```yaml
hello: world
```

You can also specify the number of spaces to use for indents:

```js
const jsonString = '{"foo": ["bar", "baz"]}';
const yamlString = json2yaml(jsonString, 3);

console.log(yamlString);
```

Output:

```yaml
foo:
   -  bar
   -  baz
```

For more documentation, run:

```sh
deno doc mod.ts
```

## CLI

```sh
# Prints output to stdout
deno run --allow-read https://deno.land/x/json2yaml/cli.ts -- input.json

# Write contents into output.yaml
deno run --allow-read https://deno.land/x/json2yaml/cli.ts -- input.json > output.yaml
```

## Testing

```sh
deno test --allow-read
```
