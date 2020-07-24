package retrofit;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface ApiInterface {
    @GET("onecall?lat=23.748895&lon=90.392101&%20exclude=hourly,daily&appid=92756c24107bc39dd0a7541f66ba55c5&units=metric")
    Call<Data> getWeatherData();
}
