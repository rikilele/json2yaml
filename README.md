# json2yaml

Converts a JSON string to a (pretty) YAML string

> *Inspired by https://github.com/alexcrist/json-to-pretty-yaml*

## Usage

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

## Testing

```sh
deno test
```
