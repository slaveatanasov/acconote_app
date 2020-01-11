export let apiURL;

if (process.env.NODE_ENV !== 'production') {
  apiURL = process.env.REACT_APP_API_URL;
} else {
  apiURL = 'https://acconote.herokuapp.com';
}