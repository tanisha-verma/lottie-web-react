import _ from 'lodash';
export const animationMissing = 'Looks like you have missed animation . Use animationData to pass a json or use path to pass in url';
export const PLAY = 'play';
export const PAUSE = 'pause';
export const STOP = 'stop';
export const directionForward = 1;
export const directionReverse = -1;
export const examplePath = 'https://assets6.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json';
export const checkObjectsEqualByValue = (object1, object2) => {
  //Find all keys of object1 since comparing object with object1 is enough to validate equality
  //For every key find if object 2 has the same key and then compare with the value of object1 for that key.
  //For nested objects recursively check equality
  let is_equal = true;

  const object_keys = _.keys(object1);

  for (let i = 0; i < object_keys.length; i++) {
    let key = object_keys[i];

    if (_.has(object2, key)) {
      if (_.isObject(object2[key])) {
        return checkObjectsEqualByValue(object1[key], object2[key]);
      } else if (object1[key] !== object2[key]) {
        return false;
      }
    } else {
      return false;
    }
  }

  return is_equal;
};