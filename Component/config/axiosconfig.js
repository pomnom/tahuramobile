import axios from 'axios';

const ORGANISME_BASE_URL = 'https://organisme-service.herokuapp.com/organisme';
const PETA_BASE_URL = 'https://petaservice.herokuapp.com/peta/organisme';

class axiosconfig {
  getAllData() {
    return axios.get(ORGANISME_BASE_URL);
  }

  getAllPeta(id) {
    return axios.get(PETA_BASE_URL + '/' + id);
  }
  getPetaById(id) {
    return axios.get('https://petaservice.herokuapp.com/peta/' + id);
  }
  updatePeta(data, petaId) {
    return axios.patch(
      'https://petaservice.herokuapp.com/peta/' + petaId,
      data,
    );
  }
  getDataById(dataId) {
    return axios.get(ORGANISME_BASE_URL + '/' + dataId);
  }
  getOrganismeByLimit(limit) {
    return axios.get(ORGANISME_BASE_URL + '/' + limit);
  }
}

export default new axiosconfig();
