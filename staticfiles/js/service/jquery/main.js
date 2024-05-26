var _ = function(selector) {
    return document.querySelector(selector)
}

$(document).ready(function() {

    // Additional Script

    var checkboxValue = '24 Days'

    function blurInput(e) {

        if ($(e.target).closest('.form-check').length) return

        $('[data-class=time-custom]').each(function() {
            $(this).removeClass('show')

            if ($(this).val() == '') {
                $(this).siblings('[data-class=time-custom-btn]').html('<i class="fa fa-edit"></i> Other').removeClass('checked')
                $(this).closest('.job-time-input').find('input[type="radio"]').each(function() {
                    if ($(this).is(':checked')) {
                        $(this).siblings('.form-check-input').addClass('checked')
                    }
                })
            } else {
                $(this).siblings('[data-class=time-custom-btn]').html($(this).val() + ' Days').addClass('checked')
                $(this).closest('.job-time-input').find('.form-check-input').removeClass('checked')
            }
        })

    }

    function takeInputValue($this) {

        if ($this.val() != '') {
            $this.closest('.job-time-input').find('.time').val($this.val() + ' Days')
        } else {
            $this.closest('.job-time-input').find('.time').val($this.val())
            $this.closest('.job-time-input').find('input[type="radio"]').each(function() {
                if ($(this).is(':checked')) {
                    $(this).addClass('checked')
                    $this.closest('.job-time-input').find('.time').val($(this).val())
                }
            })

        }
    }

    $('.job-show-more').on('click', function(e) {
        e.preventDefault()
        $(this).toggleClass('open').siblings('.job-content').toggleClass('minimize')
    })

    $('[data-class=time-custom-btn]').on('click', function() {
        $(this).siblings('[data-class=time-custom]').addClass('show').focus()
    })

    $('[data-class=time-custom]').blur(function(e) {
        blurInput(e)
    })

    $('body').on('click', function(e) {
        if ($(e.target).attr('data-class') == 'time-custom-btn') return
        if ($(e.target).attr('data-class') != 'time-custom') {
            blurInput(e)
        }
    })

    $('.form-check-label').on('click', function() {
        $(this).closest('.job-time-input').find('.time').val($(this).siblings('input').val())
        $(this).closest('.job-time-input').find('[data-class=time-custom-btn]').removeClass('checked')
        $(this).closest('.job-time-input').find('.form-check-input').removeClass('checked')
        $(this).siblings('.form-check-input').addClass('checked')
    })
    $('[data-class=time-custom]').on('focus', function() {
        takeInputValue($(this))
    })

    $('[data-class=time-custom]').on('keyup', function() {
        takeInputValue($(this))
    })

    // $('.form-check-label').on('click', function(){
    // 	$('#time-custom').val('')
    // })

    $('.q-message').on('keyup', function() {
        $(this).closest('.form-group-message').find('.letter-count span').html($(this).val().length)
    })

    var maxUploadSize = 1073741824 // 1GB

    $('#file').on('change', function() {


        $('.message.message-size-error').hide()

        if (_('#file').files[0]) {
            if (_('#file').files[0].size > maxUploadSize) {
                $('.message.message-size-error').slideDown()
                return
            } else {
                $('.file-group label').addClass('active')
                $('.file-group label span').text(_('#file').files[0].name)
            }
        } else {
            $('.file-group label').removeClass('active')
            $('.file-group label span').text('Attach a file')
        }





    })

    var jobFormToken = Math.round(Math.random() * 100) + Math.round(Math.random() * 100)

    $('.job-form input[name=name]').on('focus', function() {
        $(this).closest('.job-form').find('.job-hf').val(jobFormToken)
    })

    $('.job-form').on('submit', function(e) {

        e.preventDefault()

        if ($(this).find('.job-hf').val() != jobFormToken) return

        var $this = $(this)

        $this.find('.message.message-size-error').hide()

        if (_('#file').files && _('#file').files.length == 1) {
            if (_('#file').files[0].size > maxUploadSize) {
                $this.find('.message.message-size-error').slideDown()
                return
            }
        }


        $this.find('.job-submit').prop('disabled', true).find('span').text('Submiting')

        var formData = new FormData(this)

        formData.append('action', 'jfd_mail')
        formData.append('_ajax_nonce', 'jfd_global.nonce')
        formData.append('max_file_size', maxUploadSize)

        $.ajax({
            url: jfd_global.ajax_url,
            type: 'post',
            processData: false,
            contentType: false,
            data: formData,
            success: function(response) {

                var response = JSON.parse(response)

                $this.find('.job-submit').prop('disabled', null).find('span').text('Submit Request')
                $this.find('.message, .quote-back-mail').hide()

                if ('success' == response.mail_message) {
                    $this.find('.job-form').trigger('reset')
                    if ('success' == response.back_mail_message) $('.quote-back-mail').show()
                    $this.find('.message.message-success').slideDown()
                } else if ('error' == response.mail_message) {
                    $this.find('.message.message-error').slideDown()
                }

                if ('error' == response.file_message) {

                    $this.find('.message').hide()
                    $this.find('.message.message-file-error').slideDown()
                } else if ('large' == response.file_message) {
                    $this.find('.message').hide()
                    $this.find('.message.message-size-error').slideDown()
                }
            }
        })
    })

    $('.form-group').on('mouseenter', function() {
        $(this).addClass('active')
    })

    $('.form-group').on('mouseleave click', function() {
        $(this).removeClass('active')
    })

    $('nav ul li:last-child a, .single-service-quote .site-btn, .header-contact, .all-service-btn').on('click', function(e) {
        e.preventDefault()
        $('.job-modal').fadeIn()
        $('body').addClass('stick')
    })

    $('.popup-modal-close').on('click', function() {
        $(this).closest('.popup-modal').fadeOut()
        $('body').removeClass('stick')
    })

    $('.popup-modal .popup-area').on('click', function(e) {

        if ($(e.target).attr('class') != 'popup-container' && !$(e.target).closest('.popup-container').length) {
            $(this).closest('.popup-modal').fadeOut()
            $('body').removeClass('stick')
        }
    })


    // Service Functionality

    function clearFormat(str) {
        return parseFloat(str.replace(/,/g, ''))
    }

    function addFormat(num) {
        return Intl.NumberFormat().format(num)
    }

    var prices = [],
        priceSInit = []

    for (i = 0; i < 3; i++) {

        p = clearFormat($('.the-service-price span').eq(i).text())

        priceSInit.push(p)

        $('.service-option').eq(i).find('label').each(function() {
            if ($(this).index() == 2 && $(this).find('input').is(':checked')) {
                p = p + clearFormat($('.extra-charge span').eq(i).text())
            }
        })
        prices.push(p)

        $('.package-tab-day').eq(i).text($('.service-option').eq(i).find('input:checked').val())

        $('.the-service-price span').eq(i).text(addFormat(p))

        $('.tabcontent-header-price').eq(i).html('$' + addFormat(p))
    }

    var finalPrice = prices[2]

    $('.tabcontent-container > a span').text('($' + addFormat(prices[2]) + ')')


    $('.service-option label').on('click', function() {

        if ($(this).find('input').is(':checked')) return

        var i = $(this).closest('.service-option').index() - 1

        $(this).find('input').prop('checked', true)

        $('.package-tab-day').eq(i).text($(this).find('input').val())

        if ($(this).index() == 2) {
            prices[i] = prices[i] + clearFormat($('.extra-charge span').eq(i).text())
        } else {
            prices[i] = prices[i] - clearFormat($('.extra-charge span').eq(i).text())
        }

        $('.the-service-price span').eq(i).text(addFormat(prices[i]))
        $('.price').eq(i).text('$' + addFormat(prices[i]))

        $('.tabcontent-header-price').eq(i).html('$' + addFormat(prices[i]))

        if (i == $('.tablinks.active').index()) {
            $('.tabcontent-container > a span').text('($' + addFormat(prices[i]) + ')')
        }

    })

    $('.tablinks').on('click', function() {
        var i = $(this).index()
        $('.tabcontent-container > a span').text('($' + addFormat(prices[i]) + ')')
    })

    var serviceId = $('.service-id').text()

    $('.the-service-price + a').on('click', function(e) {
        e.preventDefault()
        var i = $(this).closest('div').index() - 1
        extraCharge = $('.extra-charge span').eq(i).text(),
            qCheck = $('.service-option').eq(i).find('input').eq(1)

        finalPrice = prices[i]

        day = $('.service-option').eq(i).find('input').eq(0).val()
        quick = '&qdays=' + qCheck.val() + '&qc=' + clearFormat($('.extra-charge span').eq(i).text())


        window.location.href = $('.service-permalink').text() + '/order/?package=' + i + '&price=' + priceSInit[i] + '&id=' + serviceId + '&days=' + day + quick
    })

    $('.tabcontent-container > a').on('click', function(e) {
        e.preventDefault()
        var i = $('.tablinks.active').index(),
            extraCharge = $('.extra-charge span').eq(i).text()
        qCheck = $('.service-option').eq(i).find('input').eq(1)

        finalPrice = prices[i]

        day = $('.service-option').eq(i).find('input').eq(0).val()
        quick = '&qdays=' + qCheck.val() + '&qc=' + clearFormat($('.extra-charge span').eq(i).text())

        // quick = '&qdays=' + $('.service-option').eq(i).find('input').eq(1).val() + '&qc=' + clearFormat($('.extra-charge span').eq(i).text())

        window.location.href = $('.service-permalink').text() + '/order/?package=' + i + '&price=' + priceSInit[i] + '&id=' + serviceId + '&days=' + day + quick
    })

    var oPackage = clearFormat($('.ordered-package').text()),
        oPrice = clearFormat($('.ordered-price').text()),
        subtotal = oPrice,
        oTime = clearFormat($('.order-time').text()),
        eCommerceExtraTime = 3,
        oQuickTime = clearFormat($('.quick-days').text())

    $('.oder-item-total b, .subtotal').text('$' + addFormat(oPrice))

    $('.add-extra input').each(function() {

        var id = $(this).attr('id')

        if ($(this).is(':checked')) {
            oPrice = oPrice + clearFormat($(this).siblings('p').find('.extra-order-price').text())
            $('.' + id).removeClass('hidden')
        }
        $('.total-price').text('$' + addFormat(oPrice))

    })

    function setOrderTime() {

        if ($('#fast-delivary').is(':checked')) {
            finalTime = oQuickTime
        } else {
            finalTime = oTime
        }
        if ($('#ecommerce-functioanlity').is(':checked')) finalTime += eCommerceExtraTime

        $('.order-time').text(finalTime)
    }
    setOrderTime()

    $('.add-extra input').on('change', function() {

        var id = $(this).attr('id')

        if ($(this).is(':checked')) {
            oPrice = oPrice + clearFormat($(this).siblings('p').find('.extra-order-price').text())
            $('.' + id).removeClass('hidden')
        } else {
            oPrice = oPrice - clearFormat($(this).siblings('p').find('.extra-order-price').text())
            $('.' + id).addClass('hidden')
        }
        $('.total-price').text('$' + addFormat(oPrice))

        setOrderTime()

    })

    $('.review-header').each(function() {
        var clientLetter = $(this).find('b').text()[0]
        $(this).siblings('.user-pic').text(clientLetter)
    })

    $('.client-name').each(function() {
        var clientLetter = $(this).text()[0]
        console.log(clientLetter)
        $(this).closest('h6').siblings('.user-pic').text(clientLetter)
    })

    var reviewsPerPage = 5

    $('.load-more-review').on('click', function() {
        var $this = $(this)
        $this.prop('disabled', true)
        setTimeout(function() {
            $('.review-list li.last-show').removeClass('last-show')
            $('.review-list li.hidden').each(function(i) {
                if (i > reviewsPerPage - 1) return;
                $(this).removeClass('hidden')
                if (i == reviewsPerPage - 1) $(this).addClass('last-show')

            })
            if (!$('.review-list li.hidden').length) {
                $this.hide()
            }
            $this.prop('disabled', null)
        }, 1000)
    })

    $('.service-revision').each(function(i) {
        var revision = $(this).text()
        $('.package-tab-revision').eq(i).text(revision)
    })

    $('.the-service-price span').each(function(i) {
        var price = $(this).text()
        $('.price').eq(i).text('$' + price)
    })

    // Order Email Send

    var serviceTitle = $('.oder-item-text').find('b').text(),
        serviceLink = $('.ordered-permalink').text(),
        serviceImage = $('.oder-item-image img').attr('src'),
        plans = ['Premium', 'Standard', 'Basic']

    $('.order-form').on('submit', function(e) {

        var delivaryTime = $('.order-time').text(),
            isFastDelivary = $('#fast-delivary').is(':checked') ? 'on' : 'off',
            fastDeivaryCharge = $('#fast-delivary').siblings('p').find('.extra-order-price').text(),
            isEcommerceFunctionality = $('#ecommerce-functioanlity').is(':checked') ? 'on' : 'off',
            ecommerceFunctionalityCharge = $('#ecommerce-functioanlity').siblings('p').find('.extra-order-price').text(),
            orderMessage = $('#order-message').val().split('"').join('&quot;')
        servicePlan = plans[$('.ordered-package').text()]
        orderedMailTitle = $('.ordered-mail-title').text()


        e.preventDefault()

        $('.order-email-btn').prop('disabled', true).find('span').text('Submiting')

        var formData = new FormData(this)

        formData.append('action', 'jfd_service_mail')
        formData.append('_ajax_nonce', 'jfd_global.s_nonce')
        formData.append('order-message', orderMessage)
        formData.append('service_title', serviceTitle)
        formData.append('service_plan', servicePlan)
        formData.append('service_link', serviceLink)
        formData.append('service_image', serviceImage)
        formData.append('delivary_time', delivaryTime)
        formData.append('subtotal', '$' + addFormat(subtotal))
        formData.append('total', '$' + addFormat(oPrice))
        formData.append('is_fast_delivary', isFastDelivary)
        formData.append('fast_deivary_charge', '$' + fastDeivaryCharge)
        formData.append('is_ecommerce_functionality', isEcommerceFunctionality)
        formData.append('ecommerce_functionality_charge', '$' + ecommerceFunctionalityCharge)
        formData.append('mail_title', orderedMailTitle)


        $.ajax({
            url: jfd_global.ajax_url,
            type: 'post',
            processData: false,
            contentType: false,
            data: formData,
            success: function(response) {

                var response = JSON.parse(response)

                console.log(response)

                $('.order-email-btn').prop('disabled', null).find('span').text('Submit order for approval')
                $('.o-message, .order-back-mail').hide()

                if ('success' == response.mail_message) {
                    $('.order-form').trigger('reset')
                    if ('success' == response.back_mail_message) $('.order-back-mail').show()
                    $('.o-message.message-success').slideDown()
                } else if ('error' == response.mail_message) {
                    $('.o-message.message-error').slideDown()
                }
            }
        })
    })

    // Contact Form 7

    $('.wpcf7 .site-btn').on('click', function() {

        var $this = $(this)

        $this.addClass('disabled')

        var interval = setInterval(function() {
            if (!$this.siblings('.ajax-loader').hasClass('is-active')) {
                $this.removeClass('disabled')
                clearInterval(interval)
            }
        }, 50)
    })

    $('.load-more-project').on('click', function() {
        var $this = $(this)
        $this.prop('disabled', true)
        setTimeout(function() {
            $this.closest('.all-jobs').find('.single-job.last-show').removeClass('last-show')
            $this.closest('.all-jobs').find('.single-job.hidden').each(function(i) {
                if (i > reviewsPerPage - 1) return;
                $(this).removeClass('hidden')
                if (i == reviewsPerPage - 1) $(this).addClass('last-show')

            })
            if (!$this.closest('.all-jobs').find('.single-job.hidden').length) {
                $this.hide()
            }
            $this.prop('disabled', null)
        }, 1000)
    })


    var listId = 'fd56d7a10f',
        apiKey = 'd763d94a5dc8ae6fa451c5bfd2226a8c-us4'

    $('.download-form').on('submit', function(e) {
        e.preventDefault()

        var email = $('#download-email').val(),
            name = $('#download-name').val(),
            show,
            $this = $(this)

        $('.download-submit').prop('disabled', true)


        $.ajax({
            type: 'POST',
            url: jfd_global.ajax_url,
            data: {
                action: 'jfd_download_mail',
                _ajax_nonce: jfd_global.nonce,
                type: 'post',
                processData: false,
                contentType: false,
                email: email,
                name: name,
                list_id: listId,
                api_key: apiKey
            },
            success: function(response) {

                var response = JSON.parse(response)

                $('.download-submit').prop('disabled', null)
                $this.find('.message').hide()

                if ('success' == response.mail_message) {
                    $('.download-form').trigger('reset')
                    $this.find('.message.message-success').slideDown()
                } else {
                    $this.find('.message.message-error').slideDown()
                }
            }
        })

    })

    $('a').on('click', function(e) {

        if ($(this).hasClass('download-link')) {
            e.preventDefault()
            $('.download-modal').fadeIn()
        }
    })

    var headerHeight = $('.main-header').outerHeight(),
        logoSrc = $('.logo img').attr('src'),
        logoPath = logoSrc.replace(/[^\/]*$/, '')

    $(window).on('load scroll', function() {

        var scrollPosition = $(window).scrollTop()

        if (scrollPosition > 120) {
            $('header').addClass('fixed').find('.header-top').css('margin-bottom', headerHeight)
            $('.logo img').attr('src', logoPath + 'logo.png')
        } else {
            $('header').removeClass('fixed').find('.header-top').css('margin-bottom', 0)
            $('.logo img').attr('src', logoSrc)
        }

        if ($('.single-service-faq').length && $(window).width() > 991) {
            var sidebarTop = 120,
                sidebarBottom = sidebarTop + $('.single-services-right-area').outerHeight(),
                faqBottom = $('.single-service-faq').offset().top + $('.single-service-faq').outerHeight()
            faqPaddingTop = $('.single-service-faq').offset().top - $('.single-service-faq').parent().offset().top

            if ($('.single-services-right-area').parent().offset().top - scrollPosition < sidebarTop) {

                $('.single-services-right-area').addClass('fixed')

                if (faqBottom - scrollPosition < sidebarBottom) {
                    $('.single-services-right-area').addClass('relative').css('top', faqPaddingTop - $('.single-services-right-area').outerHeight() + $('.single-service-faq').outerHeight())
                } else {
                    $('.single-services-right-area').removeClass('relative').css('top', sidebarTop)
                }
            } else {
                $('.single-services-right-area').removeClass('fixed').css('top', 0)
            }
        }
    })

    $(window).on('load resize', function() {
        $('.single-services-right-area.fixed').width($('.single-services-right-area.fixed').parent().width())

        if ($(window).width() <= 991) {
            $('.single-services-right-area').removeClass('fixed relative').css('top', 0)
        }
    })

    $('.service-link').on('click', function(e) {
        if ($(e.target).hasClass('owl-prev') ||
            $(e.target).closest('.owl-prev').length ||
            $(e.target).hasClass('owl-next') ||
            $(e.target).closest('.owl-next').length) e.preventDefault()
    })

    $('input[name=has_domain]').on('change', function() {
        if ('Yes' == $(this).val()) {
            $('.domain-label').fadeIn()
        } else {
            $('.domain-label').fadeOut()
        }
    })

    function showLastTutorial() {
        if (endTutorial) {
            $('.tutorial-container > div:last-child').show()
            $('.load-more-tutorial-container').hide()
            $('.youtube-end').removeClass('hidden')
        }
    }

    var tutorialPage = 2,
        tutorialsPerPage = Number($('.tutorials-per-page').text()),
        endTutorial = $('.tutorial-container > div').length < tutorialsPerPage + 1

    showLastTutorial()


    $('.load-more-tutorial').on('click', function() {

        if (endTutorial) return

        $this = $(this)
        $this.prop('disabled', true),

            $.ajax({
                type: 'POST',
                url: jfd_global.ajax_url,
                data: {
                    action: 'jfd_load_more_tutorial',
                    _ajax_nonce: jfd_global.nonce,
                    type: 'post',
                    processData: false,
                    contentType: false,
                    posts_per_page: tutorialsPerPage,
                    page: tutorialPage,
                },
                success: function(response) {

                    var response = JSON.parse(response),
                        error = response.error

                    endTutorial = error || response.data.length < tutorialsPerPage

                    if (!error) {

                        response = Object.values(response.data)

                        response.forEach(function(tutorial, index) {
                            $('.tutorial-container').append(
                                `<div class="col-12 col-md-4">
	                		<a href="${tutorial.link}" class="embed-responsive">
	                    		<div class="youtube-video">
	                        		<img src="https://img.youtube.com/vi/${tutorial.thumbnail}/mqdefault.jpg" alt="">
	                        		<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
	                    		</div>
	                    		<h6>${tutorial.title}</h6>
	                		</a>
	            		</div>`)
                        })
                    }

                    showLastTutorial()

                    $this.prop('disabled', null)

                    tutorialPage++
                }
            })

    })
})