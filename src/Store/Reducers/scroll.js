/* const initialState = {
  
};
   
   
   const shuffleSongs = (state, action) => {
        debugger;
    if(localStorage.getItem('inMove')=='false') {
        
        var songs = document.getElementsByClassName("entity");
        var initialLocations = [];
        for (var i = 0; i < songs.length; i++) {
            //console.log(songs[i].style.top);
            songs[i].style.transition = 'top '+2+'s, left '+2+'s'
            initialLocations.push({ 'top': songs[i].style.top, 'left': songs[i].style.left });
        }
        
        for (var i = 1; i < songs.length; i++) {
            songs[i-1].style.top = initialLocations[i].top;
            songs[i-1].style.left = initialLocations[i].left;
        }
    }
    //console.log(initialLocations);
}






const reducer = ( state = initialState, action ) => {
    debugger;
    switch ( action.type ) {
        case ('SCROLL_MOUSE'): return shuffleSongs(state, action);
   
        default:
            return state;
    }
}; */