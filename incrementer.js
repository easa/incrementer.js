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
                if ($this.hasClass(opts.increaserClass))
                    increase($this);
                else if ($this.hasClass(opts.decreaserClass))
                    decrease($this);
            });
            $(document.body).on('mousedown', upS + ', ' + downS, function () {
                $this = $(this);
                isDown = true;
                timPer = opts.timePeriod;
                if ($this.hasClass(opts.increaserClass))
                    setimotId = setTimeout(function () { action(function () { increase($this) }) }, timPer);
                else if ($this.hasClass(opts.decreaserClass))
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
        decreaserClass: 'decrement',
        increaserClass: 'increment'
    };
})(jQuery)
