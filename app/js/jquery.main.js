"use strict";
( function() {

    $( function() {

        $.each( $( '.questions__list' ), function() {

            new Accordion ( $( this ) );

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

} )();
