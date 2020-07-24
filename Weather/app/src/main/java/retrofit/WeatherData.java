package retrofit;

import com.google.gson.annotations.SerializedName;


public class WeatherData {

    @SerializedName("main")
    String main;

    @SerializedName("description")
    String description;

    public String getMain() {
        return main;
    }

    public void setMain(String main) {
        this.main = main;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

