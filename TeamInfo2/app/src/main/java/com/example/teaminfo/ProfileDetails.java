package com.example.teaminfo;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.squareup.picasso.Picasso;

import org.jetbrains.annotations.Nullable;

public class ProfileDetails extends AppCompatActivity {

    private static final String TAG = "ProfileDetails";
    String mPhone  = "000";
    String mFacebook  = "https://www.facebook.com/bappy.cse";
    String mEmail  = "littlemaster.jucse@gmail.com";

    Button callOnPhone;
    Button facebook;
    Button email;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: Started...");
        setContentView(R.layout.profile_detail);
        getIncomingIntent();

        setCallButton();
        setFacebookButton();
        setEmailButton();
    }


    void setCallButton() {
        callOnPhone = (Button) findViewById(R.id.r_button_phone);
        callOnPhone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse("tel:"+mPhone));
                startActivity(intent);
            }
        });
    }

    void setFacebookButton() {
        facebook = (Button) findViewById(R.id.r_det_facebbok);
        facebook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent facebookIntent = openFacebook(ProfileDetails.this);
                startActivity(facebookIntent);
            }
        });
    }

    void setEmailButton() {

        email = findViewById(R.id.r_det_email);
        email.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("text/plain");
                String[] recipients = {mEmail};
                intent.putExtra(Intent.EXTRA_EMAIL, recipients);
                intent.putExtra(Intent.EXTRA_SUBJECT, "");
                intent.putExtra(Intent.EXTRA_TEXT, "");

                intent.setType("message/rfc822");

                startActivity(Intent.createChooser(intent, "Choose an Email Client"));
            }
        });
    }


    public Intent openFacebook(Context context) {

        try {
            context.getPackageManager().getPackageInfo("com.facebook.katana", 0);
            return new Intent(Intent.ACTION_VIEW, Uri.parse(mFacebook));
        } catch (Exception e){
            return new Intent(Intent.ACTION_VIEW, Uri.parse(mFacebook));
        }
    }

    private void getIncomingIntent() {
        Log.d(TAG, "getIncomingIntent: checking for incoming intents");

        if ( getIntent().hasExtra("position") ) {
            Log.d(TAG, "getIncomingIntent: found intent extras");

            String position = getIntent().getStringExtra("position");
            int pos = Integer.parseInt(position);

            Profile profile = MainActivity.profileList.get(pos);
            setDetails(profile.getName(), profile.getNickname(), profile.getImageurl());

            mPhone = profile.getPhone();
            mFacebook = profile.getFacebook();
            mEmail = profile.getEmail();
        }
    }

    private void setDetails(String name, String nickname, String imageurl) {

        Log.d(TAG, "setImage: setting image");

        TextView nameView = findViewById(R.id.r_det_fullname);
        TextView nicknameView = findViewById(R.id.r_det_nickname);
        ImageView imageView = findViewById(R.id.r_det_profileImage);

        nameView.setText(name);
        nicknameView.setText(nickname);
        Picasso.get().load(imageurl).into(imageView);
    }
}
