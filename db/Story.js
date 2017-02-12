const db = require('./db');
const User = require('./User');
const chalk = require('chalk');

const Story = db.define('story', {
  title: db.Sequelize.STRING,
  content: db.Sequelize.TEXT,
  tags: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING),
    defaultValue: []
  }
}, {
  getterMethods: {
    summary: function(){
      return this.content.slice(0, 4).toString() + '...';
    }
  },
  classMethods: {
    createStory(username, title, content, tags) {
      return User.findOrCreate({ where: {name:username}}).then(usersArr => {
        return Story.create({
          userId: usersArr[0].id,
          title: title,
          content: content,
          tags: tags
        });
      });
    }
  }
});

module.exports = Story;
