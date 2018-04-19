var fetch = require('isomorphic-fetch')
var btoa = require('btoa');
var crypto = require('crypto');

const MAILCHIMP_API_KEY = '43273fb9e2ec216925ece3665a2e0e03-us14'
var dc = 'us14'
var listId = 'afebbb30ea'

function subscribeToNewsletter() {
  const subscriberData = {
    "createdAt": 1523955670514,
    "email": "daniellehmann68@gmail.com",
    "firstName": "Daniel",
    "lastName": "Lehmann"
  }

  if (!subscriberData || !("email" in subscriberData &&
                           "firstName" in subscriberData &&
                           "lastName" in subscriberData)) {

    return console.log("Missing value(s) in data parameter.")
  }

  var subscriberHash = crypto.createHash('md5').update(subscriberData.email).digest("hex")
  var url = 'https://' + dc + '.api.mailchimp.com/3.0/lists/' + listId + '/members/' + subscriberHash
  var method = 'PUT'
  var headers = {
    'authorization': "Basic " + btoa('randomstring:' + MAILCHIMP_API_KEY),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  data = {
    "email_address": subscriberData.email,
    "merge_fields": {
      "FNAME": subscriberData.firstName,
      "LNAME": subscriberData.lastName
    },
    "status": "subscribed"
  }

  var body = JSON.stringify(data)

  return fetch(url, {
    method,
    headers,
    body
  }).then( resp => resp.json() ).then(resp => {
    return console.log('User ' + data.status + ' to newsletter: ', data.email_address)
  })
}

//subscribeToNewsletter()

/*
qty = {
  "m": 20,
  "l": 12
}

console.log(qty.m.toString())
*/

SIZES = [
  {"size" : 89, "filename": "small.jpg"},
  {"size": 235, "filename": "medium.jpg"},
  {"size": 572, "filename": "large.jpg"}
]

for (var i = 0; i < SIZES.length; i++) {
  let size = SIZES[i]
  console.log(size.filename)
}

console.log(encodeURIComponent("some name goes here"));

const testDir =  'product-images/-L9tS6munRrc3TjiCx9b/0'
const components = testDir.split("/")

if (components[0] !== "product-images" || isNaN(components[(components.length - 1)])) {
  console.log("will not create thumbnails.. invalid path")
}

console.log("about to creat paths.")
