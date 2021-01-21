package com.example.stopwatch;

import android.os.Handler;
import android.widget.TextView;

public class Gori {
    TextView textView;
    Handler handler = new Handler();
    boolean isRunning;// to keep track of the state of handler to avoid creating multiple threads.
    private int time = 0;

    public Gori(TextView textView){// this textview would be updated by the stop-watch
        this.textView = textView;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    private String convertTimeToText(int time){
        int ms1 = time%100;
        ms1 = (ms1/10);
        String timeString = time/6000+":"+(time/100)%60+":"+ (ms1==0?"0":ms1) +(time%100)%10;
        return timeString;
    }
    public void start(){

        if(!isRunning) {
            time = 0;
            startTime();

        }
    }
    public void stop(){
        time = 0;
        textView.setText("0:00:00");
        handler.removeCallbacksAndMessages(null);
        isRunning = false;
    }
    public void pause(){
        handler.removeCallbacksAndMessages(null);
        isRunning = false;
    }
    public void resume(){
        startTime();
        isRunning = true;
    }

    private void startTime(){
        if(!isRunning) {
            isRunning = true;
            handler.post(new Runnable() {
                @Override
                public void run() {
                    time += 1;
                    textView.setText(convertTimeToText(time));
                    handler.postDelayed(this, 0);
                }
            });
        }
    }
}
