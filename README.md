# high-speed-rail


Using [交通部PTX平臺](http://ptx.transportdata.tw/MOTC/Swagger/)

- [HMAC authentication](https://github.com/Caligatio/jsSHA)


## Usage
<b>POST</b> /THSR (Return timetable in JSON format)
<pre>

body: {
  startStation: station of deparute. (ex: 台北)
  endStation: destination. (ex: 左營)
  departureTime: YYYYMMDDHH (ex:2017111522)
}

response: {
    "success": true,
    "msg": "Fetch successfully.",
    "data": [
        {
            "TrainNo": "295",
            "StartStation": "台北",
            "DepartureTime": "22:16",
            "EndStation": "左營",
            "ArivalTime": "23:59"
        }
    ]
}
</pre>


## Reference

本服務資料介接「交通部PTX平臺」
