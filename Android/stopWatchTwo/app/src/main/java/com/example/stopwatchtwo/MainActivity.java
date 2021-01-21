package com.example.stopwatchtwo;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import hallianinc.opensource.timecounter.StopWatch;

public class MainActivity extends AppCompatActivity {

    Button start,pause,reset;
    TextView mTextView;
    StopWatch stopwatch;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        start = (Button)findViewById(R.id.start_button);
        pause = (Button)findViewById(R.id.puase_button);
        reset = (Button)findViewById(R.id.reset_button);
        mTextView = (TextView)findViewById(R.id.time_TV);

        stopwatch = new StopWatch(mTextView);

        start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                stopwatch.start();
            }
        });

        pause.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                stopwatch.pause();
            }
        });

        reset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                stopwatch.stop();
            }
        });

    }
}