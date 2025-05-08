
//this is a config file containing all the necesary urls and details required toconnect to through API

export const API_CONFIG = {
    BASE_URL : "https://api.openweathermap.org/data/2.5",    //this is for weather data
    GEO:"http://api.openweathermap.org/geo/1.0",             //this is for country location data       
    API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,       //genreated API key in ENV
    DEFAULT_PARAMS : {
        units:"metric",                                         //unit of the data
        appid:import.meta.env.VITE_OPENWEATHER_API_KEY,         //API key
    }
}