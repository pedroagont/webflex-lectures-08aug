# M07W18 - Data Fetching & Other Side Effects

### To Do

- [ ] Rules for Hooks
- [ ] Pure Functions and Side Effects
- [ ] `useEffect`
- [ ] Cleanup
- [ ] Dependencies
- [ ] _useEffect_ Flow

### PURE FUNCTION
```
const sum = (num1, num2) => {
    return num1 + num2;
}

const result = sum(2, 2)
console.log(result === 4)
````

-Produces no side effects
-It will return the same value if called with the same arguments

### SIDE EFFECT
````
let externalNumber = null;
const sum = (num1, num2) => {
    externalNumer = num1 + num2
    return num1 + num2;
}
sum(2, 2)

cons sideEffectFunction = () => {
    console.log('This is a side effect)
}
sideEffectFunction()
````