// How to Safely Access Deeply Nested Properties in JavaScript:

// You can use the function below to get nested properties from objects error safe. If a property doesn’t exist, it won’t throw the famous last words: “cannot read property of undefined”

// Source: https://www.webtips.dev/webtips/javascript/how-to-safely-access-deeply-nested-properties-in-javascript

const getProperty = (obj, path) =>
  path.split('.').reduce((value, el) => value[el], obj);

export default getProperty;
