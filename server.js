var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
require('dotenv').config();
var fs = require('fs');

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

var app = express();
module.exports = app; // for testing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(pino);

var router = express.Router();

var lastAffirmation = ""
var affirmations = fs.readFileSync('affirmations.txt').toString().split("\n").filter(function (val) {
  return val != "";
});

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj[k] = v;
    }
    return obj;
}

function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

router.route('/affirmations')
    .get(function (req, res) {
      res.header('Content-Type', 'application/json');

      var affirmation = affirmations[Math.floor(Math.random()*affirmations.length)]
      while(affirmation == lastAffirmation){
          affirmation = affirmations[Math.floor(Math.random()*affirmations.length)]
      }
      lastAffirmation = affirmation

      res.status(200).send({affirmation: affirmation})
      
    })
    .post(function (req, res) {
        console.log("called post function");
        res.header('Content-Type', 'application/json');
        client.messages
          .create({
              from: process.env.TWILIO_PHONE_NUMBER,
              to: req.body.to,
              body: req.body.body
              })
          .then(() => {
              res.send(JSON.stringify({ success: true }));
          })
          .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
          });
    });

router.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message(affirmations[Math.floor(Math.random()*affirmations.length)]);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.use('/', router);
app.listen(process.env.PORT || 8080);
