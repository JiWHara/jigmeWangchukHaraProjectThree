import { useEffect } from 'react';
// function to change document title
function DocumentTitle () {
    useEffect(() => {
      document.title = 'Meme Generator';
    }, []);
  }

export default DocumentTitle;