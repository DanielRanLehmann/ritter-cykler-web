import fire from '../fire.js';
const storage = fire.storage();

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

export function asyncFetchProductDetails(productId) {

}

export function asyncFetchProductImage(productId, imageName, callback) {
  var imageRef = storage.ref("product-images/" + productId + "/" + imageName);
  imageRef.getDownloadURL().then((url) => {
    callback(url);
  });
}
