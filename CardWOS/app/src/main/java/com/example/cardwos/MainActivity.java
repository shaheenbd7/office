package com.example.cardwos;

import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.support.wearable.activity.WearableActivity;
import android.support.wearable.view.CardFragment;
import android.widget.TextView;

public class MainActivity extends WearableActivity {

    private TextView mTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.customlayout);

        // Enables Always-on
        setAmbientEnabled();

        FragmentManager fragmentManager = getFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        CardFragment cardFragment = CardFragment.create(getString(R.string.title), getString(R.string.description), R.mipmap.ic_launcher);
    }
}
        