# incrementer.js
A jQuery plugin to manage input's value, specially numbers!

<!DOCTYPE html>

<html>

<head>
    <title></title>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        crossorigin="anonymous">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">
</head>

<body style="background: black">
    <div style="width: 160px">
<div class="time-picker">
    <table class="table">
        <tbody>
            <tr class="text-center">
                <td><a class="btn btn-link increment" data-target=".number-min"><span class="glyphicon glyphicon-chevron-up"></span></a></td>
                <td>&nbsp;</td>
                <td><a class="btn btn-link increment" data-target=".number-hour"><span class="glyphicon glyphicon-chevron-up"></span></a></td>
            </tr>
            <tr>
                <td class="form-group">
                    <input class="form-control number-min" value="98" min-value="98" max-value="102" />
                </td>
                <td class="form-group">:</td>
                <td class="form-group">
                    <input class="form-control number-hour" value="08" min-value="2" max-value="24" />
                </td>
            </tr>
            <tr class="text-center">
                <td><a class="btn btn-link decrement" data-target=".number-min"><span class="glyphicon glyphicon-chevron-down"></span></a></td>
                <td>&nbsp;</td>
                <td><a class="btn btn-link decrement" data-target=".number-hour"><span class="glyphicon glyphicon-chevron-down"></span></a></td>
            </tr>
        </tbody>
    </table>
</div>
</div>

<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
    crossorigin="anonymous"></script>
<script src="incrementer.js"></script>
<script>
(function ($) {
    $.fn.incremental = function (options, func) {
        var opts = $.extend({}, $.fn.incremental.defaults, options);
        var isDown = false, setimotId = 0, theSelector = this.selector, arrEl = [];

        this.each(function () {
            var type = opts.type;
            var $elem = $(this);
            var value = $(this).val();
            var num;
            var $this;
            var upS = opts.increaseSelector+ '[data-target="' + theSelector + '"]';
            var downS = opts.decreaseSelector+ '[data-target="' + theSelector + '"]';
            var maxValue = parseInt($elem.attr('max-value') ? $elem.attr('max-value') : undefined);
            var minValue = parseInt($elem.attr('min-value') ? $elem.attr('min-value') : undefined);

            var Value = function (v) {
                var result;
                if (type === 'number') {
                    var number = function () { return maxValue ? v > maxValue ? maxValue : minValue ? v < minValue ? minValue : v : v : minValue ? v < minValue ? minValue : v : v }
                    this.check = function () {
                        var m = 0
                        if (!v) m = minValue ? minValue : 0;
                        else m = number();
                        var r;
                        if (opts.length)
                            if (opts.length > 1)
                                r = plusPadding(m);
                        return r ? r : m;
                    }
                    plusPadding = function (n) {
                        if (opts.length > 10) return undefined;
                        padd = Math.floor(opts.length - Math.log10(n + 1));
                        if (padd <= 0) return undefined;
                        return n < 10 ^ opts.length ? (function t(l) { return l-- > 0 ? "0" + t(l) : "" })(padd) + n : n;
                    }
                    this.plusAfter = function () { return opts.after ? number + opts.after : number }
                    this.plusBefore = function () { return opts.before ? opts.before + number : number }
                    this.PlusAfterBefore = function () { return opts.before ? opts.before + plusAfter : number }
                    this.formated = function () {
                        eval('/' + opts.format + '/');
                    }
                }
            }
            var increase = function (el) {
                var $this = $(el.attr('data-target'));
                var num = parseInt($this.val());
                var result = num > maxValue ? num : num + 1;
                result = new Value(result).check()
                $this.val(result);
            }
            var decrease = function (el) {
                var $this = $(el.attr('data-target'));
                var num = parseInt($this.val());
                var result = num < minValue ? num : num - 1;
                result = new Value(result).check()
                $this.val(result);
            }
            var action = function (callbackfunc) {
                if (!isDown) return;
                callbackfunc();
                timPer = timPer > opts.speed ? timPer / opts.divideSpeed : timPer;
                setimotId = setTimeout(function () { action(callbackfunc) }, timPer);
            };

            $(document.body).on('click', upS + ', ' + downS, function () {
                $this = $(this);
                if ($this.hasClass(opts.increaseSelector))
                    increase($this);
                else if ($this.hasClass(opts.decreaseSelector))
                    decrease($this);
            });
            $(document.body).on('mousedown', upS + ', ' + downS, function () {
                $this = $(this);
                isDown = true;
                timPer = opts.timePeriod;
                if ($this.hasClass(opts.increaseSelector))
                    setimotId = setTimeout(function () { action(function () { increase($this) }) }, timPer);
                else if ($this.hasClass(opts.decreaseSelector))
                    setimotId = setTimeout(function () { action(function () { decrease($this) }) }, timPer);
            });
            $(document.body).on('mouseleave mouseup', upS + ', ' + downS, function () {
                isDown = false;
                clearTimeout(setimotId);
            });
        })
    }

    $.fn.incremental.defaults = {
        speed: 50,
        divideSpeed: 2,
        timePeriod: 750,
        type: 'number',
        length: 2,
        after: undefined,
        before: undefined,
        format: undefined,
        decreaseSelector: '.decrement',
        increaseSelector: '.increment'
    };
})(jQuery)


    $(function () {
        $(".number-hour").incremental();
        $(".number-min").incremental({
            length: 3
        });
    });
</script>
</body>

</html>


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
