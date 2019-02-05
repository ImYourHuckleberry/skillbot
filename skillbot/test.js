
'use strict'

const slack = require('slack')
const _ = require('lodash')


let bot =  new SlackBot({
    token: "xoxb-3488203655-535560171009-a2vox4OBmRBQdidf3J6fuBt8",
    name: "skillbot"
  });

bot.started((payload) => {
  this.self = payload.self
})


bot.message((msg) => {
  
  if (!msg.user) return
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return


  
  slack.users.info({
    token: "xoxb-3488203655-535560171009-a2vox4OBmRBQdidf3J6fuBt8",
    user: msg.user
  }, (err, data) => {
    if (err) throw err
    console.log(msg.text, data.user.name);
    console.log(msg, text, slack);

  })
})


module.exports = bot






var sql =
"UPDATE skills SET skills= concat(skills,'"+skillArray+"') WHERE name='"+name+"'"