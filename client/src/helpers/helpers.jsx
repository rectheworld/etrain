

const cleanLinkedIn = (fullLink) => {
  let name = null;
  /// Try first matching to the https link
  // eslint-disable-next-line no-useless-escape
  name = fullLink.match('https:\/\/www\.linkedin\.com\/in\/([a-zA-Z0123456789-]+)')[1];

  // if blank try other www link
  if (!name) {
    // eslint-disable-next-line no-useless-escape
    name = fullLink.match('www\.linkedin\.com\/in\/([a-zA-Z0123456789-]+)')[1];
  }
  return(name)
} // End cleanLinkedIn

module.exports = {
  cleanLinkedIn: cleanLinkedIn
}