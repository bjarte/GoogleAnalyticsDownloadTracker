# Google Analytics Download Tracker
*ga-download-tracker.js*

**This script helps you track file downloads in Google Analytics using virtual pageviews and events.**

## How to use

Simply include a reference to the script anywhere on your page:

    <script src="/scripts/ga-download-tracker.js"></script>

The script automatically inserts tracking to all `<a>` tags on the page that **link to files**.

This script requires the standard Google Analytics script to also be included on the page.

## Filetypes that are tracked

These filetypes are tracked by default. Change this list by editing variable _filetypes_:

- pdf
- zip
- od*
- doc*
- xls*
- ppt*
- exe
- dmg
- mp2, mp3, mp4
- mov
- avi
- gif
- png
- wav
- jpg
- jpeg
- ogg


## Example

Let us say you have a link to this file on your website:
http://mysite.com/content/files/document.docx 

### Google Analytics Pageviews

The pageview uses the actual path to the file, so you will find the statistics for the example file in Google Analytics' dashboard here:

Behaviour → Site Content → Content Drilldown → /content/ → /files/

### Google Analytics Events

The event for the example file has these properties:
- Event Category: *Downloaded file*
- Event Action: *document.docx*
- Event Label: */content/files/document.docx*

## Known issues

- You will get hits for files that are not on your own domain.

## Thanks

A big thanks to [TechOctave](https://techoctave.com/), their project [entourage.js](https://github.com/techoctave/entourage) was a big influence.