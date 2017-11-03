(function($) {
    var tagTable = {};
    var postTags = {};

    // add way to use objects as keys
    // https://stackoverflow.com/a/35306050/4597249
    // Note that object must be an object or array,
    // NOT a primitive value like string, number, etc.
    var _objIdMap = new WeakMap, _objectCount = 0;
    function objectId(object) {
        if (!_objIdMap.has(object)) _objIdMap.set(object, ++_objectCount);
        return _objIdMap.get(object);
    }

    // index all tags and set up click events
    $(".tag-filter .tags a").each(function() {
        var thisTag = $(this);
        var tagName = thisTag.data("tag-name");
        var categoryName = thisTag.data("category-name");
        var tagData = tagTable[tagName] = { visible: false, list: [], button: thisTag};
        $(".tag-filter .post-list ." + tagName).each(function() {
            // get existing or new empty array of visible tags
            var visibleTags = postTags[objectId(this)];
            if (!visibleTags)
                visibleTags = postTags[objectId(this)] = [];

            tagData.list.push(this);
            if (categoryName) {
                // showTag(tagName);
                // keep visible and mark the tag as visible, too
                visibleTags.push(tagName);
                thisTag.addClass("shown");
                tagData.visible = true;
            } else {
                // hideTag(tagName);
                $(this).hide(); // automatically hide
            }
        });

        thisTag.on("click", function(e) {
            toggleTag(tagName);
            e.preventDefault();
        });
    });

    // show the tag from the hash, if one exists
    var tagHash = window.location.hash.slice(1);
    if (tagHash) {
        showTag("tag-" + tagHash);
    }

    function toggleTag(tag) {
        var tagData = tagTable[tag];
        if (tagData.visible)
            hideTag(tag);
        else
            showTag(tag);
    }

    function showTag(tag){
        var tagData = tagTable[tag];
        if (tagData) {
            tagData.visible = true;
            $.each(tagData.list, function() {
                var visiblePostTags = postTags[objectId(this)]
                if (visiblePostTags.indexOf(tag) === -1)
                    visiblePostTags.push(tag);

                $(this).fadeIn(250);
            });
            tagData.button.addClass("shown");
        }
    }

    function hideTag(tag) {
        var tagData = tagTable[tag];
        if (tagData) {
            tagData.visible = false;
            $.each(tagData.list, function() {
                var visiblePostTags = postTags[objectId(this)]
                var tagIndex = visiblePostTags.indexOf(tag);
                if (tagIndex > -1) {
                    visiblePostTags.splice(tagIndex, 1); // remove from list
                }
                if (visiblePostTags.length === 0) {
                    $(this).fadeOut(250); // no more tags; hide the post
                }
            });
            tagData.button.removeClass("shown");
        }
    }
}(Zepto));