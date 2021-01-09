import chai from 'chai';
const expect = chai.expect;

import User from '../src/user.js';
import Pantry from '../src/pantry.js';

describe('Pantry', () => {
  let pantry
  let user
  beforeEach(() => {
    let userPantry = [
      {
        "ingredient": 11477,
        "amount": 1
      },
      {
        "ingredient": 93820,
        "amount": 1
      },
      {
        "ingredient": 11297,
        "amount": 3
      },
      {
        "ingredient": 11547,
        "amount": 5
      },
      {
        "ingredient": 1082047,
        "amount": 5
      },
      {
        "ingredient": 1032050,
        "amount": 1
      },
      {
        "ingredient": 20081,
        "amount": 4
      },
      {
        "ingredient": 11215,
        "amount": 2
      }]
    user = new User(36985, "You Sir", userPantry)
    pantry = new Pantry(user.pantry);
  });

  it('should be an instrance of Pantry class', () => {
    expect(pantry).to.be.a.instanceof(Pantry);
  });
});