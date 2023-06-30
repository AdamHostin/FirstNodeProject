import request from 'request'

export const getGeocode = (address, callback ) => {
    const GeocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ ' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaG9zdGlua28iLCJhIjoiY2xqaGo0djU4MDRsZjNocDVyY3d2YjgwYyJ9.0sfUc35t3kyLaH5Y0K-1dw&limit=1'
    request({url: GeocodingUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to Geocoding API', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable find location', undefined)
        }else{
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }            
            callback(undefined, data)
        }
    }) 
}