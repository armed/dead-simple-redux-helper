# Dead simple redux helpers

## Installation

```bash
$ npm install --save dead-simple-redux-helper
```
## Usage

```javascript
import { createAction, createReducer } from 'dead-simple-redux-helper';
```

### Creating standard Flux action creators

```javascript
const MY_ACTION = 'myAction';


// returns flux action creator:
const someAction = createAction(MY_ACTION);

/* returns standard flux action:
{
  type: MY_ACTION,
  payload: 'hello'
}
*/
const action = someAction('hello');
```

### Creating standard Flux action creators with argument transformer

```javascript
const MY_COMPLEX_ACTION = 'myComplexAction';

// pass property names, which will be used to create `payload` object
const complexAction = createAction(MY_COMPLEX_ACTION, ['name', 'lastName', 'age']);

/* returns
{
  type: MY_COMPLEX_ACTION,
  payload: {
    name: 'John',
    lastName: 'Smith',
    age: 42
  }
}
*/
const action = complexAction('John', 'Smith', 42);

/* returns
{
  type: MY_COMPLEX_ACTION,
  payload: {
    name: 'John',
    lastName: undefined,
    age: undefined
  }
}
*/
const action = complexAction('John');
```

### Creating reducers

```javascript
const MY_ACTION = 'myAction';
const MY_COMPLEX_ACTION = 'myComplexAction';

const initialState = {
  name: '',
  lastName: '',
  age: 0,
}

// returns state if action.type does not match
const myReducer = createReducer(initialState, {
  // every handler has 2 params: `state = initialState`, and `action.payload`
  [MY_ACTION](state, payload) {
    // do something
    return newState
  },
  // { name, lastName, age } = payload (see above)
  [MY_COMPLEX_ACTION](state, payload) {
    // do something
    return newState
  }
})
```

### License

MIT
