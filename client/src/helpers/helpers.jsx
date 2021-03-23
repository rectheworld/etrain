

const cleanLinkedIn = (fullLink) => {
  let name = null;
  /// Try first matching to the https link
  // eslint-disable-next-line no-useless-escape
  if(fullLink.match('https:\/\/www\.linkedin\.com\/in\/([a-zA-Z0123456789-]+)')) {
    name = fullLink.match('https:\/\/www\.linkedin\.com\/in\/([a-zA-Z0123456789-]+)')[1];
  } else if (fullLink.match('www\.linkedin\.com\/in\/([a-zA-Z0123456789-]+)')){
    name = fullLink.match('www\.linkedin\.com\/in\/([a-zA-Z0123456789-]+)')[1];
  }
 
  return(name)
} // End cleanLinkedIn

module.exports = {
  cleanLinkedIn: cleanLinkedIn
}

//https://www.linkedin.com/in/lexyk/ => lexyk

//www.linkedin.com/in/lexyk/ => lexyk

//www.neopets.com/lexyk/ OR anything else => null

