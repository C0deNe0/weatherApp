import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useForecasteQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"


const WeatherDashboard = () => {

  const { coordinates, error:locationError, getLocation, isLoading: locationLoading } = useGeolocation();

const weatherQuery = useWeatherQuery(coordinates);
const forecastQuery = useForecasteQuery(coordinates);
const locationQuery = useReverseGeocodeQuery(coordinates);



  const handleRefresh = ()=>{
    getLocation()
    if(coordinates){
      //reload weather data
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    };
  }
if (locationLoading){
  return  <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}


if (!coordinates){
  return  <Alert variant="destructive">
     
      <AlertTitle>Location Requeired</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>PLease Enable Loaction access to see your local weather</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}


const locationName = locationQuery.data?.[0];

if (weatherQuery.error || forecastQuery.error) {
  return <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle> Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data. please try again.</p>
        <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
          <RefreshCw className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}

if (!weatherQuery.data || !forecastQuery.data){
  return <WeatherSkeleton />
}

  return (
    <div className="space-y-4">

      //fav cites
      <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button variant={"outline"} size={"icon"} onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching}> <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin":""}`} />  </Button>
        </div>  

      //current and hourly hourly
    </div>
  )
}

export default WeatherDashboard;
