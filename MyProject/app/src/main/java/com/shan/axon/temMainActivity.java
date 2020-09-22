package com.shan.axon;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

public class temMainActivity {

/*
    private static final String TAG = "AXON SHAHEEN ";

    RecyclerView mRecylerView;
    FirebaseDatabase mFirebaseDatabase;
    DatabaseReference mRef;

    List<Person> personList =new ArrayList<Person>();

    //MyAdapter madapter  = new MyAdapter(this, personList);

    private RecyclerView.Adapter mAdapter;

    private Button buttonUpdate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        buildRecyleView();
        setDatabase();

        // addDummyData(1);
        // LoadDataFromDataBase();
        setButtonUpdate();
        insertDataThread();
    }


    void setButtonUpdate() {
        buttonUpdate = findViewById(R.id.update);
        buttonUpdate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = personList.size();
                insertItem(position);
            }
        });
    }

    public  void insertDataThread() {
        MainActivity.MyThread thread = new MainActivity.MyThread(personList);
        thread.start();
    }


    public void setDatabase() {
        // send query to database
        mFirebaseDatabase = FirebaseDatabase.getInstance();
        mRef = mFirebaseDatabase.getReference("data");
    }

    public void buildRecyleView() {
        // Recycler view
        mRecylerView = findViewById(R.id.recylerView);
        mRecylerView.setHasFixedSize(true);
        // set layout as LinerLayout
        mRecylerView.setLayoutManager( new LinearLayoutManager(this));
        mAdapter = new MyAdapter(this, personList);
        mRecylerView.setAdapter( mAdapter  );
    }

    public void insertItem(int position) {

        Person tem = new Person();

        tem.email =  "E."+position;
        tem.contactNo = "C."+position;
        tem.name = "N."+position;
        tem.profileImage = "https://firebasestorage.googleapis.com/v0/b/axonrcpc.appspot.com/o/profile7.jpg?alt=media&token=72e71df8-91ba-40b3-886c-4aa10e944d6b";;

        personList.add(tem);
        mAdapter.notifyItemInserted(position);
        mAdapter.notifyDataSetChanged();
    }



    @Override
    protected void onStart() {
        super.onStart();

    }

    private void LoadDataFromDataBase() {

        mRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                int sz = personList.size();

                for(DataSnapshot personSnapshort: dataSnapshot.getChildren()) {
                    Person person = personSnapshort.getValue(Person.class);

                    Log.d(TAG, "onDataChange: " + person.name);
                    Log.d(TAG, "onDataChange: " + person.email);
                    Log.d(TAG, "onDataChange: " + person.contactNo);
                    Log.d(TAG, "onDataChange: " + person.profileImage);

                    personList.add(person);
                    // madapter.notifyItemChanged(sz);
                    sz++;
                    Log.d(TAG, "onDataChange: added value");
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    private void addDummyData(int number) {

        for(int i=0;i<number;i++) {
            Person tem = new Person();
            tem.email =  "E."+i;
            tem.contactNo = "C."+i;
            tem.name = "N."+i;
            tem.profileImage = "https://firebasestorage.googleapis.com/v0/b/axonrcpc.appspot.com/o/profile7.jpg?alt=media&token=72e71df8-91ba-40b3-886c-4aa10e944d6b";
            personList.add(tem);
        }
    }


    private  void Load_firbase_database_FireBaseAdapter() {
//        FirebaseRecyclerAdapter<Person, ViewHolderRV> firebaseRecyclerAdapter =
//                new FirebaseRecyclerAdapter<Person, ViewHolderRV>(
//                        Person.class,
//                        R.layout.row_person,
//                        ViewHolderRV.class,
//                        mRef
//                ) {
//                    @Override
//                    protected void populateViewHolder(ViewHolderRV viewHolder, Person model, int position) {
//
//                        viewHolder.setData(getApplicationContext(), model.getName(), model.getEmail(), model.getContactNo(), model.getImage());
//                    }
//                };
//
//        mRecylerView.setAdapter(firebaseRecyclerAdapter);
    }

    class MyThread extends Thread {

        List<Person> personList;
        MyThread(List<Person> personList) {
            this.personList = personList;
        }

        @Override
        public void run() {

            mRef.addValueEventListener(new ValueEventListener() {
                @Override
                public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                    for(DataSnapshot personSnapshort: dataSnapshot.getChildren()) {
                        Person person = personSnapshort.getValue(Person.class);
                        int i = personList.size();
                        personList.add(person);
                        mAdapter.notifyItemChanged(i);
                        mAdapter.notifyDataSetChanged();
                        Log.d(TAG, "onDataChange: aaa" + i);
                        Log.d(TAG, "onDataChange: " + person.name);
                        Log.d(TAG, "onDataChange: " + person.email);
                        Log.d(TAG, "onDataChange: " + person.contactNo);
                        Log.d(TAG, "onDataChange: " + person.profileImage);

                    }
                }

                @Override
                public void onCancelled(@NonNull DatabaseError databaseError) {

                }
            });
        }
    }*/
}
