# Clock SVG


https://youtu.be/eoSfzVz9ur0


```js
hh.style.strokeDashoffset = 220 - (220 * h) / 12;
mm.style.strokeDashoffset = 220 - (220 * m) / 60;
ss.style.strokeDashoffset = 220 - (220 * s) / 60;

dothh.style.transform = 'rotate('+ h * (360 / 12) +'deg)';
dotmm.style.transform = 'rotate('+ m * (360 / 60) +'deg)';
dotss.style.transform = 'rotate('+ s * (360 / 60) +'deg)';
```


![](screenshot.png)