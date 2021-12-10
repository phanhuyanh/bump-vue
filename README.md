Bump-Vue
------------
![](https://badgen.net/npm/v/@stoxy/stoxy)
[![Build Status](https://travis-ci.com/w3c/IndexedDB.svg?branch=main)]()

Bump Chart Vue Component

## Demo
[Codesandbox](https://rcytl.csb.app/)

## Requirement
  > Babel 7.4.0 or later

## Installation
```js
npm i bump-vue core-js regenerator-runtime

```

## Usage

```js
import Vue from 'vue'
import Bump from 'bump-vue'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

Vue.use(Bump)

```

### Component

```js
<template>
  <bump :data="data"></bump>
</template>

<script>
  export default {
    data: () => ({
      data: [
        {
          "id": "Serie 1",
          "data": [
            {
              "x": 2000,
              "y": 7
            },
            {
              "x": 2001,
              "y": 11
            },
            {
              "x": 2002,
              "y": 8
            },
            {
              "x": 2003,
              "y": 4
            },
            {
              "x": 2004,
              "y": 12
            }
          ]
        },
        {
          "id": "Serie 2",
          "data": [
            {
              "x": 2000,
              "y": 2
            },
            {
              "x": 2001,
              "y": 4
            },
            {
              "x": 2002,
              "y": 1
            },
            {
              "x": 2003,
              "y": 2
            },
            {
              "x": 2004,
              "y": 2
            }
          ]
        },
        {
          "id": "Serie 3",
          "data": [
            {
              "x": 2000,
              "y": 5
            },
            {
              "x": 2001,
              "y": 5
            },
            {
              "x": 2002,
              "y": 5
            },
            {
              "x": 2003,
              "y": 1
            },
            {
              "x": 2004,
              "y": 5
            }
          ]
        },
        {
          "id": "Serie 4",
          "data": [
            {
              "x": 2000,
              "y": 10
            },
            {
              "x": 2001,
              "y": 8
            },
            {
              "x": 2002,
              "y": 3
            },
            {
              "x": 2003,
              "y": 10
            },
            {
              "x": 2004,
              "y": 10
            }
          ]
        },
        {
          "id": "Serie 5",
          "data": [
            {
              "x": 2000,
              "y": 9
            },
            {
              "x": 2001,
              "y": 2
            },
            {
              "x": 2002,
              "y": 12
            },
            {
              "x": 2003,
              "y": 6
            },
            {
              "x": 2004,
              "y": 8
            }
          ]
        },
        {
          "id": "Serie 6",
          "data": [
            {
              "x": 2000,
              "y": 11
            },
            {
              "x": 2001,
              "y": 9
            },
            {
              "x": 2002,
              "y": 2
            },
            {
              "x": 2003,
              "y": 7
            },
            {
              "x": 2004,
              "y": 9
            }
          ]
        },
        {
          "id": "Serie 7",
          "data": [
            {
              "x": 2000,
              "y": 6
            },
            {
              "x": 2001,
              "y": 6
            },
            {
              "x": 2002,
              "y": 10
            },
            {
              "x": 2003,
              "y": 9
            },
            {
              "x": 2004,
              "y": 4
            }
          ]
        },
        {
          "id": "Serie 8",
          "data": [
            {
              "x": 2000,
              "y": 1
            },
            {
              "x": 2001,
              "y": 10
            },
            {
              "x": 2002,
              "y": 4
            },
            {
              "x": 2003,
              "y": 12
            },
            {
              "x": 2004,
              "y": 6
            }
          ]
        },
        {
          "id": "Serie 9",
          "data": [
            {
              "x": 2000,
              "y": 12
            },
            {
              "x": 2001,
              "y": 12
            },
            {
              "x": 2002,
              "y": 6
            },
            {
              "x": 2003,
              "y": 5
            },
            {
              "x": 2004,
              "y": 11
            }
          ]
        },
        {
          "id": "Serie 10",
          "data": [
            {
              "x": 2000,
              "y": 4
            },
            {
              "x": 2001,
              "y": 7
            },
            {
              "x": 2002,
              "y": 7
            },
            {
              "x": 2003,
              "y": 3
            },
            {
              "x": 2004,
              "y": 3
            }
          ]
        },
        {
          "id": "Serie 11",
          "data": [
            {
              "x": 2000,
              "y": 8
            },
            {
              "x": 2001,
              "y": 1
            },
            {
              "x": 2002,
              "y": 9
            },
            {
              "x": 2003,
              "y": 11
            },
            {
              "x": 2004,
              "y": 1
            }
          ]
        },
        {
          "id": "Serie 12",
          "data": [
            {
              "x": 2000,
              "y": 3
            },
            {
              "x": 2001,
              "y": 3
            },
            {
              "x": 2002,
              "y": 11
            },
            {
              "x": 2003,
              "y": 8
            },
            {
              "x": 2004,
              "y": 7
            }
          ]
        }
      ]
    })
  }
</script>
```
