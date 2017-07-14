"use strict";
( function() {

    $( function() {

        $.each( $( '.questions__list' ), function() {

            new Accordion ( $( this ) );

        } );

        $.each( $( '.navigation' ), function() {

            new ScrollToElement ( $( this ) );

        } );

        $.each( $( '.connect-us' ), function() {

            new SubscribeForm ( $( this ) );

        } );

    });

    var Accordion = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _accordionItem = _obj.find( '.questions__item' ),
            _accordionSub = _obj.find( '.questions__item-sub' ),
            _accordionBtn = _accordionItem.find( '.questions__item-head' ),
            _body = $('body');

        //private methods
        var _constructor = function () {
                _onEvents();
            },
            _onEvents = function () {

                _accordionBtn.on({
                    click: function(){

                        _slideAccordion( $(this) );

                        return false

                    }
                });
                _obj.on( {
                    click: function( event ) {

                        event = event || window.event;

                        if ( event.stopPropagation ) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }

                    }
                } );
                _body.on( {
                    click: function() {

                        _accordionItem.removeClass( 'active' );
                        _accordionSub.slideUp( 200 );

                    }
                } );


            },
            _slideAccordion = function ( elem ) {

                var curItem = elem,
                    curParent = curItem.parent(),
                    curMenu = curParent.find( '.questions__item-sub' );

                if ( curParent.hasClass( 'active' ) ) {

                    curParent.removeClass( 'active' );
                    curMenu.slideUp( 200 );

                } else {

                    _accordionItem.removeClass( 'active' );
                    _accordionSub.slideUp( 200 );

                    curParent.addClass( 'active' );
                    curMenu.slideDown( 200 );

                }

                return false
            };

        _constructor();
    };

    var ScrollToElement = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btns = _obj.find( 'a' ),
            _item = $( '.navigation-item' ),
            _scroller = $('html, body'),
            _lastElement = $( '.connect-us' ),
            _window = $( window );

        //private methods
        var _constructor = function () {
                _obj[0].obj = _self;
                _onEvents();

                _window.trigger( 'scroll' );
            },
            _onEvents = function () {

                _btns.on({
                    click: function () {

                        _scrollTo( $( this ) );
                        return false;
                    }
                });
                _window.on({
                    scroll: function (  ) {

                        _checkScroll( _window.scrollTop() );
                    }
                });
            },
            _checkScroll = function ( scroll ) {

                var windowHeight = _window.height(),
                    stopPosition = _lastElement.offset().top - ( windowHeight/2 ) - 200;

                if ( scroll >=  stopPosition) {

                    _obj.css({
                        'margin-top': - ( scroll - stopPosition )
                    });

                } else {

                    _obj.css({
                        'margin-top': 0
                    });
                }

                _item.each(function () {

                    var curItem = $(this),
                        topPos = curItem.offset().top,
                        curItemId = curItem.attr( 'id' );

                    if ( scroll > ( topPos - windowHeight / 2 ) ){

                        _filterElems( curItemId );

                    }

                })
            },
            _filterElems = function ( name ) {

                _btns.each( function () {

                    var curBtn = $( this ),
                        curHref = curBtn.attr( 'href' ).substring( 1 );

                    if ( name === curHref ) {

                        _btns.removeClass( 'active' );
                        curBtn.addClass( 'active' );

                        return false

                    }

                } );

            },
            _scrollTo = function ( elem ) {

                var scrollElem = elem.attr( 'href' );

                if ( scrollElem.length !== 0 ) {

                    _scroller.animate( {scrollTop: $( scrollElem ).offset().top - 15 }, 500 );
                }

                return false;
            };

        //public properties

        //public methods

        _constructor();
    };

    var SubscribeForm = function ( obj ) {

        //private properties
        var _obj = obj,
            _form = _obj.find( 'form' ),
            _submitBtn = _form.find( '.btn' ),
            _spinner = _submitBtn.find( '.spinner' ),
            _request = new XMLHttpRequest();

        //private methods
        var _onEvents = function () {

                _form.on({
                    submit: function () {

                        _sendForm();

                        return false
                    }
                });

            },
            _sendForm = function(){

                var form_data = _form.serialize();

                _request.abort();

                _spinner.addClass( 'active' );

                _request = $.ajax({
                    type: _form.attr('method'),
                    url: _form.attr('action'),
                    data: form_data,
                    success: function () {

                        _obj.addClass( 'active' );
                        _spinner.removeClass( 'active' );
                        _submitBtn.addClass( 'disabled' );

                    },
                    error: function ( XMLHttpRequest ) {


                    }
                });
            },
            _init = function () {
                _onEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();
