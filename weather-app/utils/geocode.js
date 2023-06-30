import request from 'request'

export const getGeocode = (address, callback ) => {
    if(address == undefined || address.length === 0){
        callback('Invalid address', undefined)
        return
    }

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ ' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaG9zdGlua28iLCJhIjoiY2xqaGo0djU4MDRsZjNocDVyY3d2YjgwYyJ9.0sfUc35t3kyLaH5Y0K-1dw&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to Geocoding API', undefined)
            return
        }
        if(body.features.length === 0){
            callback('Unable find location', undefined)
            return
        }
        const data = {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        }            
        callback(undefined, data)
    }) 
}