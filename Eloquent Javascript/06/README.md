# This

- Method are properties that hold functions.
- **this** in method refers to the object it was called from.
- The first argument given to **Function.prototype.apply**, **Function.prototype.bind** is the context for **this**.

## Prototypes

- Every object has a prototype (which can be null); these are use
  as fallback source of properties. The properties are searched for
  properties similar to how parent classes are searched for attributes
  in python.
- Properties can be overridden similar to how methods can be overridden
  in python.
- The prototype of most objects is **Object.prototype**.
- **Object.getPrototypeOf(object)** is used to get the property of an object.
- **Object.getPrototypeOf(Object.prototype) == null**
- There also other prototypes such as **Array.prototype**, **Function.prototype**.
- **Object.create(prototype)** is used to create an object with specific prototype.

## Constructors

- A more convenient way to create objects that derive from shared prototype
 is to use __constructors__.
- In JS, calling function with **new**, allows the **this** of the return
  object to be bound to its storage variable.
- An object created with **new** is the instance of the constructor.
- All functions have a **prototype** property, which is an object deriving
  from **Object.prototype**, all instances of the prototype inherit from **Constructor.prototype**.

## Overriding prototype properties

- Similar to python

## Preventing prototypes from interfering

- If you don't need a prototype use **Object.create(null)**.
- We can make inherited properties, nonenumerable, this is done
  by declaring properties using **Object.defineProperty(prototype, value, kwargs)**.
- To see if object has its own property at delacartion and runtime (and not of prototype) use 
  **Object.hasOwnProperty(property)**.
- **instanceof** is used to find constructor of object
