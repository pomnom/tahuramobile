import axios from 'axios';
import {useState, useEffect} from 'react';
import axiosconfig from '../config/axiosconfig';
function GetPetas(organismeId) {
  const [kordinats, setkordinats] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const [organisme, setorganisme] = useState(null);
  useEffect(() => {
    let cleanup = true;
    setkordinats(null);
    setorganisme(null);
    axios
      .all([
        axiosconfig.getDataById(organismeId),
        axiosconfig.getAllPeta(organismeId),
      ])
      .then(
        axios.spread((...responses) => {
          if (cleanup) {
            setorganisme(responses[0].data);
            setkordinats(responses[1].data);
            setloading(false);
            seterror(null);
          }
        }),
      )
      .catch(err => {
        if (cleanup) {
          if (err.response) {
            seterror(false);
            seterror(err.message);
          } else if (error.request) {
            setloading(false);
            seterror(error.message);
          }
        }
      });
    return () => {
      cleanup = false;
    };
  }, []);
  return {kordinats, error, loading, organisme};
}

export default GetPetas;
