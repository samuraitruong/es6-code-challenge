import 'mocha';
import {
  expect,
} from 'chai';
import {
  BookRepository,
} from '../../db';

describe('BookRepository test', () => {
  const repo = new BookRepository();
  for (let id = 1; id <= 5; id++) {
    it('addItem() should success and return data with id=' + id, async () => {
      const data = {
        title: 'test',
      };

      const output = await repo.addItem(data);
      expect(output).to.deep.eq({...data,
        id,
      });
    });
  }
});
