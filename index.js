const clock = {
    init: function(){
        this.evt();
    },
    evt: function(){
        this.draw();
        this.weather();
        setInterval( e => this.draw(), 1000);
    },
    weather:function(){ /* 날씨(아이콘,온도) */
        const icons = {
            '01' : 'fas fa-sun',
            '02' : 'fas fa-cloud-sun',
            '03' : 'fas fa-cloud',
            '04' : 'fas fa-cloud-meatball',
            '09' : 'fas fa-cloud-sun-rain',
            '10' : 'fas fa-cloud-showers-heavy',
            '11' : 'fas fa-poo-storm',
            '13' : 'far fa-snowflake',
            '50' : 'fas fa-smog'
        };
        const tit = document.querySelector(".tit");
        fetch('https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=65580fe0755188a571a8abece81b2ad2&units=metric')
        .then( res => {
            if( res.ok ) { 
                return res.json();
            }
        })
        .then( data => {
            const city = data.name;
            const temp = (data.main.temp).toFixed(0) +' ºC';
            const icon = (data.weather[0].icon).substr(0,2);
            console.log( data, icon , temp );
            tit.innerHTML = '<i class="' + icons[icon] +'"></i> ' + city + ' '+ temp + '';
        });
    },
    draw: function(){
        const hour = document.getElementById("hour");
        const mins = document.getElementById("mins");
        const secs = document.getElementById("secs");
        const ampm = document.getElementById("ampm");

        const yymd = document.querySelector(".date");
        const hh = document.getElementById("hh");
        const mm = document.getElementById("mm");
        const ss = document.getElementById("ss");

        const dothh = document.querySelector(".dot.hh");
        const dotmm = document.querySelector(".dot.mm");
        const dotss = document.querySelector(".dot.ss");
        const weeks = {
            "ch": ["日","月","火","水","木","金","土"],
            "en": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
            "ko": ["월","화","수","목","금","토","일"]
        };

        const dgt = n => n < 10 ? "0" + n : n;

        const date = new Date();
        const yy = date.getFullYear();
        const mo = date.getMonth()+1;
        const wk = date.getDay();
        const dy = date.getDate();
        

        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        let am = h >= 12 ? "PM" : "AM";
        h > 12 ? h = h - 12 : null;
        
        yymd.innerHTML = "<b>"+yy +"."+ dgt(mo) +"."+ dgt(dy) +"</b> <i>("+ weeks.ko[wk] +")</i>";
        hour.innerHTML = "<b>"+dgt(h)+"</b>" + "<i>Hours</i>";
        mins.innerHTML = "<b>"+dgt(m)+"</b>" + "<i>Minutes</i>";
        secs.innerHTML = "<b>"+dgt(s)+"</b>" + "<i>Seconds</i>";
        ampm.innerHTML = am;

        

        const round = hh.getTotalLength(); /* 둘레길이 */

        hh.style.strokeDashoffset = round - (round * h) / 12;
        mm.style.strokeDashoffset = round - (round * m) / 60;
        ss.style.strokeDashoffset = round - (round * s) / 60;

        dothh.style.transform = 'rotate('+ h * 360 / 12 +'deg)';
        dotmm.style.transform = 'rotate('+ m * 360 / 60 +'deg)';
        dotss.style.transform = 'rotate('+ s * 360 / 60 +'deg)';
    }
};

document.addEventListener('DOMContentLoaded', e => clock.init() );