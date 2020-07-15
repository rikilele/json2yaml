import { assertEquals } from 'https://deno.land/std@0.60.0/testing/asserts.ts';
import { json2yaml } from './mod.ts'

Deno.test('a number', () => {
  const input = 2;
  const expected = '2\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a string', () => {
  const input = 'hello';
  const expected = 'hello\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a null', () => {
  const input = null;
  const expected = 'null\n';
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('an empty array', () => {
  const input: any[] = [];
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
  const expected = "- 1\n- a\n- true\n";
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a simple object', () => {
  const input = {hello: 'world'};
  const expected = "hello: world\n";
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('ambiguous strings', () => {
  const input = [true, 'true', false, 'false', null, 'null', 1.0, '1.0'];
  const expected = "- true\n- 'true'\n- false\n- 'false'\n- null\n- 'null'\n- 1\n- '1.0'\n";
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a simple mixed object', () => {
  const input = {
    a: [
      1,
      2,
      4,
      8,
      16
    ],
    b: {
      c: 'd',
      e: 'f',
      g: true
    }
  };
  const expected = "a:\n  - 1\n  - 2\n  - 4\n  - 8\n  - 16\nb:\n  c: d\n  e: f\n  g: true\n";
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a nested sequence', () => {
  const input = [
    {
      a: [
        'b'
      ],
      c: [
        'd'
      ]
    }
  ];
  const expected = "- a:\n    - b\n  c:\n    - d\n";
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a deeply nested sequence', () => {
  const input = [
    {
      a: [
        {
          b: [
            {
              c: [
                {
                  d: [
                    {
                      e: 'f'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      g: ['h', 'i', 'j']
    }
  ];
  const expected = "- a:\n    - b:\n        - c:\n            - d:\n                - e: f\n  g:\n    - h\n    - i\n    - j\n";
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('a complicated nested sequence', () => {
  const input = [
    'a',
    'b',
    'c',
    {
      d: [
        'e',
        'f'
      ]
    },
    {
      g: [
        'h',
        'i'
      ]
    },
    {
      j: {
        k: [
          1, 2, 3, 4
        ]
      }
    }
  ];
  const expected = "- a\n- b\n- c\n- d:\n    - e\n    - f\n- g:\n    - h\n    - i\n- j:\n    k:\n      - 1\n      - 2\n      - 3\n      - 4\n";
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});

Deno.test('an example from OpenAPI', () => {
  const input = {
    "openapi": "3.0.0",
    "info": {
      "version": "1.0.0",
      "title": "Swagger Petstore",
      "license": {
        "name": "MIT"
      }
    },
    "servers": [
      {
        "url": "http://petstore.swagger.io/v1"
      }
    ],
    "paths": {
      "/pets": {
        "get": {
          "summary": "List all pets",
          "operationId": "listPets",
          "tags": [
            "pets"
          ],
          "parameters": [
            {
              "name": "limit",
              "in": "query",
              "description": "How many items to return at one time (max 100)",
              "required": false,
              "schema": {
                "type": "integer",
                "format": "int32"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "A paged array of pets",
              "headers": {
                "x-next": {
                  "description": "A link to the next page of responses",
                  "schema": {
                    "type": "string"
                  }
                }
              },
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pets"
                  }
                }
              }
            },
            "default": {
              "description": "unexpected error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Create a pet",
          "operationId": "createPets",
          "tags": [
            "pets"
          ],
          "responses": {
            "201": {
              "description": "Null response"
            },
            "default": {
              "description": "unexpected error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/pets/{petId}": {
        "get": {
          "summary": "Info for a specific pet",
          "operationId": "showPetById",
          "tags": [
            "pets"
          ],
          "parameters": [
            {
              "name": "petId",
              "in": "path",
              "required": true,
              "description": "The id of the pet to retrieve",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Expected response to a valid request",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pet"
                  }
                }
              }
            },
            "default": {
              "description": "unexpected error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Pet": {
          "type": "object",
          "required": [
            "id",
            "name"
          ],
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            },
            "name": {
              "type": "string"
            },
            "tag": {
              "type": "string"
            }
          }
        },
        "Pets": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Pet"
          }
        },
        "Error": {
          "type": "object",
          "required": [
            "code",
            "message"
          ],
          "properties": {
            "code": {
              "type": "integer",
              "format": "int32"
            },
            "message": {
              "type": "string"
            }
          }
        }
      }
    }
  };
  const expected = "openapi: 3.0.0\ninfo:\n  version: 1.0.0\n  title: Swagger Petstore\n  license:\n    name: MIT\nservers:\n  - url: http://petstore.swagger.io/v1\npaths:\n  /pets:\n    get:\n      summary: List all pets\n      operationId: listPets\n      tags:\n        - pets\n      parameters:\n        - name: limit\n          in: query\n          description: How many items to return at one time (max 100)\n          required: false\n          schema:\n            type: integer\n            format: int32\n      responses:\n        '200':\n          description: A paged array of pets\n          headers:\n            x-next:\n              description: A link to the next page of responses\n              schema:\n                type: string\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Pets'\n        default:\n          description: unexpected error\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Error'\n    post:\n      summary: Create a pet\n      operationId: createPets\n      tags:\n        - pets\n      responses:\n        '201':\n          description: Null response\n        default:\n          description: unexpected error\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Error'\n  /pets/{petId}:\n    get:\n      summary: Info for a specific pet\n      operationId: showPetById\n      tags:\n        - pets\n      parameters:\n        - name: petId\n          in: path\n          required: true\n          description: The id of the pet to retrieve\n          schema:\n            type: string\n      responses:\n        '200':\n          description: Expected response to a valid request\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Pet'\n        default:\n          description: unexpected error\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/Error'\ncomponents:\n  schemas:\n    Pet:\n      type: object\n      required:\n        - id\n        - name\n      properties:\n        id:\n          type: integer\n          format: int64\n        name:\n          type: string\n        tag:\n          type: string\n    Pets:\n      type: array\n      items:\n        $ref: '#/components/schemas/Pet'\n    Error:\n      type: object\n      required:\n        - code\n        - message\n      properties:\n        code:\n          type: integer\n          format: int32\n        message:\n          type: string\n";
  assertEquals(json2yaml(JSON.stringify(input)), expected);
});
