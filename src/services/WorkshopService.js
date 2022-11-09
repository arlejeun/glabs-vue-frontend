export default class CountryService {
  getCountries() {
    return fetch('demo/data/workshops.json').then(res => res.json()).then(d => d.data)
  }
}
