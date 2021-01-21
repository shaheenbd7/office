package com.example.cicularprogressbartest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.os.SystemClock;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;
import android.widget.ProgressBar;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    ProgressBar progress_bar;
    Button button_incr, button_decr;
    TextView text_view_progress,timer;
    private int progr = 0;

    Chronometer chronometer;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progress_bar = (ProgressBar) findViewById(R.id.progress_bar);
        button_incr = (Button) findViewById(R.id.button_incr);
        button_decr = (Button) findViewById(R.id.button_decr);
        text_view_progress = (TextView) findViewById(R.id.text_view_progress);

        updateProgressBar();

        chronometer = new Chronometer(this);
        chronometer.setBase(SystemClock.elapsedRealtime());
        chronometer.start();

        timer = (TextView) findViewById(R.id.timer);

        button_incr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (progr <= 90) {
                    progr += 10;
                    updateProgressBar();
                }
                chronometer.setBase(SystemClock.elapsedRealtime());
                chronometer.start();
            }

        });

        button_decr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (progr >= 10) {
                    progr -= 10;
                    updateProgressBar();
                }
                chronometer.stop();
            }
        });

        String tm = (String) chronometer.getText();
        timer.setText(tm);

        chronometer.setOnChronometerTickListener(new Chronometer.OnChronometerTickListener() {
            @Override
            public void onChronometerTick(Chronometer chronometer) {
                String tm = (String) chronometer.getText();
                timer.setText(tm);

//                if ((SystemClock.elapsedRealtime() - chronometer.getBase()) >= 10000) {
//                    chronometer.setBase(SystemClock.elapsedRealtime());
//                }

            }
        });

    }

    private void updateProgressBar() {
        progress_bar.setProgress(progr);
        text_view_progress.setText("" + progr + "%");
    }
}