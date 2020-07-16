# json2yaml

A Deno module that converts a JSON string to a (pretty) YAML string 🦕

> *Inspired by https://github.com/alexcrist/json-to-pretty-yaml*

## Module

```js
import { json2yaml } from 'https://deno.land/x/json2yaml/mod.ts';

const jsonString = '{"hello": "world"}';
const yamlString = json2yaml(jsonString);

console.log(yamlString);
```

Output:

```yaml
hello: world

# Notice the newline at the end
```

## CLI

```sh
deno run --allow-read https://deno.land/x/json2yaml/cli.ts -- input.json
```

## Testing

```sh
deno test
```
