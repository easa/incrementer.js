# incrementer.js
A jQuery plugin to manage input's value, specially numbers!

## Structureless and full control
setup: A main input by an unique selector and don't forget to add min and max values ;)
```
<input class="form-control number-hour" value="08" min-value="2" max-value="7" />
```
Then, two other element to increase and decrease input's value by a `data-target` attribute
```
<a class="btn btn-link increment" data-target=".number-min"><span class="glyphicon glyphicon-chevron-up"></span></a>
<a class="btn btn-link decrement" data-target=".number-min"><span class="glyphicon glyphicon-chevron-up"></span></a>
```
Then add the `.js` code
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
There are more option for other situation and other type of input that i wanna add later
```
speed: 50,          // the high speed at holding
divideSpeed: 2,     // every setTimeout the time value divide 
timePeriod: 750,    // the first delay time
length: 2,          // append 0 before number depends on lenght of number
decreaseSelector: '.decrement',
increaseSelector: '.increment',
```
