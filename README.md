# Google Analytics Download Tracker
*ga-download-tracker.js*

**This script help you track file downloads in Google Analytics using virtual pageviews and events.**

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

## Thanks

A big thanks to [TechOctave](https://techoctave.com/), their project [entourage.js](https://github.com/techoctave/entourage) was a big influence.