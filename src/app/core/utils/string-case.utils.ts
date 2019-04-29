export function kebabCase(str: string) {
  let result = str;

  // Convert existing camelCase to space.
  result = result.replace(/([a-z][A-Z])/g, function(match) {
    return match.substr(0, 1) + ' ' + match.substr(1, 1).toLowerCase();
  });

  // Replace dashes with space
  result = result.replace(/-/g, ' ');

  // Remove non-alphanumeric characters
  result = result.replace(/[^\sa-zA-Z0-9]+/g, '');

  result = result.replace(/^[0-9]+/, '');

  // Convert spaces to dash and then change any remaining capitals to lowercase
  result = result.replace(/\s+/g, '-').toLowerCase();
 
  // Remove hyphens from both ends
  result = result.replace(/^-+/, '').replace(/-$/, '');

  return result;
}

export function camelCase(str: string) {
   
  let result = str;

  // Convert existing camelCase to space.
  result = result.replace(/([a-z][A-Z])/g, function(match) {
    return match.substr(0, 1) + ' ' + match.substr(1, 1).toLowerCase();
  });

  // Replace dashes with space
  result = result.replace(/-/g, ' ');

  // Remove non-alphanumeric characters
  result = result.replace(/[^\sa-zA-Z0-9]+/g, '');

  result = result.replace(/^[0-9]+/, '');

  // Change to camel case
  result = result.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');

  return result;
}

export function normalCaps(str: string) {
   
  let result = str;

  // Convert existing camelCase to space.
  result = result.replace(/([a-z][A-Z])/g, function(match) {
    return match.substr(0, 1) + ' ' + match.substr(1, 1).toLowerCase();
  });

  // Replace dashes with space
  result = result.replace(/-/g, ' ');

  // Remove non-alphanumeric characters
  result = result.replace(/[^\sa-zA-Z0-9]+/g, '');

  result = result.replace(/^[0-9]+/, '');

  // Change to camel case
  result = result.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  return result;
}

export function lowerCamelCase(str: string) {
   
  let result = str;

  // Convert existing camelCase to space.
  result = result.replace(/([a-z][A-Z])/g, function(match) {
    return match.substr(0, 1) + ' ' + match.substr(1, 1).toLowerCase();
  });

  // Replace dashes with space
  result = result.replace(/-/g, ' ');

  // Remove non-alphanumeric characters
  result = result.replace(/[^\sa-zA-Z0-9]+/g, '');

  result = result.replace(/^[0-9]+/, '');

  // Change to camel case
  result = result.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');

  return result.charAt(0).toLowerCase() + result.slice(1);
}