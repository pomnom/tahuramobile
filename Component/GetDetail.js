import {useEffect, useState} from 'react';
import axiosconfig from './config/axiosconfig';

function GetDetail(organismeId) {
  const [datas, setdatas] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    let cleanup = true;
    axiosconfig
      .getDataById(organismeId)
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
  return {datas, error, loading};
}

export default GetDetail;
