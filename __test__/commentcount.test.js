import getComment from '../mock/comment.mock.js';

it('count the comments', () => {
  const comments = () => {
    getComment().then((data) => {
      expect(data.length).toBe(2);
    });
  };
  comments();
});

it('test the username', () => {
  const comments = () => {
    getComment().then((data) => {
      expect(data[1].username).toBe('Maria');
    });
  };
  comments();
});