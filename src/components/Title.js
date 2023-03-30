import { useEffect } from 'react';
// function to change document title
function DocumentTitle () {
    useEffect(() => {
      // changes title of document for the site
      document.title = 'Meme Generator';
    }, []);
  }

export default DocumentTitle;