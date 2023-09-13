(function ($) {

    let icon = {
        type: "fa",
        expand: "fa-chevron-right",
        collapse: "fa-chevron-down"
    };

    $.fn.select2tree = function (options) {
        var defaults = { language: "zh-CN", theme: "bootstrap" };
        var opts = $.extend(defaults, options);
        opts.templateResult = templateResult;
        opts.templateSelection = templateSelection;
        $(this).select2(opts).on("select2:open", open);
    };

    function templateSelection(selection, $this) {
        var selectid = $this[0].id.split('-').slice(1, -1).join('-');
        var v = $('#' + selectid).val(), arr = [];
        if (v == '' || v == null || !v || v.indexOf(',') > 0) return selection.text;
        do {
            var node = $('#' + selectid + ' option[value=' + v + ']');
            if (node.length != 1) {
                break;
            }
            v = node.attr('parent');
            arr.push(node.text());
        } while (true)
        return arr.length == 0 ? selection.text : arr.reverse().join('/ ');
    }

    function templateResult(data, container) {
        if (data.element) {
            //insert span element and add 'parent' property
            var $wrapper = $("<span style='width: 16px;height: 16px;'></span><span>" + data.text + "</span>");
            var $element = $(data.element);
            $(container).attr("val", $element.val())
            if ($element.attr("parent")) {
                $(container).attr("parent", $element.attr("parent"));
            }
            return $wrapper;
        } else {
            return data.text;
        }
    }

    function processElements(selector, process) {
        $(selector).each(function () {
            process($(this));
        });
    }

    function moveOption(id) {
        var selector = id ? ".select2-results__options li[parent=" + id + "]" : ".select2-results__options li:not([parent])";
        if (id) {
            $(selector).insertAfter(".select2-results__options li[val=" + id + "]");
        }
        else {
            $(selector).appendTo(".select2-results__options ul");
        }
        processElements(selector, function ($element) {
            moveOption($element.attr("val"));
        });
    }
    //deal switch action
    function switchAction(id, open) {
        var $target = $(".select2-results__options li[val=" + id + "]");
        if (open) {
            $target.find("span[class]:eq(0)").removeClass(icon.expand).addClass(icon.collapse);
            $(".select2-results__options li[parent='" + id + "']").slideDown();
        } else {
            $target.find("span[class]:eq(0)").removeClass(icon.collapse).addClass(icon.expand);
            $(".select2-results__options li[parent='" + id + "']").slideUp();
            processElements(".select2-results__options li[parent='" + id + "']", function ($element) {
                switchAction($element.attr("val"), open);
            });
        }
    }
    //get the level of li
    function getLevel(id) {
        var level = 0;
        var elements = $(".select2-results__options li[parent]");
        while (elements.filter("[val='" + id + "']").length > 0) {
            id = elements.filter("[val='" + id + "']").attr("parent");
            level++;
        }
        return level;
    }

    function open(event) {
        setTimeout(function () {
            moveOption();
            setClass(event);
            //override mousedown for collapse/expand 
            $(".switch").mousedown(switchMouseDown);
            //override mouseup to nothing
            $(".switch").mouseup(switchMouseUp);
        }, 0);
    }

    function getSlideDownValues(id) {
        var v = $('#' + id).val(), arr = [];
        if (v == '' || v == null || !v || v.indexOf(',') > 0) return null;
        arr.push(v);
        do {
            var p = $('#' + id + ' option[value=' + v + ']').attr('parent');
            if (p == '' || !p) {
                break;
            }
            v = p;
            arr.push(p);
        } while (true)

        return arr;
    }

    function setClass(event) {
        var slideDownItems = getSlideDownValues(event.currentTarget.id);
        //loop li add some classes and properties
        $(".select2-results__options li").each(function () {
            var $this = $(this);
            var parent = $this.attr("parent");
            var close = slideDownItems
                && $this.attr("parent")
                && !(slideDownItems.indexOf($this.attr("val")) != -1 || slideDownItems.indexOf(parent) != -1);
            //add gap for children
            if (!$this.attr("style")) {
                var paddingLeft = getLevel($this.attr("val")) * 2;
                processElements("li[parent='" + parent + "']", function ($element) {
                    $element.css({ "padding-left": paddingLeft + "em" });
                });
            }
            if (close) {
                $this.hide();
            }
            if (parent) {
                var $siblings = $this.siblings("li[val=" + parent + "]");
                $siblings.find("span:eq(0)").addClass(icon.type + " switch " + (close ? icon.expand : icon.collapse)).css({ "margin-right": "4px", "cursor": "default" });
                $siblings.find("span:eq(1)").css("font-weight", "bold");
            }
            else {

            }
        });
    }

    function switchMouseDown(event) {
        switchAction($(this).parent().attr("val"), $(this).hasClass(icon.expand));
        event.stopPropagation();
    }

    function switchMouseUp() {
        return false;
    }
})(jQuery);
