# Time Input Polyfill

_This is a work in progress_

I'm just reserving the name on npm at the moment.

Once released this will be a polyfill for `input[type=time]` elements.

## Major limitations

### The value of the polyfill will be different to the value of the real input

In browsers that support the time input natively, they will provide the `value` of the input in 24 hour time (eg. `20:45`). The polyfill will provide the value in 12 hour time (`08:45 PM`). If the polyfill detects that a form is being submitted, the polyfill will quickly switch to 24 hour time in an attempt to align with standard time input functionality.

If this isn't working for you, you can access the current input value in 24 hour time format by targeting the `data-value` attribute.

### Must call `update()` on dynamic inputs

I couldn't find any reliable way to track when a user uses `$input.value = '13:30'`. So instead of tracking the use of `$input.value`, I have attached an `updatePolyfill()` method to the `$input` element.

Any time you update the value of the time input element through JavaScript, check that the `updatePolyfill()` method exists, and if it does, call it.

```html
<input id="example" type="time">
```
```js
var $input = document.getElementByID('example');
$input.value = '13:30';
// call the update() method whenever the value is updated through JS
if ($input.updatePolyfill) $input.updatePolyfill();
```

The `updatePolyfill()` method will return the input element that it was called on so it can be chained if you want.
