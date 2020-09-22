package com.example.timepickwear;

import android.app.TimePickerDialog;
import android.widget.TextView;
import android.widget.TimePicker;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;

public class PickHelper extends AppCompatActivity implements TimePickerDialog.OnTimeSetListener {

//    public void getInstance() {
//        return this;
//    }

    public  void open() {
        DialogFragment timePicker = new TimePickerFragment();
        timePicker.show(getSupportFragmentManager(), "time picker");
    }

    @Override
    public void onTimeSet(TimePicker timePicker, int hourOfDay, int minute) {
        TextView textView = (TextView) findViewById(R.id.textView);
        textView.setText("Hour: " + hourOfDay + " Minute: " + minute);
    }
}
