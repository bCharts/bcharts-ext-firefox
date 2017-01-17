var onMessageHandler = function(message){
  Ensure it is run only once, as we will try to message twice
  browser.runtime.onMessage.removeListener(onMessageHandler);
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", message.url);
  for(var key in message.data) {
    var hiddenField = document.createElement("textarea");
    hiddenField.setAttribute("style", "display:none;");
    hiddenField.setAttribute("name", key);
    hiddenField.value = message.data[key];
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
}

browser.runtime.onMessage.addListener(onMessageHandler);
