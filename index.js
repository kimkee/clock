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
        const tits = document.querySelector(".tit");
        const test = document.querySelector(".test");

        navigator.geolocation.getCurrentPosition( posit => { /* 위도,경도 가져오기 */
            let myLat = posit.coords.latitude;
            let myLon = posit.coords.longitude;
            test.innerHTML = "현재 사용자는 위도 " + myLat + ", 경도 " + myLon + "에 위치하고 있습니다.";
            getCity(myLat,myLon);
        },(err)=>{
            console.log(err.message);
            // let myLat = "35.6895";
            // let myLon = "139.6917";
            let myCity = "seoul";
            setCity(myCity);
            test.innerHTML = err.message;
        });

        const appid = "65580fe0755188a571a8abece81b2ad2"; /* api.openweathermap.org */

        const getCity = (myLat,myLon) => { /* 위도,경도로 도시이름 가져오기 */
            fetch('//api.openweathermap.org/geo/1.0/reverse?lat='+myLat+'&lon='+myLon+'&appid='+appid+'')
            .then( rest => rest.ok ? rest.json() : null )
            .then( data => {
                let myCity = data[0].local_names.en;
                setCity(myCity);
                console.log( data , myCity);
            });
        };

        const setCity = (myCity) => {  /* 도시이름으로 날씨,온도,아이콘 가져오기 */
            fetch('//api.openweathermap.org/data/2.5/weather?q='+myCity+'&appid='+appid+'&units=metric')
            .then( rest => rest.ok ? rest.json() : null )
            .then( data => {
                test.innerHTML = myCity + " - " + test.innerHTML ;
                const city = data.name;
                const temp = (Math.floor(data.main.temp * 10) / 10).toFixed(1) +'ºC'; /* 소수점 첫째자리만 */
                const icon = (data.weather[0].icon).substr(0,2);
                tits.innerHTML = '<i class="' + icons[icon] +'"></i> <b>' + city + ' '+ temp + '</b>';
                console.log( data, icon , temp , city );
            });
        };

    },
    draw: function(){ /* 시계 렌더링 */
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

        const dgt = n => n < 10 ? "0" + n : n; /* "01","02" 만들기 */

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