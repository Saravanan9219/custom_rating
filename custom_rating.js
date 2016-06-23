( function() {
        var rate_it = function(elem) {
            var stars_template = '<div class="star-rating">' + '<span class="active"></span>' + '<span class="active"></span>' + '<span class="active"></span>' + '<span class="active"></span>' + '<span class="active"></span>' + '</div>';
            var stars_dom = $(stars_template);
            var element = $(elem);
            var rating = parseInt(element.val());
            var old_rating = rating;
            if (rating > 5) {
                rating = 5;
            }
            for ( i = 0; i < 5 - rating; i++) {
                $(stars_dom.find("span")[i]).removeClass("active");
            }
            element.after(stars_dom);
            element.css({
                "display" : "none"
            });
            stars_dom.find("span").bind("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                var new_rating = 5 - $(this).prevAll().length;
                old_rating = element.val();
                element.val(new_rating);
                for ( i = 0; i < 5; i++) {
                    if (i < (5 - new_rating)) {
                        $(stars_dom.find("span")[i]).removeClass("active");
                    } else {
                        $(stars_dom.find("span")[i]).addClass("active");
                    }
                }
                var rating_changed = $.Event("rating.changed");
                element.trigger(rating_changed, new_rating);
            });
            this.update = function(value) {
                var new_rating = parseInt(value);
                old_rating = element.val(old_rating);
                element.val(new_rating);
                for ( i = 0; i < 5; i++) {
                    if (i < (5 - new_rating)) {
                        $(stars_dom.find("span")[i]).removeClass("active");
                    } else {
                        $(stars_dom.find("span")[i]).addClass("active");
                    }
                }
            };
            this.reset = function() {
                this.update(old_rating);
            };
            return this;
        };
        $.fn.extend({
            "rate_it" : function() {
                $(this).each(function() {
                    var rate_it_object = $(this).data("rate_it");
                    if (!rate_it_object) {
                        rate_it_object = new rate_it(this);
                        $(this).data("rate_it", rate_it_object);
                    };
                });
                var rate_it_object = $(this).data("rate_it");
                return rate_it_object;
            }
        });
    }());
