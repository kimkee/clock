const hour = document.getElementById("hour");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const ampm = document.getElementById("ampm");

const tit = document.querySelector(".tit");
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");

const dothh = document.querySelector(".dot.hh");
const dotmm = document.querySelector(".dot.mm");
const dotss = document.querySelector(".dot.ss");

const digt = n => n < 10 ? "0" + n : n;

setInterval( e => {

    const date = new Date();
    const yy = digt(date.getFullYear() );
    const mo = digt(date.getMonth()+1 );
    const dy = digt(date.getDay() );

    let h = digt(date.getHours());
    let m = digt(date.getMinutes());
    let s = digt(date.getSeconds());
    let am = h >= 12 ? "PM" : "AM";
    h > 12 ? h = h - 12 : null;
    
    tit.innerHTML = yy +"."+ mo +"."+ dy;
    hour.innerHTML = h + "<i>Hours</i>";
    mins.innerHTML = m + "<i>Minutes</i>";
    secs.innerHTML = s + "<i>Seconds</i>";
    ampm.innerHTML = am;

    const round = hh.getTotalLength();

    hh.style.strokeDashoffset = round - (round * h) / 12;
    mm.style.strokeDashoffset = round - (round * m) / 60;
    ss.style.strokeDashoffset = round - (round * s) / 60;

    dothh.style.transform = 'rotate('+ h * 360 / 12 +'deg)';
    dotmm.style.transform = 'rotate('+ m * 360 / 60 +'deg)';
    dotss.style.transform = 'rotate('+ s * 360 / 60 +'deg)';
    // console.log(round);
},500);