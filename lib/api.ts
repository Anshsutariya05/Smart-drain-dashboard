export interface IoTDataResponse {
  count: number;
  latest: {
    distance: number;
    motor: "ON" | "OFF";
    ts: number;
  };
}

export interface SensorReading {
  distance: number;
  motor: "ON" | "OFF";
  ts: number;
}

export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
}

export async function fetchSensorData(): Promise<SensorReading | null> {
  try {
    const response = await fetch("http://localhost:8000/data");
    if (response.ok) {
      const data: IoTDataResponse = await response.json();
      // Return the latest reading from the response
      return data.latest;
    }
  } catch (error) {
    console.log("[v0] Failed to fetch sensor data:", error);
  }
  return null;
}

export async function fetchWeatherData(
  city: string
): Promise<WeatherData | null> {
  try {
    // Using OpenWeatherMap API (you'll need to add your API key)
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    console.log(API_KEY, "api-key");

    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}&aqi=yes`
    );
    console.log(response, "res");

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return {
        city: data.location.name,
        temperature: Math.round(data.current.temp_c),
        humidity: data.current.humidity,
        // description: data.weather[0].description,
        // icon: data.weather[0].icon,
      };
    }
  } catch (error) {
    console.log("[v0] Failed to fetch weather data:", error);
  }
  return null;
}

export async function fetchIoTData(): Promise<IoTDataResponse | null> {
  try {
    const response = await fetch("http://localhost:8000/data");
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log("[v0] Failed to fetch IoT data:", error);
  }
  return null;
}
