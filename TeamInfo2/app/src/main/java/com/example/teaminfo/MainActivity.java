package com.example.teaminfo;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    RecyclerView mRecylerView;
    FirebaseDatabase mFirebaseDatabase;
    DatabaseReference mRef;
    public static ArrayList<Profile> profileList =new ArrayList<Profile>();
    private RecyclerView.Adapter mAdapter;
    //private RecyclerView.Adapter mAdapter;

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