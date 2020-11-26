package com.example.vagavagi;

import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;

import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.viewpager.widget.ViewPager;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.tabs.TabLayout;
import com.google.firebase.messaging.FirebaseMessaging;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity implements RecordDialog.AddRecordDialogListener{

    private static final String TAG = "shan";

    private Toolbar toolbar;
    private ViewPager viewPager;
    private TabLayout tabLayout;

    private PeopleFragment peopleFragment;
    private GroupsFragment groupsFragment;
    private RecordsFragment recordsFragment;

    FloatingActionButton fbuttonAdd;

    private DrawerLayout drawer;

    private RequestQueue mRequestQue;
    private String URL = "https://fcm.googleapis.com/fcm/send";
    private String serverKey = "AAAADEeuAs4:APA91bHAcpf02edEXlQPGzcct2QyBxQp94Zv69SYOOfzpgFdbA81nBqqOMSrax_s34qEYUY_Y-70IDoqwrquFpMmNn7okyFhmceaJ6vbhdJK4FgADExlkbr8o5dy4zZT1eerRaGMnpem";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        toolbar = findViewById(R.id.toolbar);
//        setSupportActionBar(toolbar);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        viewPager = findViewById(R.id.view_pager);
        tabLayout = findViewById(R.id.tab_layout);

        peopleFragment = new PeopleFragment();
        groupsFragment = new GroupsFragment();
        recordsFragment = new RecordsFragment();

        tabLayout.setupWithViewPager(viewPager);

        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(getSupportFragmentManager(), 0);
        viewPagerAdapter.addFragment(peopleFragment,"People");
        viewPagerAdapter.addFragment(groupsFragment,"Groups");
        viewPagerAdapter.addFragment(recordsFragment,"Records");
        viewPager.setAdapter(viewPagerAdapter);

        mRequestQue = Volley.newRequestQueue(this);
        FirebaseMessaging.getInstance().subscribeToTopic("news");

        fbuttonAdd = findViewById(R.id.button_add);
        fbuttonAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getApplicationContext(), "Hello", Toast.LENGTH_SHORT).show();
                addRecord();
            }
        });

        drawer = findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawer, toolbar,
                R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();


    }

    public void addRecord() {
        RecordDialog record = new RecordDialog();
        record.show(getSupportFragmentManager(), "Example");
    }

    private void sendNotification() {

        Log.d(TAG, "sendNotification: ");

        JSONObject json = new JSONObject();
        try {
            //json.put()
            json.put("to","/topics/"+"news");
            JSONObject notificationObj = new JSONObject();
            notificationObj.put("title","any title");
            notificationObj.put("body","any body");

//            JSONObject extraData = new JSONObject();
//            extraData.put("brandId","puma");
//            extraData.put("category","Shoes");

            json.put("notification",notificationObj);
//            json.put("data",extraData);
            Log.d(TAG, "sendNotification: " + " Hello ");

            JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, URL,
                    json,
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            // Successfully updated
                            Log.d(TAG, "onResponse: ");
                        }
                    }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    // failure on upload data
                    Log.d(TAG, "onError: "+error.networkResponse);
                }
            }
            ){
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String,String> header = new HashMap<>();
                    header.put("content-type","application/json");
                    header.put("authorization","key="+serverKey);
                    return header;
                }
            };
            mRequestQue.add(request);
        }
        catch (JSONException e)
        {
            e.printStackTrace();
        }
    }


    @Override
    public void applyTexts(String description, String amount) {
        Toast.makeText(getApplicationContext(), "Hello " + description + " :: " + amount, Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.upmenu, menu);
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.item1:
                Toast.makeText(this, "Item 1 selected", Toast.LENGTH_SHORT).show();
                return true;
            case R.id.item2:
                Toast.makeText(this, "Item 2 selected", Toast.LENGTH_SHORT).show();
                return true;
            case R.id.item3:
                Toast.makeText(this, "Item 3 selected", Toast.LENGTH_SHORT).show();
                sendNotification();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}