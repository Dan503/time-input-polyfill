# Time Input Polyfill

> This polyfill is currently in a pre-release state while testing is being conducted.
>
> **It is not ready for use in production yet!**

- ✔️ Modeled after the Chrome and Firefox implementations
- ✔️ Fully keyboard and screen reader accessible
- ✔️ Usable on mobile devices as well
- ✔️ Submits the same values to servers as real time inputs
- ✔️ Only downloads the full polyfill code in the browsers that need it

Demo available here: https://dan503.github.io/time-input-polyfill/

## Fastest and easiest way to implement

Add the following script element to your page:

```html
<script src="https://cdn.jsdelivr.net/npm/time-input-polyfill@0.1.3/dist/time-input-polyfill.auto.min.js"></script>
```

Alternatively you can download it via npm and use it through commonJS

```
npm i time-input-polyfill
```

Then require it in your main JavaScript file like so:

```js
require('time-input-polyfill/auto')
```

That's all you need to do.

### What did I just do?

You didn't load the actual polyfill onto the page, you loaded a much smaller automatic initialiser function instead.

1. The initialiser checks if the browser supports `input[type="time"]` elements.
2. If it **does**, it skips the rest of the functionality.
3. If it does **not**, it will:
	1. load `https://cdn.jsdelivr.net/npm/time-input-polyfill@0.1.3/dist/time-input-polyfill.min.js` (the actual polyfill).
	2. Collect all `input[type="time"]` elements on the page.
	3. Loop through each `input[type="time"]` element and apply the polyfill to it.


## I need more control

The following downloads the full polyfill in all browsers, take a look at the [auto.js](https://github.com/Dan503/time-input-polyfill/blob/master/auto.js) if you want to see how it loads the polyfill dynamically.

### npm

First check for `input[type="time"]` support.

```js
var supportsTime = require('time-input-polyfill/core/helpers/supportsTime')

if (supportsTime) {
	//Apply polyfill here
}
```

Then gather a list of all `input[type="time"]` elements on the page, and loop through them to apply the polyfill.

```js
var supportsTime = require('time-input-polyfill/core/helpers/supportsTime')
var TimePolyfill = require('time-input-polyfill');

if (supportsTime) {
	// Converting to an array for IE support
	var $inputs = [].slice.call( document.querySelectorAll('input[type="time"]') );
	$inputs.forEach(function($input){
		new TimePolyfill($input);
	})
}
```

`TimePolyfill` in this case will be a function that is only accessible from the file that it was required in.

### CDN

First check for `input[type="time"]` support.

```html
<script src="https://cdn.jsdelivr.net/npm/time-input-polyfill@0.1.3/core/helpers/supportsTime.js"></script>
```
```js
if (supportsTime) {
	//Apply polyfill here
}
```

Then gather a list of all `input[type="time"]` elements on the page, and loop through them to apply the polyfill.

```html
<script src="https://cdn.jsdelivr.net/npm/time-input-polyfill@0.1.3/core/helpers/supportsTime.js"></script>
<script src="https://cdn.jsdelivr.net/npm/time-input-polyfill@0.1.3/dist/time-input-polyfill.min.js"></script>
```
```js
if (supportsTime) {
	// Converting to an array for IE support
	var $inputs = [].slice.call( document.querySelectorAll('input[type="time"]') );
	$inputs.forEach(function($input){
		new TimePolyfill($input);
	})
}
```

This will add a global `TimePolyfill` function to the page.

## Major limitations

Note that I refer to an `input[type="time"]` element that has had the polyfill initialized on it as an `$input` in this section.

### The value of the polyfill will be different to the value of the real input

In browsers that support the time input natively, they will provide the `value` of the input in 24 hour time (eg. `20:45`). The polyfill will provide the value in 12 hour time (`08:45 PM`). If the polyfill detects that a form is being submitted, the polyfill will quickly switch to 24 hour time in an attempt to align with standard time input functionality.

If this isn't working for you, you can access the current input value in 24 hour time format by targeting the `data-value` attribute.

You can also switch the `$input` manually to 24 hour time using `$input.polyfill.swap()`. The polyfill does not function properly at the moment wile running in 24 hour time. 24 hour time is only meant to be used as a means of submitting correct values to forms. It is not intended to be used as a permanent mode (at least not yet).

### You must call `$input.polyfill.update()` on dynamic inputs

I couldn't find any reliable way to track when a user uses `$input.value = '13:30'`. So instead of tracking the use of `$input.value`, I have attached a `.polyfill.update()` method to the `$input` element.

Any time you update the value of the time input element through JavaScript, check that `$input.polyfill` exists, and if it does, call `$input.polyfill.update()`.

```html
<input id="example" type="time">
```
```js
var $input = document.getElementByID('example');
$input.value = '13:30';
// call the update() method whenever the value is updated through JS
if ($input.polyfill) $input.polyfill.update();
```

The `update()` method will return the input element that it was called on so it can be chained if you want.
