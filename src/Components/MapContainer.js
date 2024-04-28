import {React, Component} from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const MapContainer = (props) => {
    return(
  
        <Map
          google={props.google}
          zoom={17}
          initialCenter={{ lat: props.lat, lng: props.lng }}
        >
            <Marker
                position={{ lat: props.lat, lng: props.lng }} // Coordenadas do marcador
            />
        </Map>
        
  
    );
    
};

  export default GoogleApiWrapper(
    (props) => ({
      apiKey: 'AIzaSyBPjQv5lXUBQ7kC__ggw6WXQpwtfLE0We8',
    }
  ))(MapContainer)
