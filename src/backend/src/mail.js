function body(name, session_id, req, app) {
  return `<i>Please do not reply to this message.</i><br><br>

${name}, <br><br>    

An assessment session has been created for you. <br><br>    

Click <a href="${req.protocol}://${req.hostname}:${app.get("port")}/quiz/${session_id}">here</a> to log in and begin your session. You session ID is ${session_id}.<br><br>

You will receive instructions when you log in. Please save this information for future reference. <br><br>

For technical assistance, please contact Technical Support.<br><br>    

DISCLAIMER:<br>
This communication, along with any attachment(s), is intended only for the use of the addressee(s) and may contain proprietary, confidential or privileged information. If you are not the intended recipient, you are hereby notified that any dissemination, distribution or copying of any information contained in or attached to this communication is strictly prohibited. If you have received this message in error, please notify the sender immediately and destroy the original communication and its attachments without reading, printing or saving in any manner. Thank you.`;
}

module.exports = body;