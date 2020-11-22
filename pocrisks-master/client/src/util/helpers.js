export const markerHelper = (type) => {
    switch(type){
        case 1: return "marker-green";
        case 2: return "marker-blue"; 
        case 3: return "marker-orange"; 
        default: return "marker-red"; 
    }
}