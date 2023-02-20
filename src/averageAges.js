'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm'
      && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const menAge = men.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  const averageAge = menAge / men.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? isMother(people, person)
    : person.sex === 'f'
  );

  return women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0) / women.length;
}

function isMother(people, woman) {
  return people.some(
    child => child.mother === woman.name
  );
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm' && hasMother(people, person.mother)
    : hasMother(people, person.mother)
  );

  const mothersAge = children.map(child =>
    child.born - motherBorn(people, child.mother)
  );

  const totalAge = mothersAge.reduce((result, child) =>
    result + child, 0);

  const averageAge = totalAge / children.length;

  return averageAge;
}

function hasMother(people, motherName) {
  return people.some(person => person.name === motherName);
}

function motherBorn(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
