import { useEffect } from 'react';

function DocumentTitle () {
    useEffect(() => {
      document.title = 'Meme Generator';
    }, []);
  }

export default DocumentTitle;