import { useEffect } from 'react';

function DocumentTitle () {
    useEffect(() => {
      // changes title of document for the site
      document.title = 'Meme Generator';
    }, []);
  }

export default DocumentTitle;