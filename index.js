const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({optionSuccessStatus: 200})); // some legacy browsers choke on 204

const isValidDate = (date) => {
    return ((date instanceof Date) && !isNaN(date));
};

const requestHandler = (request, response) => {
    const date = new Date(request.params.dateString);
    if (isValidDate(date)) {
        response.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    } else {
        const dateFromUnixTimestamp = new Date(parseInt(request.params.dateString));
        if (isValidDate(dateFromUnixTimestamp)) {
            response.json({
                unix: dateFromUnixTimestamp.getTime(),
                utc: dateFromUnixTimestamp.toUTCString()
            });
        } else {
            response.json({
                error: "Invalid Date"
            });
        }
    }
};

app.get('/api/timestamp/', function (request, response, next) {
    request.params.dateString = (new Date()).toISOString();
    next();
}, requestHandler);

app.get('/api/timestamp/:dateString', requestHandler);

app.get('/', function (request, response) {
    response.json({
        project: 'fcc-node-timestamp'
    });
});

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
