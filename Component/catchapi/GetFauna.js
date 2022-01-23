import axios from 'axios';
import {useEffect, useState} from 'react';
const GetFauna = url => {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const [datas, setdatas] = useState(null);
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
  }, []);
  return {datas, error, loading};
};

export default GetFauna;
