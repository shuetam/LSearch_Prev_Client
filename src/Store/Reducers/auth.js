import { updateStore } from '../updateStore';
import { connect } from 'react-redux';
import {getIconsID} from '../Actions/icons'
import axios from 'axios';

const initialState = {
    token: null,
    userId: null,
    error: null,
    showPopup: false,
    showServerPopup: false,
    dataToSend: null,
    entityToChange: null,
    serverMessage: "",
    addingIcon: null,
    removingIconId: null,


};



const removingIcon = (state, action) => {
    return updateStore( state, { 
        removingIconId: action.id,
     } ); 
}

const iconAdding = (state, action) => {
    // debugger;
     return updateStore( state, { 
        addingIcon: action.data,
     } ); 
 };

 const stopIconAdding = (state, action) => {
    // debugger;
     return updateStore( state, { 
        addingIcon: null,
     } ); 
 };

 

 const stopRemoving = (state, action) => {
    // debugger;
     return updateStore( state, { 
        removingIconId: null,
     } ); 
 };


const managePopup = (state, action) => {
   // debugger;
    return updateStore( state, { 
        showPopup: true,
        dataToSend: action.data,
        entityToChange: action.entity,

    } ); 
};

const showServerPopup = (state, action) => {
     debugger;
     return updateStore( state, { 
         showServerPopup: true,
         serverMessage: action.message
     }); 
 };

const hideServerPopup = (state, action) => {
    // debugger;
     return updateStore( state, { 
         showServerPopup: false
     } ); 
 };

const hidePopup = (state, action) => {
   // debugger;
    return updateStore( state, { 
        showPopup: false
    } ); 
};


const authLogin = (state, action) => {
    //this.props.GetUserIconsID(action.userId);
    return updateStore( state, { 
        //token: action.token,
        userId: action.userId,
        userName: action.userName,
        imageUrl: action.imageUrl,
        error: null,
    } );      
    //debugger;
};

const authFacebook = (state, action) => {
    return updateStore( state, { 
        token: action.idToken,
        userId: action.facebookId, 
        error: null,
     } );
};

const authError = (state, action) => {
    return updateStore( state, {
        error: action.error,
    });
};

const authLogout = (state, action) => {
    return updateStore(state, { token: null, userId: null });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ('AUTH_LOGIN'): return authLogin(state, action);
        //case ('AUTH_FACEBOOK'): return authFacebook(state, action);
        case ('AUTH_LOGOUT'): return authLogout(state, action);
        case ('AUTH_ERROR'): return authError(state, action);
        case ('POPUP'): return managePopup(state, action);
        case ('FOR_SURE'): return hidePopup(state, action);
        case ('SERVER_POPUP'): return hideServerPopup(state, action);
        case ('SHOW_SERVER_POPUP'): return showServerPopup(state, action);
        case ('ADDING'): return iconAdding(state, action);
        case ('STOP_ADDING'): return stopIconAdding(state, action);
        case ('REMOVING'): return removingIcon(state, action);
        case ('STOP_REMOVING'): return stopRemoving(state, action);
     
        
        
        default:
            return state;
    }
};

//export default connect( null, mapDispatchToProps )(reducer);

export default reducer;