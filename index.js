let hour = document.getElementById("hour");
let mins = document.getElementById("mins");
let secs = document.getElementById("secs");
let ampm = document.getElementById("ampm");

let hh = document.getElementById("hh");
let mm = document.getElementById("mm");
let ss = document.getElementById("ss");

let dothh = document.querySelector(".dot.hh");
let dotmm = document.querySelector(".dot.mm");
let dotss = document.querySelector(".dot.ss");

setInterval(() => {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let am = h >= 12 ? "PM" : "AM";

    h > 12 ? h = h - 12 : null;
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    hour.innerHTML = h + "<i>Hours</i>";
    mins.innerHTML = m + "<i>Minutes</i>";
    secs.innerHTML = s + "<i>Seconds</i>";
    ampm.innerHTML = am;

    hh.style.strokeDashoffset = 220 - (220 * h) / 12;
    mm.style.strokeDashoffset = 220 - (220 * m) / 60;
    ss.style.strokeDashoffset = 220 - (220 * s) / 60;

    dothh.style.transform = 'rotate('+ h * 360 / 12 +'deg)';
    dotmm.style.transform = 'rotate('+ m * 360 / 60 +'deg)';
    dotss.style.transform = 'rotate('+ s * 360 / 60 +'deg)';

});