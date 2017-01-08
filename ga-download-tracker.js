/*
 * Google Analytics Download Tracker
 * https://github.com/bjarte/ga-download-tracker
 * 
 * Version 1.1.0
 * 
 * GADT sends a virtual pageview and an event to Google Analytics 
 * when a user clicks a link to download a file.
 * 
 * Copyright (c) 2017 Bjarte Aune Olsen (https://basementmedia.no)
 * 
 * Licensed under the MIT (http://en.wikipedia.org/wiki/MIT_License) license.
 * 
 * Inspired by Entourage.js by Tian Davis (http://techoctave.com/c7)
 */

(function () {

    var gadt = (function () {

        // Filetypes to track
        var filetypes = /\.pdf$|\.zip$|\.od*|\.doc*|\.xls*|\.ppt*|\.exe$|\.dmg$|\.mp\d$|\.mov$|\.avi$|\.wav$|\.ogg$/i;

        var track = function (event) {

            // This script only works if it is called from a link <a> with a href attribute
            var link = this;
            if (link.href === null || link.href.length === 0) {
                return;
            }

            // Is Google Analytics loaded?
            if (typeof (ga) === "undefined" || ga === null || ga.loaded !== true) {
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

            var trackedPageview = false;
            var trackedEvent = false;

            // Send event to Google Analytics
            ga("send",
            {
                hitType: "event",
                eventCategory: "Downloaded file",
                eventAction: filename,
                eventLabel: link.pathname,
                hitCallback: function () {
                    // When Google Analytics is done tracking, download file
                    console.log("Google Analytics tracked download of file as event: " + link.pathname);
                    trackedEvent = true;
                    // Only download file if both event and pageview tracking is finished
                    if (trackedPageview) {
                        document.location.href = link.href;
                    }
                }
            });

            // Send virtual pageview to Google Analytics
            ga("send",
            {
                hitType: "pageview",
                page: link.pathname,
                title: filename,
                hitCallback: function () {
                    // When Google Analytics is done tracking, download file
                    console.log("Google Analytics tracked download of file as pageview: " + link.pathname);
                    trackedPageview = true;
                    // Only download file if both event and pageview tracking is finished
                    if (trackedEvent) {
                        document.location.href = link.href;
                    }
                }
            });

            // Wait 3 seconds, and if Google Analytics hasn't responded,
            // download file anyway
            setTimeout(function () {
                console.log("Google Analytics didn't respond, cannot track download of file: " + link.pathname);
                document.location.href = link.href;
            }, 3000);
        };

        var init = function () {
            var links = document.links;
            var linksLength = links.length;
            // Add tracking code to all links on the page
            for (var i = 0; i < linksLength; i++) {
                links[i].onclick = track;
            }
        };

        return {
            init: init,
            track: track
        };
    })();

    // Add tracker to global scope
    window.gadt = gadt;

    // Initialize tracker when page is loaded
    window.onload = gadt.init;
})();