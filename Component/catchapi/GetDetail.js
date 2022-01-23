import axios from 'axios';
import {useEffect, useState} from 'react';

const GetDetail = url => {
  const [datas, setdatas] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(url, {
        cancelToken: source.token,
      })
      .then(Response => {
        if (Response.status !== 200) {
          seterror(Response.status);
        } else {
          setloading(false);
          setdatas(Response.data);
          seterror(null);
        }
      })
      .catch(err => {
        if (cleanup) {
          setloading(false);
          seterror(err.message);
        }
      });
    return () => source.cancel();
  }, [url]);
  return {datas, error, loading};
};

export default GetDetail;
