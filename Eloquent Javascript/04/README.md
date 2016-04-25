# Objects

- Only **null** and **undefined** do not have any property
  so doing **null.length** would throw a **TypeError**.
- Two ways to access property, **value.x** and **value[x]**.
  The former is used when **x** is a valid variable name, the
  latter is evaluated
- **length** property of arrays / strings gives us the length.
- Accessing an undefined property in an object results in **undefined**
- Deleting a property is done using **delete** operator.
- Checking a property is in object is done using **in**.
- Every function in JS has an **arguments** object, whose *length* propety
  is the number of arguments passed (i.e like argc in C).
- Different ways to create objects: curly brace, Object.create.
