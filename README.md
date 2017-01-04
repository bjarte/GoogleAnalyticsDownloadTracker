# Google Analytics Download Tracker
*ga-download-tracker.js_*

**Track file downloads using Google Analytics virtual pageviews**

NB! This script isn't working yet. It still requires links to be in the following format to work: 
```html
<a onclick="gadt.track(event, this);" href="/files/file.pdf">Download file</a>
```

The plan is to insert the onclick events automatically.

### Thanks

A big thanks to [TechOctave](https://techoctave.com/), their project [entourage.js](https://github.com/techoctave/entourage) was a big influence.
