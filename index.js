// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', function (req, res) {
    let dateStr = req.params.date; // 获取URL中的日期参数
    let date;
    // 1.先看看dateStr有没有传递参数,若没有,就使用当前日期
    if (!dateStr) {
        date = new Date();
    }
    // 2.如果有日期参数,就尝试解析,并得到日期
    else {
        // 2.1如果解析出来是数字,就认为是unix时间戳,转换成日期
        if (!isNaN(dateStr)) {
            date = new Date(parseInt(dateStr));
        }
        // 2.2如果解析出来是日期字符串,就直接转换成日期
        else {
            date = new Date(dateStr);
        }
    }
    // 3.如果日期无效,就返回错误
    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }
    // 4.如果日期有效,就返回时间戳(json格式)
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

