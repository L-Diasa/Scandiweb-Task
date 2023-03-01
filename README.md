# Scandiweb Task

* Free PHP and MySQL hosting on 000webhost.com does not support sending HTTP DELETE method. That is why I modified POST method so that I could use it for both posting and deleting products.

* Since direct DOM manipulation does not work on React controlled elements, DeleteProducts_test.js failed. Therefore, I modified onClick method of "MASS DELETE" button and triggered click event on each checkbox which had a checked value true so that they would be deleted too.