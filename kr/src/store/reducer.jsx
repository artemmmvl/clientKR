import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';


const slice=createSlice({
        name: 'login',
        initialState:{
            token:Cookies.get('token'),
            exp:Cookies.get('exp')
        },
        reducers:{
            setToken(state, action){
                Cookies.set('token',action.payload.token)
                Cookies.set('exp', jwtDecode(action.payload.token).exp)
                state.token=action.payload.token
                return state;
            },
            deleteToken(state, action){
                Cookies.remove('token')
                Cookies.remove('exp')
                state.token=null
                state.exp=null

                return state;
            }
        }
    }
)

export const dispatches = slice.actions;

export default slice.reducer;