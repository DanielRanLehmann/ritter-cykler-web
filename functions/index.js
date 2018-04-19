
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

var fetch = require('isomorphic-fetch')
var btoa = require('btoa');
var crypto = require('crypto');

const MAILCHIMP_API_KEY = functions.config().mailchimp.apikey
var dc = functions.config().mailchimp.dc
var listId = functions.config().mailchimp.listid

var async = require("async");
var nodemailer = require('nodemailer');

const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

const sharp = require('sharp')
const _ = require('lodash');

admin.initializeApp(functions.config().firebase);
var db = admin.database();

exports.reservation = functions.database.ref('/reservations/{$reservation}').onWrite(event => {
   const reservationData = event.data.val();
   console.log("reservationData")
   console.log(reservationData)

   var productRef = db.ref("products/" + reservationData.productId);
   productRef.once("value", (snapshot) => {
      const productData = snapshot.val();

      var newQty = productData.qty;
      newQty[reservationData.productSize] = newQty[reservationData.productSize] - reservationData.qty;

      var newQtySum = 0
      for (var key in newQty) {
        newQtySum += newQty[key]
      }

      const newInStock = (newQtySum > 0)

      return productRef.update({
        "qty": newQty,
        "inStock": newInStock
      }).then( () => {

        // on success
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: functions.config().auth.user,
            pass: auth.pass
          }
        });

        emails = [
          {
            from: functions.config().auth.user,
            to: functions.config().auth.user, // should be in production: enquiryData.email,
            subject: "Bekræftelse af din reservation - Bike Shop",
            html: '<p>' + 'Hej ' + reservationData.firstName + ' ' + reservationData.lastName + "," + '<br/>' + 'Vi har modtaget din reservation.' + '<br/><br/>' + '<b>Reserveret produkt:</b> ' + reservationData.productName + '<br/>' + 'Størrelse: ' + reservationData.productSize + '<br/>' + 'Antal: ' + reservationData.qty.toString() + '<br/>' +  'Total: ' + reservationData.total + ' ' + reservationData.currency + '<br/>' + 'I tilfælde af uoverenstemmelse med reservationen kan du skrive til os på EMAIL_ADDRESSE eller ringe til os på TELFON_NR' + '<br/><br/>' + 'Med venlig hilsen,' + '<br/>' + 'Bike Shop' + '</p>'
          },

          {
            from: functions.config().auth.user,
            to: functions.config().auth.user,
            subject: "Reservation - " + reservationData.productName,
            html: '<p>' + '<b>Kunde Info:</b> ' + '<br/>' + 'Navn: ' + reservationData.firstName + ' ' + reservationData.lastName + '<br/>' + 'Email: ' + reservationData.email  + '<br/><br/>' + '<b>Produkt Info:</b> ' + '<br/>' + 'Produkt: ' + reservationData.productName + '<br/>' + 'Størrelse: ' + reservationData.productSize + '<br/>' + 'Antal: ' + reservationData.qty.toString() + '<br/>' +  'Total: ' + reservationData.total + ' ' + reservationData.currency + '</p>'
          }
        ]

        async.each(emails, (mailOptions, callback) => {

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("An error occurred sending email..")
              console.log(error)
            } else {
              console.log("Success sending email")
              console.log(info)
            }
          })

        }, function(err) {
          if(err){
              return console.log("Sending to all emails failed:" + err);
          }

          return console.log('Sending all emails were successful')
       })

       return console.log("emails were sent.")

   }).catch((error) => {
      return error;
   })
 })
})

exports.subscribeToNewsletter = functions.database.ref('/newsletter-subscribers/{$subscriber}').onWrite(event => {
  const subscriberData = event.data.val();

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
})

exports.sendContactEnquiryEmail = functions.database.ref('/contact-enquiries/{$enquiry}').onWrite(event => {
  const enquiryData = event.data.val();

  if (!enquiryData || !("email" in enquiryData &&
                        "message" in enquiryData)) {

     return console.log("Missing value(s) in data parameter.")
  }

  // don't ship auth's here!
  // use enviroment props instead.

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: functions.config().auth.user,
      pass: functions.config().auth.pass
    }
  });

  var subject = "Ukendt Emne"
  if ("subject" in enquiryData) {
    subject = enquiryData.subject
  }

  var html = '<p><b>' + subject + '</b><br/>' + enquiryData.message + '<br/><br/>' + 'fra: ' + enquiryData.firstName + " " + enquiryData.lastName + '<br/>' + enquiryData.email + '</p>';

  var mailOptions = {
    from: 'danielran11@gmail.com', // fixed.
    to: 'danielran11@gmail.com', // fixed.
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    } else {
      return console.log('Contact enquiry email successfully sent: ' + info.response);
    }
  });
})

exports.generateThumbnails = functions.storage.object().onFinalize((object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const fileDir = path.dirname(filePath);
  const components = fileDir.split("/")
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  const SIZES = [
    {"width": null, "height" : 89, "filename": "small"},
    {"width": null, "height": 235, "filename": "medium"},
    {"width": null, "height": 572, "filename": "large"}
  ]; // Resize target width in pixels


  if (!contentType.startsWith('image/') || resourceState === 'not_exists') {
    console.log('This is not an image');
    return;
  }

  if (components[0] !== "product-images" || isNaN(components[(components.length - 1)])) {
    console.log("Will not create thumbnails for image. Invalid path.")
    return;
  }

  if (!_.includes(filePath, 'original')) {
    console.log("image is not named original, no thumbnails will be generated")
    return;
  }

  if (_.includes(filePath, 'small') ||
      _.includes(filePath, 'medium') ||
      _.includes(filePath, 'large')) {
    console.log('already processed thumbnail image');
    return;
  }

  const fileName = filePath.split('/').pop();
  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {

    let promises = []
    let imgURLs = {}

    for (var i = 0; i < SIZES.length; i++) {

      let sizeOptions = SIZES[i]

      let newFileTemp = path.join(os.tmpdir(), sizeOptions.filename + '.jpg');
      let newFilePath = fileDir + '/' + sizeOptions.filename + '.jpg'

      promises.push(new Promise((resolve, reject) => {
        sharp(tempFilePath)
          .resize(sizeOptions.width, sizeOptions.height)
          .toFile(newFileTemp, (err, info) => {
            if (err) {
              console.log("thumbnail error occurred.")
            }

            let imgURL = 'https://firebasestorage.googleapis.com/v0/b/' + bucket.name + '/o/'
            imgURL += encodeURIComponent(fileDir + '/' + sizeOptions.filename + '.jpg')
            imgURL += '?alt=media&token='
            imgURL += object.metadata.firebaseStorageDownloadTokens

            imgURLs[sizeOptions.filename] = imgURL;

            bucket.upload(newFileTemp, {
              destination: newFilePath
            })
            .then(() => resolve())
            .catch((error) => console.log("upload thumbnail error occured."))
          })
        })
      )
    }

    return Promise.all(promises)
      .then(() => {
        let imgURL = 'https://firebasestorage.googleapis.com/v0/b/' + bucket.name + '/o/'
        imgURL += encodeURIComponent(filePath)
        imgURL += '?alt=media&token='
        imgURL += object.metadata.firebaseStorageDownloadTokens

        imgURLs['original'] = imgURL;

        console.log("imageURLs")
        console.log(imgURLs)

        var productImageURLsRef = db.ref("products/" + components[1] + '/imageURLs/' + components[(components.length - 1)]);
        return productImageURLsRef.update(imgURLs)

      }).catch((error) => {
        return console.log("an error occured.")
      })

  }).catch((error) => {
    return console.log("an error occurred downloading to temp. dir.")
  })
})
