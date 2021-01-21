package retrofit;

import com.google.gson.annotations.SerializedName;

public class Today {
    @SerializedName("temp")
    String temp;

    @SerializedName("wind_speed")
    String windSpeed;

    @SerializedName("weather")
    private WeatherData []weatherData;

    public String getTemp() {
        return temp;
    }

    public void setTemp(String temp) {
        this.temp = temp;
    }

    public String getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(String windSpeed) {
        this.windSpeed = windSpeed;
    }

    public WeatherData[] getWeatherData() {
        return weatherData;
    }

    public void setWeatherData(WeatherData[] weatherData) {
        this.weatherData = weatherData;
    }
}
