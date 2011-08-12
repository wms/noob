(function($) {
//    var bookmarks = {};

    var methods = {
        init: function() {
            // Remove error message
           // $(this).removeClass('error').empty();
            // Prepare HTML5 audio player
            var audioUrl = $(this).find('a:first').attr('href');
            var $player = $('<audio controls="controls" preload="metadata">'
                          + '    <source src="' + audioUrl + '" type="audio/mp3" />' // TODO support ogg
                          + '</audio>');

            $player.bookmarks = {};

            /* Append player to DOM and register callback that is fired every time
             * the player's position updates
             */

          //  $player.appendTo(this); return;
            $player.appendTo(this).bind('timeupdate', function() {
                var currentTime = $player.get(0).currentTime;

                $.each($player.bookmarks, function(index, element) {
                    if(index <= currentTime && !element.hasClass('current')) {
                        $(this).parent().find('dd, dt').removeClass('current');
                        element.addClass('current');
                        element.next().addClass('current');
                    }
                });
            });

            /* Scan uFormat
             * Extract and convert time of each bookmark
             * Store in hash to minimise DOM traversal
             */
             $(this).find('dl dt').each(function(el) {
                 $this = $(this);
                 var seconds = $this.noobPlayer('timeInSeconds',
                     $this.html().trim()
                 );
                 $player.bookmarks[seconds] = $this;
             });

             /* Bind a callback that seeks the audio player when a bookmark
              * is clicked
              */
             $(this).find('dl dt').bind('click', function() {
                 // copypasta
                 var seconds = $(this).noobPlayer('timeInSeconds',
                     $(this).html().trim()
                 );
                 $player.get(0).currentTime = seconds;
             });
        },

        /*
         * Take a string in the format mm:ss and convert it to seconds
         * @todo: intelligently parse hh:mm:ss as well
         */
        timeInSeconds: function(time) {
            var components = time.split(':');
            var r = parseInt(components[1], 10) + parseInt(components[0], 10) * 60;
            return parseInt(r, 10);
        }
    };

    $.fn.noobPlayer = function(method) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.noobPlayer' );
        }
    };
})(jQuery);
