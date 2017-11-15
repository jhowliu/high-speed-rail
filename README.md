# high-speed-rail


Using [MOTC api](http://ptx.transportdata.tw/MOTC/Swagger/)

- [HMAC authentication](https://github.com/Caligatio/jsSHA)

<b>POST</b> /THSR (Return timetable in JSON format)
<pre>
body: {
  startStation: station of deparute. (ex: 台北)
  endStation: destination. (ex: 高雄)
  departureTime: YYYYMMDDHH (ex:2017111512)
}
</pre>
