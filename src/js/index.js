$(function () {
    jQuery.fn.dropdown = function(options) {
        var settings = $.extend({
            arrow: '',
            prevent: true,
            onChange: ''
        }, options);
        return this.each(function() {
            var $this = $(this);
            if ($this.find('.selected').length > 0) {
                if ($(this).find('.overflow input').length > 0) {
                    $this.find('input:eq(0)').val($this.find('.selected').text()).end().find('input').eq(1).val($this.find('.selected a').data('value')).end().find('.selected').closest('li').hide();
                } else {
                    $this.find('span:eq(0)').html($this.find('.selected').text() + settings.arrow).end().find('input').val($this.find('.selected a').data('value')).end().find('.selected').closest('li').hide();
                }
            }
            $this.on('click', '.overflow', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!$(this).closest('.dropdown').hasClass('dropdown-open') || e.target.tagName === 'INPUT') {
                    $this.addClass('dropdown-open').find('ul:eq(0)').stop().slideDown(function() {
                        var h = parseInt($(this).outerHeight(true, true)),
                            top = parseInt($(this).offset()['top']) - parseInt($(document).scrollTop()),
                            wh = parseInt($(window).height());
                        if (top + h > wh) {
                            var dwh = wh - top - 10;
                            if (dwh < 200) {
                                dwh = 200;
                            }
                            $(this).css({
                                'max-height': dwh
                            });
                        } else {
                            $(this).css({
                                'max-height': 'auto'
                            });
                        }
                    });
                } else {
                    $this.removeClass('dropdown-open').find('ul:eq(0)').stop().slideUp();
                }
            });
            $this.on('keyup paste', '.overflow input', function() {
                var val = $.trim($(this).val()).toLowerCase();
                if (val === '') {
                    $this.find('.search_hidden').removeClass('search_hidden').removeClass('hidden');
                } else {
                    $this.find('li').map(function() {
                        if ($(this).find('a').text().toLowerCase().search(val) > -1) {
                            $(this).removeClass('search_hidden').removeClass('hidden');
                        } else {
                            $(this).addClass('search_hidden').addClass('hidden');
                        }
                    });
                }
            });
            $this.find('ul').eq(0).on('click', 'a', function(e) {
                e.preventDefault();
                if (!$(this).hasClass('disabled')) {
                    if (settings.prevent === false) {
                        window.location.href = $(this).attr('href');
                    } else {
                        $(this).closest('ul').find('.selected').removeClass('selected').show().end().end().closest('li').addClass('selected').hide();
                        if ($(this).find('.overflow input').length > 0) {
                            $this.find('input:eq(0)').val($(this).text()).end().find('input:eq(1)').val($(this).data('value'));
                        } else {
                            $this.find('span:eq(0)').html($(this).text() + settings.arrow).end().find('input').val($(this).data('value'));
                        }
                        $this.removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                        if ($.isFunction(settings.onChange)) settings.onChange($(this));
                    }
                }
            });
        });
    };

    $('.order_delivery').dropdown()
    $('.dropdown_info').dropdown()

    $('.header_menu-btn').on('click', function (e) {
        e.preventDefault();

        $('.header_menu-box').addClass('active');
        $('body').addClass('body_overflow');
    })

    $('.header_menu-close').on('click', function (e) {
        $('.header_menu-box').removeClass('active');
        $('body').removeClass('body_overflow');
    })
})