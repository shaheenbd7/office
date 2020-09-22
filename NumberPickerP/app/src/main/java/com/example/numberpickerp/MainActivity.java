package com.example.numberpickerp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.NumberPicker;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    TextView textView;
    NumberPicker picker,picker2;

    int hh = 0;
    int mm = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView = (TextView) findViewById(R.id.textView);

        picker = (NumberPicker) findViewById(R.id.picker);
        picker2 = (NumberPicker) findViewById(R.id.picker_two);

        picker.setMinValue(0);
        picker.setMaxValue(12);

        picker2.setMinValue(0);
        picker2.setMaxValue(60);



        picker.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            @Override
            public void onValueChange(NumberPicker numberPicker, int oldValue, int newValue) {
                int tot = newValue*60+mm;
                hh = newValue;
                textView.setText(""+tot+" min");
            }
        });

        picker2.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            @Override
            public void onValueChange(NumberPicker numberPicker, int oldValue, int newValue) {
                int tot = hh*60+newValue;
                mm = newValue;
                textView.setText(""+tot+" min");
            }
        });

    }
}