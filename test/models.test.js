const expect = require('chai').expect;
const db = require('../db');

describe('Models', ()=> {
  beforeEach((done)=> {
    db.seed()
      .then(()=> done())
      .catch( e => done(e));
  });

  describe('Story', ()=> {
    let stories;
    beforeEach((done)=> {
      db.models.Story.findAll()
        .then( _stories=> stories = _stories )
        .then( ()=> done())
        .catch( e => done(e));
    });

    describe('seeded data', ()=> {
      it('there are 4 stories', ()=> {
        expect(stories.length).to.equal(4);
      });
    });
  });

  describe('User', ()=> {
    it('exists', ()=> {
      expect(db.models.User).to.be.ok;
    });

    describe('seeded data', ()=> {
      let users;
      beforeEach((done)=> {
        db.models.User.findAll()
          .then( _users => users = _users)
          .then( ()=> done())
          .catch( err=> done(err));
      });
      it('there are two users', ()=> {
        expect(users.length).to.equal(2);
      });
    });
  });

  describe('Create story', () => {
    let story;
    beforeEach((done) => {
      db.models.Story.createStory('bob', 'story title', 'story contents', ['cool', 'story', 'bro'])
      .then(fdstory => {
        story = fdstory;
        done();
      })
      .catch(done);
    });

    it('creates a story', () => {
      expect(story.title).to.equal('story title');
      expect(story.tags).to.contain('cool');
    });
  });

  describe('Does not allow user name duplicates', () => {
    it('fails on duplicate', (done) => {
      let user = db.models.User.build({ name: 'prof' });
      user.validate().then((err) => {
        console.log(err);
        done();
      });
    });
  });
});
