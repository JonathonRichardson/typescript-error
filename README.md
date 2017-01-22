# typescript-error
Provides Rust-like Result and Option objects for Typescript.

## Installation
Install using **npm**.

```bash
npm install --save typescript-error
```

## Usage

### Result\<T, E>
Use `Result<T, E>` as a return value for functions or methods that might error.  This provides a way to indicate errors in a type-safe manner, analogous to a `throws Exception` in other languages like Java.

```typescript
import { * } from "typescript-error"

class ParseException extends Error {}
class Integer {
  constructor(public value: number) {}
}

function parse(text: string): Result<Integer, ParseException> {
  let num = parseInt(text);
  if (isNaN(num)) {
    return Err(new ParseException("Text does not represent a number"));
  }
  else {
    return Ok(new Integer(num));
  }
}

let userInput = "15";
let result = parse(userInput);

if (!result.hasError()) {
  let intValue = result.unwrap();
  // Do something...
}
else {
  let error = result.getError();
  // Do something with error
}
```

Calling `Result#unwrap()` on a value that contains an error will `throw` the error, so you should only call it if you know that your result doesn't have an error.  In development, it can be useful to call `unwrap()` without checking it first, for sake of brevity, or because you would want your script to choke on a failure there.

A common pattern for code that doesn't want to deal with an exception is to have a return type of `Result`, and just return the error-containing result (or call `Err()` on the exception itself).

### Option\<T>
Use `Option<T>` for functions or methods that may or may not return a value (such as getters), rather than returning `null`.  This ensures that consuming code has to be aware of and explicitely deal with the fact that your method may not return a value:

```typescript
import { * } from "typescript-error"

class ExampleJSON {
  private values: {[name: string]: string} = {};
  constructor() {}
  
  public getValue(key: string): Option<string> {
    if (key in this.values) {
      return new Some(this.values[key]);
    }
    else {
      return new None();
    }
  }
}

let json = new ExampleJSON();
let key = "Dawn Summers";
let value = json.getValue(key);

if (value instanceof Some) {
  print `${key} is the key to ${key.getValue()}`;
}
else {
  print `No value associated with the following key: "${key}"`;
}
```
