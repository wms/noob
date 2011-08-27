# Never Out Of Beta Audio Player

## Introduction

A jQuery plugin that adds a HTML5 audio player to an MP3 and provides a list of
bookmarks.

By providing a `<dl />` of timecodes and links, the player will highlight them
at the appropriate time. Each `<dt />` becomes a link that will seek the
`<audio />` player appropriately.

## Usage

The player expects HTML in the following format:

```html
<div class="bookmarked-audio">
    <div class="metadata">
        <h1 class="title">Friendly and possibly verbose title</h1>
        <h2 class="timestamp">August 27, 2011</h2>
        <div class="description">
            <p>A description of the audio. Can contain as much or a little markup as required.</p>
        </div>
    </div>
    <a class="source" href="http://www.example.com/source-audio-file.mp3">Download audio.</a>

    <dl class="bookmarks">
        <h3>Bookmarks in this podcast:</h3>
        <dt>00:01</dt>
        <dd>
            <a class="link" href="http://www.google.com">Google</a>
        </dd>
        <dt>00:02</dt>
        <dd>
            <a class="link" href="http://www.bbc.co.uk">BBC</a>
        </dd>
    </dl>
</div>
```

Each `<dt />` should be a timestamp in the format mm:ss

The corresponding `<dd />` may contain any number of `<p />` and `<a />`
elements relevant to that bookmark.

To transform the player, simply call `$.noobPlayer()`, for example:

```javascript
$(document).ready(function() {
    $('.bookmarked-audio').each(function(index, value) {
        $(this).noobPlayer();
    });
});
```

## Contributions

If you find any bugs or have a feature suggestion, please feel free to use the
GitHub tracker. In the spirit of things, you're encouraged to fork this
repository and do whatever you like with it.

Win the game by raising a pull request and having your changes accepted.
