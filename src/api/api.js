import fire from '../fire.js';
const storage = fire.storage();

// FETCH

export function asyncFetchProducts(lastProductId, callback) {
  const count = 15;
  var query = fire.database().ref('products').orderByKey().limitToLast(count);

  if (lastProductId) {
    query = fire.database().ref('products').orderByKey().limitToLast(count+1).endAt(lastProductId);
  }

  return query.once('value', snapshot => {
    var batch = [];
    snapshot.forEach((product) => {
      if (product.key !== lastProductId) {
        var productData = product.val();
        productData["id"] = product.key;
        batch.push(productData);
      }
    });

    if (batch.length > 1) { batch = batch.reverse(); }
    callback(batch);

  });
}

export function asyncFetchProductDetails(productId, callback) {
  if (!productId) {
    throw "paramter productid cannot be null"
  }

  return fire.database().ref('products/' + productId).once('value', snapshot => {
    var exists = snapshot.exists();
    var data = null;
    if (exists) {
      data = snapshot.val();
      data["id"] = snapshot.key;
    }
    callback(exists, data);
  });
}

export function asyncFetchProductImageURL(productId, imageName, callback) {
  var imageRef = storage.ref("product-images/" + productId + "/" + imageName);
  imageRef.getDownloadURL().then((url) => {
    callback(url);
  });
}

// SEND

export function sendReservation(reservation, callback) {
  if (!reservation) {
    throw("reservation cannot be null");
  }

  const newKey = fire.database().ref().child('reservations').push().key;

   const updates = {};
   updates['/reservations/' + newKey] = reservation;
   updates['/product-reservations/' + reservation.productId + '/' + newKey] = reservation;

   return fire.database().ref().update(updates).then(() => {
     callback(true);
   });
}

// send Enquiry
export function sendContactEnquiry(enquiry, callback) {
  if (!enquiry) {
    throw("no enquiry found")
  }

  const newKey = fire.database().ref().child('contact-enquiries').push().key;
  const updates = {}
  updates["/contact-enquiries/" + newKey] = enquiry;

  return fire.database().ref().update(updates).then(() => {
    callback(true);
  });
}

// subscribe user to newsletter.
export function sendFeedback(feedback, callback) {
  if (!feedback) {
    throw("no feedback found")
  }

  const newKey = fire.database().ref().child('feedback').push().key;
  const updates = {}
  updates["/feedback/" + newKey] = feedback;

  return fire.database().ref().update(updates).then(() => {
    callback(true);
  });
}

export function subscribeToNewsletter(subscriberData, callback) {
  if (!subscriberData) {
    throw("no subscriber data found")
  }

  const newKey = fire.database().ref().child('newsletter-subscribers').push().key;
  const updates = {}
  updates["/newsletter-subscribers/" + newKey] = subscriberData;

  return fire.database().ref().update(updates).then(() => {
    callback(true);
  });
}
