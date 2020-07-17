import { parse } from 'https://deno.land/std@0.61.0/flags/mod.ts';
import { json2yaml } from './mod.ts';

function printVersion(): void {
  console.log('json2yaml 0.1.0');
}

function printHelp(): void {
  printVersion();
  console.log('Converts a JSON string to a (pretty) YAML string');
  console.log();
  console.log('Docs: https://deno.land/x/json2yaml');
  console.log('Bugs: https://github.com/Rikilele/json2yaml/issues');
  console.log();
  console.log('USAGE:');
  console.log('    deno run --allow-read https://deno.land/x/json2yaml/cli.ts [OPTIONS] [-- FILE]');
  console.log();
  console.log('OPTIONS:');
  console.log('    -h, --help           Print help information');
  console.log('    -v, --version        Print version information');
  console.log('    -s, --spaces <n>     Set number of spaces > 1 used for indents');
  console.log();
  console.log('FILE:');
  console.log('    A path to a file containing a valid JSON string');
}

function executeConversion(filePath: string, numSpaces: number) {
  try {
    const decoder = new TextDecoder('utf-8');
    const fileContents = Deno.readFileSync(filePath);
    const jsonString = decoder.decode(fileContents);
    console.log(json2yaml(jsonString, numSpaces));
    Deno.exit(0);
  } catch (e) {
    console.log(`Failed to convert file ${filePath}`);
    console.log(e);
    Deno.exit(1);
  }
}

function cli() {
  const parsedArgs = parse(Deno.args, {
    '--': true,
    alias: {
      h: ['help'],
      v: ['version'],
      s: ['spaces'],
    }
  });

  if (parsedArgs.help) {
    printHelp();
    Deno.exit(0);
  }

  if (parsedArgs.version) {
    printVersion();
    Deno.exit(0);
  }

  if (parsedArgs['--'].length === 0) {
    printHelp();
    Deno.exit(0);
  }

  const filePath = parsedArgs['--'][0];
  const numSpaces = isNaN(parsedArgs.s) || parsedArgs.s < 2 ? 2 : parsedArgs.s;
  executeConversion(filePath, numSpaces);
}

if (import.meta.main) {
  cli();
}
