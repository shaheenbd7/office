package retrofit;

import com.google.gson.annotations.SerializedName;

public class Data {

    @SerializedName("current")
    private Today todayData;

    @SerializedName("daily")
    private Daily[] dailyData;

    public Today getTodayData() {
        return todayData;
    }

    public void setTodayData(Today todayData) {
        this.todayData = todayData;
    }

    public Daily[] getDailyData() {
        return dailyData;
    }

    public void setDailyData(Daily[] dailyData) {
        this.dailyData = dailyData;
    }

//    @SerializedName("weather")
//    private WeatherData []weatherData;
//
//    public WeatherData[] getWeatherData() {
//        return weatherData;
//    }
//
//    public void setWeatherData(WeatherData[] weatherData) {
//        this.weatherData = weatherData;
//    }


//    @SerializedName("main")
//    private Main main;
//
//    public Main getMain() {
//        return main;
//    }
//
//    public void setMain(Main main) {
//        this.main = main;
//    }
}
