package retrofit;

public interface ApiInterface {
    @GET("weather?appid=92756c24107bc39dd0a7541f66ba55c5&units=metric")
    Call<Example> getWeatherData(@Query("q") String name);
}
