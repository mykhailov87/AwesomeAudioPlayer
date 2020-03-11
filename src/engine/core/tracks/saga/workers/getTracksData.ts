// Core
import { AxiosResponse } from 'axios';
import { apply, put } from 'redux-saga/effects';

// Engine
import Api from '../../../../services/api';
import { actions } from '../../actions';

// Interfaces
import { ITracksResponseData } from '../../interfaces';

export function* callGetTracksDataWorker() {
  let response;

  try {
    yield put(actions.setIsTracksDataLoading(true));
    response = yield apply(Api, Api.getTracksData, []) as AxiosResponse<ITracksResponseData>;
  } catch (err) {
    console.log(err);
  }

  if (response?.data && response.status >= 200 && response.status < 400) {
    const responseData: ITracksResponseData = response.data;
    yield put(actions.setTracksData(responseData.data));
  }

  yield put(actions.setIsTracksDataLoading(false));
}