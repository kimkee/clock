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
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+myCity+'&appid='+appid+'&units=metric')
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

        document.querySelectorAll(".btn:not(.my)").forEach( bt => bt.addEventListener("click", e => setCity(bt.value)));

    },
    draw: function(){ /* 시계 렌더링 */
        const time = { /* 시,분,초 */
            yymd: document.querySelector(".date"),
            hour: document.querySelector(".circle.hh .nm"),
            mins: document.querySelector(".circle.mm .nm"),
            secs: document.querySelector(".circle.ss .nm"),
            ampm: document.querySelector(".circle.hh .ap"),
        };
        const circ = { /* 원 */
            hh: document.querySelector(".circle.hh .cr"),
            mm: document.querySelector(".circle.mm .cr"),
            ss: document.querySelector(".circle.ss .cr"),
        };
        const dots = { /* 점  */
            hh: document.querySelector(".circle.hh .dot"),
            mm: document.querySelector(".circle.mm .dot"),
            ss: document.querySelector(".circle.ss .dot"),
        };
        const weeks = { /* 요일 */
            "ch": ["日","月","火","水","木","金","土"],
            "en": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
            "ko": ["월","화","수","목","금","토","일"]
        };

        const dgt = n => n < 10 ? "0" + n : n; /* "01","02" 두자리 수로 만들기 */

        const date = new Date();
        const tday = {
            yy: date.getFullYear(),
            mo: date.getMonth()+1,
            dy: date.getDate(),
            wk: date.getDay(),
            hh: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
            mm: date.getMinutes(),
            ss: date.getSeconds(),
            am: date.getHours() >= 12 ? "PM" : "AM",
        };
        // console.log(tday);

        /* 렌더 */
        time.yymd.innerHTML = "<b>"+tday.yy +"."+ dgt(tday.mo) +"."+ dgt(tday.dy) +"</b> <i>("+ weeks.ko[tday.wk] +")</i>";
        time.hour.innerHTML = "<b>"+dgt(tday.hh)+"</b>";
        time.mins.innerHTML = "<b>"+dgt(tday.mm)+"</b>";
        time.secs.innerHTML = "<b>"+dgt(tday.ss)+"</b>";
        time.ampm.innerHTML = tday.am;

        const round = circ.hh.getTotalLength(); /* 둘레길이 */

        circ.hh.style.strokeDashoffset = round - (round * tday.hh) / 12;
        circ.mm.style.strokeDashoffset = round - (round * tday.mm) / 60;
        circ.ss.style.strokeDashoffset = round - (round * tday.ss) / 60;

        dots.hh.style.transform = 'rotate('+ tday.hh * 360 / 12 +'deg)';
        dots.mm.style.transform = 'rotate('+ tday.mm * 360 / 60 +'deg)';
        dots.ss.style.transform = 'rotate('+ tday.ss * 360 / 60 +'deg)';
    }
};

document.addEventListener('DOMContentLoaded', e => clock.init() );