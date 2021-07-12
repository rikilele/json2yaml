# json2yaml

A Deno module that converts a JSON string to a (pretty) YAML string 🦕

![ci](https://github.com/Rikilele/json2yaml/workflows/CI/badge.svg)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/json2yaml)

_Inspired by https://github.com/alexcrist/json-to-pretty-yaml_

> **Note**: there already exists a module
> ([`stringify()`](https://deno.land/std/encoding/#yaml)) to convert JavaScript
> objects to YAML strings in the Deno standard library. Consider using this
> instead if you prefer working with JavaScript objects!

## Module

Basic usage:

```js
import { json2yaml } from "https://deno.land/x/json2yaml/mod.ts";

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
$ deno doc mod.ts
```

## CLI

```sh
# Prints output to stdout
$ deno run --allow-read https://deno.land/x/json2yaml/cli.ts -- input.json

# Write contents into output.yaml
$ deno run --allow-read https://deno.land/x/json2yaml/cli.ts -- input.json > output.yaml
```

You can also use `deno install` to easily create an alias command:

```sh
$ deno install -f --allow-read -n json2yaml https://deno.land/x/json2yaml/cli.ts

# Much shorter!
$ json2yaml -- input.json
```

Explanation:

- `-f`: Forcefully overrides previous installations of json2yaml
- `--allow-read`: Grants read access to the cli
- `-n json2yaml`: Sets the alias to json2yaml

## Testing

```sh
$ deno test --allow-read
```
