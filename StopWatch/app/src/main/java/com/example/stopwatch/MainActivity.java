package com.example.stopwatch;

import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.SystemClock;
import android.support.wearable.activity.WearableActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Chronometer;
import android.widget.TextView;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;

import hallianinc.opensource.timecounter.StopWatch;

public class MainActivity extends WearableActivity {

    private int btnState = 1;
    Button cmd,reset;
    Gori stopwatch;
    TextView mTextView;

    LottieAnimationView mAnimationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Enables Always-on
        setAmbientEnabled();

        mTextView = (TextView)findViewById(R.id.time_TV);
        stopwatch = new Gori(mTextView);

        mAnimationView = (LottieAnimationView) findViewById(R.id.animationView);
        mAnimationView.setVisibility(View.GONE);

        btnState = 0;
        cmd = (Button) findViewById(R.id.cmd_button);
        reset = (Button) findViewById(R.id.reset_button);
        //cmd.setBackgroundColor(Color.GREEN);
        //cmd.setBackgroundColor(Color.DKGRAY);

        //cmd.setTextAppearance();

        //stopwatch.

        cmd.setBackgroundResource(R.drawable.play_arrow);
        cmd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(btnState==0) {
                    stopwatch.start();
                    btnState=1;
                    //cmd.setText("p");
                    //cmd.setBackgroundColor(Color.BLUE);
                    cmd.setBackgroundResource(R.drawable.pause_circle);
                    mAnimationView.setVisibility(View.VISIBLE);
                    mAnimationView.playAnimation();
                } else if(btnState==1) {
                    stopwatch.pause();
                    btnState=2;
                    //cmd.setText("r");
                    //cmd.setBackgroundColor(Color.CYAN);
                    cmd.setBackgroundResource(R.drawable.play_arrow);
                    mAnimationView.pauseAnimation();
                } else if(btnState==2) {
                    stopwatch.resume();
                    btnState=1;
                    //cmd.setText("p");
                    //cmd.setBackgroundColor(Color.BLUE);
                    cmd.setBackgroundResource(R.drawable.pause_circle);
                    mAnimationView.resumeAnimation();
                }
            }
        });

        reset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                btnState = 0;
                stopwatch.stop();
                //cmd.setText("s");
                //cmd.setBackgroundColor(Color.DKGRAY);
                mAnimationView.cancelAnimation();
                mAnimationView.setVisibility(View.GONE);
                cmd.setBackgroundResource(R.drawable.play_arrow);
            }
        });

        //stopwatch.notify();
    }

}
