(function($) {
	$.fn.select2tree = function(options) {
		var defaults = {
			language: "zh-CN",
			theme: "bootstrap"
		};
		var opts = $.extend(defaults, options);
		opts.templateResult = function(data, container) {
			if(data.element) {
				//insert span element and add 'parent' property
				var $wrapper = $("<span></span><span>" + data.text + "</span>");
				var $element = $(data.element);
				$(container).attr("val", $element.val())
				if($element.attr("parent")) {
					$(container).attr("parent", $element.attr("parent"));
				}
				return $wrapper;
			} else {
				return data.text;
			}
		};
		
		$(this).select2(opts).on("select2:open", open);
	};

	function moveOption(id) {
		if(id) {
			$(".select2-results__options li[parent=" + id + "]").insertAfter(".select2-results__options li[val=" + id + "]");
			$(".select2-results__options li[parent=" + id + "]").each(function() {
				moveOption($(this).attr("val"));
			});
		} else {
			$(".select2-results__options li:not([parent])").appendTo(".select2-results__options ul");
			$(".select2-results__options li:not([parent])").each(function() {
				moveOption($(this).attr("val"));
			});
		}
	}

	//deal switch action
	function switchAction(id, open) {
		$(".select2-results__options li[parent='" + id + "']").each(function() {
			switchAction($(this).attr("val"), open);
		});
		if(open) {
			$(".select2-results__options li[val=" + id + "] span[class]:eq(0)").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
			$(".select2-results__options li[parent='" + id + "']").slideDown();
		} else {
			$(".select2-results__options li[val=" + id + "] span[class]:eq(0)").addClass("glyphicon-chevron-right").removeClass("glyphicon-chevron-down");
			$(".select2-results__options li[parent='" + id + "']").slideUp();
		}
	}

	//get the level of li
	function getLevel(id) {
		var level = 0;
		while($(".select2-results__options li[parent][val='" + id + "']").length > 0) {
			id = $(".select2-results__options li[val='" + id + "']").attr("parent");
			level++;
		}
		return level;
	}

	function open() {
		setTimeout(function() {
			moveOption();

			$(".select2-results__options li").each(function() {
				var $this = $(this);
				//loop li add some classes and properties
				if($this.attr("parent")) {
					$(this).siblings("li[val=" + $this.attr("parent") + "]").find("span:eq(0)").addClass("glyphicon glyphicon-chevron-down switch").css({
						"padding": "0 10px",
						"cursor": "default"
					});
					$(this).siblings("li[val=" + $this.attr("parent") + "]").find("span:eq(1)").css("font-weight", "bold");
				}
				//add gap for children
				if(!$this.attr("style")) {
					var paddingLeft = getLevel($this.attr("val")) * 2;
					$("li[parent='" + $this.attr("parent") + "']").css("padding-left", paddingLeft + "em");
				}
			});

			//override mousedown for collapse/expand 
			$(".switch").mousedown(function() {
				switchAction($(this).parent().attr("val"), $(this).hasClass("glyphicon-chevron-right"));
				event.stopPropagation();
			});

			//override mouseup to nothing
			$(".switch").mouseup(function() {
				return false;
			});
		}, 0);
	}
})(jQuery);
