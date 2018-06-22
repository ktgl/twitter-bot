const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 0.2; // timeout to send the message in 12 seconds 

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Auto Direct Message initialised...waiting for follows 🚀🚀🚀");
  stream.on("follow", SendMessage);
};

const SendMessage = user => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(`🎉🎉🎉🎉 New Follower - ${screen_name} 🎉🎉🎉🎉`);
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message sent successfully to ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hi ${name} Thanks for following! Need #ITsupport or #Contrex VoIP telephone systems? 

KTGL is a #Hull based company supporting local businesses for 20 years.
Contact us on 01482 291291, email us at support@ktgl.co.uk, or check us out at http://www.ktgl.co.uk/. 

We'll be happy to assist! 

Thanks
KTGL      
😊 `; // your message
};

module.exports = AutoDM;
