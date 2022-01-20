import {useEffect, useState} from 'react';
import axiosconfig from './config/axiosconfig';
function GetDataAllOrganisme() {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const [datas, setdatas] = useState(null);
  useEffect(() => {
    let cleanup = true;
    axiosconfig
      .getAllData()
      .then(Response => {
        if (cleanup) {
          if (Response.status !== 200) {
            seterror(Response.status);
          } else {
            setloading(false);
            setdatas(Response.data);
            seterror(null);
          }
        }
      })
      .catch(err => {
        if (cleanup) {
          setloading(false);
          seterror(err.message);
        }
      });
    return () => {
      cleanup = false;
    };
  }, []);
  return {error, loading, datas};
}

export default GetDataAllOrganisme;
