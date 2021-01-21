package retrofit;

import com.google.gson.annotations.SerializedName;



public class Daily {

    public class Temp {
        @SerializedName("min")
        String min;

        @SerializedName("max")
        String max;

        public String getMin() {
            return min;
        }

        public void setMin(String min) {
            this.min = min;
        }

        public String getMax() {
            return max;
        }

        public void setMax(String max) {
            this.max = max;
        }
    }

    @SerializedName("temp")
    private Temp temp;

    @SerializedName("weather")
    private WeatherData[] weather;

    @SerializedName("rain")
    String rain;

    @SerializedName("wind_speed")
    String wind_speed;

    @SerializedName("dt")
    String timeStamp;

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public Temp getTemp() {
        return temp;
    }

    public void setTemp(Temp temp) {
        this.temp = temp;
    }

    public WeatherData[] getWeather() {
        return weather;
    }

    public void setWeather(WeatherData[] weather) {
        this.weather = weather;
    }

    public String getRain() {
        return rain;
    }

    public void setRain(String rain) {
        this.rain = rain;
    }

    public String getWind_speed() {
        return wind_speed;
    }

    public void setWind_speed(String wind_speed) {
        this.wind_speed = wind_speed;
    }
}
