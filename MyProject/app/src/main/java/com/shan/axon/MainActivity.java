package com.shan.axon;

import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    RecyclerView mRecylerView;
    FirebaseDatabase mFirebaseDatabase;
    DatabaseReference mRef;
    public static ArrayList<Profile> profileList =new ArrayList<Profile>();
    private RecyclerView.Adapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        buildRecyleView();
        setDatabase();
        fetchDataUsingThread();
    }

    @Override
    protected void onStart() {
        super.onStart();

    }

    public void buildRecyleView() {
        // Recycler view
        mRecylerView = findViewById(R.id.recylerView);
        mRecylerView.setHasFixedSize(true);
        // set layout as LinerLayout
        mRecylerView.setLayoutManager( new LinearLayoutManager(this));
        mAdapter = new ProfileViewAdapter(this, profileList);
        mRecylerView.setAdapter( mAdapter  );
    }


    public void setDatabase() {
        // send query to database
        mFirebaseDatabase = FirebaseDatabase.getInstance();
        mRef = mFirebaseDatabase.getReference("profile");
    }

    public  void fetchDataUsingThread() {
        MainActivity.MyThread thread = new MainActivity.MyThread();
        thread.start();
    }

    class MyThread extends Thread {

        public MyThread() {
        }

        @Override
        public void run() {

            mRef.addValueEventListener(new ValueEventListener() {
                @Override
                public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                    for(DataSnapshot profileSnapShort: dataSnapshot.getChildren()) {
                        Profile profile = profileSnapShort.getValue(Profile.class);

                        boolean flag = false;
                        for(int i=0;i<profileList.size();i++) {
                            if( profile.getUserid() == profileList.get(i).getUserid() ) {
                                profileList.set(i, profile);
                                mAdapter.notifyItemChanged(i);
                                mAdapter.notifyDataSetChanged();
                                flag = true;
                                break;
                            }
                        }

                        if( !flag ) {
                            profileList.add(profile);
                            mAdapter.notifyItemChanged(profileList.size()-1);
                            mAdapter.notifyDataSetChanged();
                        }

                        Log.d(TAG, "Profile: " );
                    }
                }

                @Override
                public void onCancelled(@NonNull DatabaseError databaseError) {

                }
            });

        }
    }

}
