reservationData = {
  "productName": "product name",
  "firstName": "first lady",
  "lastName": "last lady",
  "email": "email@host.com",
  "total": 2000,
  "qty": 1,
  "currency": "DKK",
  "productSize": "*"
}

email = {
  from: 'danielran11@gmail.com', // fixed.
  to: 'danielran11@gmail.com',
  subject: "Reservation - " + reservationData.productName,
  html: '<p>' + '<b>Kunde Info:</b> ' + '<br/>' + 'Navn: ' + reservationData.firstName + ' ' + reservationData.lastName + '<br/>' + 'Email: ' + reservationData.email  + '<br/><br/>' + '<b>Produkt Info:</b> ' + '<br/>' + 'Produkt: ' + reservationData.productName + '<br/>' + 'Størrelse: ' + reservationData.productSize + '<br/>' + 'Antal: ' + reservationData.qty.toString() + '<br/>' +  'Total: ' + reservationData.total + ' ' + reservationData.currency + '</p>'
}

console.log(email.html);
