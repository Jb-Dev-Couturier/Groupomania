import * as AuthApi from '../api/AuthRequests';
import { accountServices } from '../_services/account.services';

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const { data } = await AuthApi.logIn(formData);
    if (data.userBanished === false) {
      dispatch({ type: 'AUTH_SUCCESS', data: data });
      navigate(`${!data.userAdmin ? '/../home' : '/../dashboard'}`, {
        replace: true,
      });
      if (data.userAdmin) {
        accountServices.saveUserAdmin(data.userAdmin);
      }
    } else {
      alert('Vous avez été Bannie du Serveur Contacter Administrateur');
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAIL' });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: 'AUTH_SUCCESS', data: data });
    navigate('/../home', { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAIL' });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: 'LOG_OUT' });
};
