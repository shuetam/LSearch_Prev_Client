/* import { updateStore } from '../updateStore';
import axios from 'axios';

const initialState = {
iconsID: []
};

const getIconsIDs = (state, action) => {

    let data = {
        UserId: action.userId
    }

    let icons = [];

    axios.post('http://localhost:5000/api/UserDesktop/geticonsid', data)
    .then((result) => {
       // debugger;
        icons = result.data;
    })
    .catch(error => {alert("Server error.")});



    return updateStore( state, { 
        iconsID: icons
     } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case ('USER_ICONS'): return getIconsIDs(state, action);
      
        default:
            return state;
    }
};





export default reducer; */