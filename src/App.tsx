import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/theme-provider"
import Layout from "./components/Layout"
import WeatherDashboard from "./pages/weatherDashboard"
import CityPage from "./pages/cityPage"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

function App() {
 
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} >
      
    <BrowserRouter>
          <ThemeProvider>
              <Layout>
                  <Routes>
                      <Route  path="/" element={<WeatherDashboard />} />
                      <Route  path="/city/:cityName" element={<CityPage />} />
                  </Routes>
              </Layout>
          </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
