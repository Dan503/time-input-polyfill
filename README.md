# Time Input Polyfill

[![JS Deliver hits per month](https://data.jsdelivr.com/v1/package/npm/time-input-polyfill/badge)](https://www.jsdelivr.com/package/npm/time-input-polyfill)

An accessible polyfill for `<input type='time'/>` elements.

- ✔️ Modeled after the Chrome 78 and Firefox 70 desktop implementations.
- ✔️ Fully keyboard and screen reader accessible.
- ✔️ Submits the same values to servers as real time inputs (24 hour time).
- ✔️ Only downloads the full polyfill code in the browsers that need it.
- ✔️ Zero dependencies.

Demo available here: https://dan503.github.io/time-input-polyfill/

<details>
  <summary>The recommended version is <code>1.0.9</code> or higher.</summary>

<p>If the recommended version in this documentation is out of sync with the npm version, this is because npm only allows readme edits to be committed through full releases. To prevent needless cache invalidation, I'll only update the recommended version number when there are actual changes to the polyfill code. The current recommended version is <code>1.0.9</code>. As long as you are using a version that is equal to or higher than that, you are using the latest version of the polyfill.</p>

</details>

## Pre-built components

To make it easier to implement this polyfill into your projects, I have some pre-built component versions of it that you might find easier to use.

- [React component](https://www.npmjs.com/package/react-time-input-polyfill)
- [Vue component](https://www.npmjs.com/package/vue-time-input-polyfill) (not built yet)

## Fastest and easiest way to implement

Add the following script element to your page:

```html
<script src="https://cdn.jsdelivr.net/npm/time-input-polyfill"></script>
```

Alternatively you can download it via npm and use it through commonJS or an ES6 import statement.

```
npm i time-input-polyfill
```

Then require it in your main JavaScript file like so:

```js
// ES5
require('time-input-polyfill/auto');

// ES6
import 'time-input-polyfill/auto';

// TypeScript
import * as timePolyFill from 'time-input-polyfill';
```

That's all you need to do.

### What did I just do?

You didn't load the actual polyfill onto the page, you loaded a much smaller automatic initialiser function instead.

1. The initialiser checks if the browser supports `input[type="time"]` elements.
2. If it **does**, it skips the rest of the functionality.
3. If it does **not**, it will:
	1. load `https://cdn.jsdelivr.net/npm/time-input-polyfill@1.0.9/dist/time-input-polyfill.min.js` (the actual polyfill).
	2. Collect all existing `input[type="time"]` elements on the page.
	3. Loop through each `input[type="time"]` element and apply the polyfill to it.


## I need more control

The following downloads the full polyfill in all browsers, take a look at the [auto.js](https://github.com/Dan503/time-input-polyfill/blob/master/auto.js) file if you want to see how it loads the polyfill dynamically.

### npm

First check for `input[type="time"]` support.

```js
var supportsTime = require('time-input-polyfill/supportsTime');

if (!supportsTime) {
  //Apply polyfill here
}
```

Then gather a list of all `input[type="time"]` elements on the page, and loop through them to apply the polyfill.

```js
var supportsTime = require('time-input-polyfill/supportsTime');
var TimePolyfill = require('time-input-polyfill');

if (!supportsTime) {
  // Converting to an array for IE support
  var $$inputs = [].slice.call( document.querySelectorAll('input[type="time"]') );
  $$inputs.forEach(function($input){
    new TimePolyfill($input);
  })
}
```

`TimePolyfill` in this case will be a function that is only accessible from the file that it was required in.

### CDN

First check for `input[type="time"]` support.

```html
<script src="https://cdn.jsdelivr.net/npm/time-input-polyfill@1.0.9/core/helpers/supportsTime.js"></script>
```
```js
if (!supportsTime) {
  //Apply polyfill here
}
```

Then gather a list of all `input[type="time"]` elements on the page, and loop through them to apply the polyfill.

```html
<script src="https://cdn.jsdelivr.net/npm/time-input-polyfill@1.0.9/core/helpers/supportsTime.js"></script>
<script src="https://cdn.jsdelivr.net/npm/time-input-polyfill@1.0.9/dist/time-input-polyfill.min.js"></script>
```
```js
if (!supportsTime) {
  // Converting to an array for IE support
  var $$inputs = [].slice.call( document.querySelectorAll('input[type="time"]') );
  $$inputs.forEach(function($input){
    new TimePolyfill($input);
  })
}
```

This will add a global `TimePolyfill` function to the page.

## Shadow DOM

When your code is inside a component that resides in the Shadow DOM, the polyfill will not be able to find your label
element. For this case, you can pass your label element in directly.

```
<label id="myLabel" for="timeInput></label>
<input type="time" id="timeInput">
```         

```               
import timePolyfill from 'time-input-polyfill';

someMethod() {
  // The following element must not be in a shadow DOM
  var componentRootElem = document.getElementById('idOfYourShadowDomComponentRootElement');
  
  var timeLabelElem = componentRootElem.shadowRoot.getElementById('myLabel');
  var timeInputElem = componentRootElem.shadowRoot.getElementById('timeInput');
  timePolyFill(timeInputElem, timeLabelElem);
}
```

## Major limitations

Note that I refer to an `input[type="time"]` element that has had the polyfill initialized on it as an `$input` in this section.

### The value of the polyfill will be different to the value of the real input

In browsers that support the time input natively, they will provide the `value` of the input in 24 hour time (eg. `20:45`). The polyfill will provide the value in 12 hour time (`08:45 PM`). If the polyfill detects that a form is being submitted, the polyfill will quickly switch to 24 hour time in an attempt to align with standard time input functionality.

If this isn't working for you, you can prevent the auto-swap functionality by setting `$input.polyfill.autoSwap = false`. You can access the current input value in 24 hour time format by reading the `data-value` attribute.

You can also switch the `$input` manually to 24 hour time using `$input.polyfill.swap()`. The polyfill does not function properly at the moment while running in 24 hour time. 24 hour time is only meant to be used as a means of submitting correct values to forms. It is not intended to be used as a permanent mode.

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

### All `$input` elements must have a label

The polyfill will fail if the `$input` is missing a label.

The following is a list of ways you can add a label to the `$input`. The list is in order from the **best** method to the **worst** method:

1. Nesting the `$input` inside a `<label>` _(Doesn't require IDs to work)_
	```html
	<label>
	  <span>Label text</span>
	  <input type="time">
	</label>
	```
2. Using the `for` attribute
	```html
	<label for="uniqueID">Label text</label>
	<input type="time" id="uniqueID">
	```
3. Using the `aria-labelledby` attribute
	```html
	<p id="uniqueID">Label text</p>
	<input type="time" aria-labelledby="uniqueID">
	```
4. Using the `title` attribute
	```html
	<input type="time" title="Label text">
	```
5. Using the `aria-label` attribute
	```html
	<input type="time" aria-label="Label text">
	```

## Change log

You can view the Change Log on the [GitHub Releases](https://github.com/Dan503/time-input-polyfill/releases) page.

## Contributing

Please make pull requests against **Develop** branch rather than Master.

For testing you will need Gulp cli installed (`npm i gulp-cli -g`) then run `gulp --open` from a command line interface.
