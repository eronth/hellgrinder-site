const getLoremIpsum = () =>
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


// type HeaderTypings = 
//     'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
//     | '1' | '2' | '3' | '4' | '5' | '6'
//     | 1 | 2 | 3 | 4 | 5 | 6;
// const convertHeaderToFull = (hx: HeaderTypings): string => {
//   let returnHx: string = '';

//   if (typeof hx === 'number') { returnHx = hx.toString(); }
//   if (returnHx[0] !== 'h') { returnHx = 'h' + returnHx; }
//   return returnHx;
// }

export default {
  //convertHeaderToFull,
  getLoremIpsum,
};