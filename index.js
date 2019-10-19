const express = require('express');
const app = express();

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
        response.json({
            error: 'Invalid Date'
        });
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

app.listen(8000);
