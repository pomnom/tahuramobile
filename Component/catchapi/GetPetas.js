import axios from 'axios';
import {useState, useEffect} from 'react';
import axiosconfig from '../config/axiosconfig';
function GetPetas(organismeId) {
  const [kordinats, setkordinats] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const [organisme, setorganisme] = useState(null);
  useEffect(() => {
    axios
      .all([
        axiosconfig.getDataById(organismeId),
        axiosconfig.getAllPeta(organismeId),
      ])
      .then(
        axios.spread((...responses) => {
          setorganisme(responses[0].data);
          setkordinats(responses[1].data);
          setloading(false);
          seterror(null);
        }),
      )
      .catch(err => {
        if (err.response) {
          seterror(false);
          seterror(err.message);
        } else if (error.request) {
          setloading(false);
          seterror(error.message);
        }
      });
  }, []);
  return {kordinats, error, loading, organisme};
}

export default GetPetas;
