# incrementer.js
A jQuery plugin to manage input's value, specially numbers!
Structureless and full control

[see the example on jsFiddle](https://jsfiddle.net/eyphdz70/)
## How to use it!
#### setup: 


Make a main input by an unique selector.
Add min and max values like the example:
```
<input class="form-control number-hour" value="08" min-value="2" max-value="7" />
```
Then, add two other element to increase and decrease input's value by a `data-target` attribute:
```
<a class="btn btn-link increment" data-target=".number-min"><span class="glyphicon glyphicon-chevron-up"></span></a>
<a class="btn btn-link decrement" data-target=".number-min"><span class="glyphicon glyphicon-chevron-up"></span></a>
```
Add the `.js` code:
```
$(function () {
    $(".number-hour").incremental({
        length: 1,
        timePeriod: 300,
        divideSpeed: 1,
        speed: 200
    });
    $(".number-min").incremental();
});
```

## Options:
The default options:
```
speed: 50,          // the high speed at holding
divideSpeed: 2,     // every setTimeout the time value divide 
timePeriod: 750,    // the first delay time
length: 2,          // append 0 before number depends on lenght of number
decreaserClass: 'decrement',
increaserClass: 'increment',  // for now these two just work with classes!
```
There are more options for other type of input that i wanna add later..

Good luck!
