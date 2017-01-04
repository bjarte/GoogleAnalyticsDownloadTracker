/*
 * Google Analytics Download Tracker
 * 
 * GADT sends virtual pageviews to Google Analytics when users download files.
 * 
 * Copyright (c) 2016 by Bjarte Aune Olsen (https://basementmedia.no)
 * 
 * The pageviews use the actual url to the document, so you will find for example this
 * file http://mysite.com/files/document.docx in Google Analytics under Behaviour → 
 * Site Content → Content Drilldown → /files/
 * 
 * The advantage to using virtual pageviews over events, is that the statistics for how 
 * many people are downloading a file is easily compared to how many people are 
 * viewing a page on your site.
 */

(function () {

    var gadt = new (function () {

        // Filetypes to track
        var filetypes = /\.pdf$|\.zip$|\.od*|\.doc*|\.xls*|\.ppt*|\.exe$|\.dmg$|\.mp4$|\.mov$|\.avi$|\.mp3$/i;

        var track = function (event, link) {

            // Is Google Analytics loaded?
            if (typeof (window.ga) === "undefined" || window.ga === null) {
                console.log("Google Analytics is not loaded, cannot track download of file: " + link.pathname);
                return;
            }

            var filename = link.pathname;

            // Is this a link to a file?
            if (filename.search(filetypes) === -1) {
                return;
            }

            // Remove everything before the last slash in the path
            filename = filename.substring(filename.lastIndexOf("/") + 1, filename.length);

            if (filename.length === 0) {
                return;
            }

            // Prevent the browser from downloading the file before
            // Google Analytics has had time to track it
            event.preventDefault();

            // Send virtual pageview to Google Analytics
            ga("send",
            {
                hitType: "pageview",
                page: link.pathname,
                title: filename,
                hitCallback: function () {
                    // When Google Analytics has tracked the download, 
                    // download file
                    console.log("Google Analytics tracked download of file: " + link.pathname);
                    document.location.href = link.href;
                }
            });

            // Send event to Google Analytics
            // (fallback if virtual pageview doesn't work)
            ga("send",
            {
                hitType: "event",
                eventCategory: "Downloaded file",
                eventAction: filename,
                eventLabel: link.pathname
            });

            // Wait 3 seconds, and if Google Analytics hasn't responded,
            // download file anyway
            setTimeout(function () {
                console.log("Google Analytics didn't respond, downloading file anyway: " + link.pathname);
                document.location.href = link.href;
            }, 3000);
        }

        var init = function () {
            //    for (var i = 0, l = links.length; i < l; i++) {
            //        //Compare the fileType to the whitelist
            //        var match = links[i].pathname.match(whitelist);

            //        //If the link is for a file download . . .
            //        if (typeof match !== "undefined" && match !== null) {
            //            //Call Entourage whenever the link is clicked
            //            links[i].onclick = autograph;
            //        }
            //    }
        }

        return {
            init: init,
            track: track
        }
    });

    // Add tracker to global scope
    window.gadt = gadt;

    // Run scripts after page is loaded
    //window.onload = gadt.init;
})();

