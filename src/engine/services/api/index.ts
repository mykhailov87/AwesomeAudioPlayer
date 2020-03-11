// Core
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Interfaces
import { ITracksResponseData } from '../../core/tracks/interfaces';

class Api {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: 'https://iawake-backend-devel.dokku.f17y.com/api/v1',
    });
  }

  static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  public getTracksData(): Promise<AxiosResponse<ITracksResponseData>> {
    return this.http.get('programs/free');
  }
}

export default Api.getInstance();
