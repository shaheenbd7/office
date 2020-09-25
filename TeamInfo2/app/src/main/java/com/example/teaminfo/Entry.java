package com.example.teaminfo;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

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

public class Entry extends AppCompatActivity {

    private static final String TAG = "Entry";

    public static final int GOOGLE_SIGN = 123;
    Button btnLogin, btnLogout;
    //TextView status;

    FirebaseAuth mauth;
    GoogleSignInClient mGoogleSignInClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.entry_page);

        btnLogin = (Button) findViewById(R.id.login_btn);
        btnLogout = (Button) findViewById(R.id.logout_btn);
        //status = (TextView) findViewById(R.id.status);

        btnLogout.setVisibility(View.INVISIBLE);

        mauth = FirebaseAuth.getInstance();
        GoogleSignInOptions googleSignInOptions = new GoogleSignInOptions
                .Builder()
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(this, googleSignInOptions);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                signInGoogle();
            }
        });

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                logout();
            }
        });

        if(mauth != null) {
            FirebaseUser user = mauth.getCurrentUser();
            update(user);
        }

    }

    void signInGoogle() {
       // status.setText("Logging.....");
        Intent signIntent  = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signIntent, GOOGLE_SIGN);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode == GOOGLE_SIGN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);

            try {
                GoogleSignInAccount account  = task.getResult(ApiException.class);
                if(account != null) {
                    firebaseAuthWithGoogle(account);
                }
            } catch (ApiException e) {
                e.printStackTrace();
            }
        }
    }

    private void  firebaseAuthWithGoogle(GoogleSignInAccount account){
        Log.d(TAG, "firebaseAuthWithGoogle: " + account.getId());
        AuthCredential credential = GoogleAuthProvider.getCredential(account.getIdToken(), null);
        mauth.signInWithCredential(credential).addOnCompleteListener(this, task -> {
            if(task.isSuccessful()) {

                btnLogout.setVisibility(View.VISIBLE);
                FirebaseUser user = mauth.getCurrentUser();
               // status.setText("Logged In , wow");
                update(user);
//                btnLogout.setVisibility(View.VISIBLE);
//                btnLogin.setVisibility(View.GONE);;
            } else {
                //status.setText("Dhur ");

            }
        });
    }

    void update(FirebaseUser user) {
        if(user != null) {
            String name = user.getDisplayName();
            String email = user.getEmail();
            status.setText(name+"\n"+email+"\n");
            btnLogout.setVisibility(View.VISIBLE);
            btnLogin.setVisibility(View.GONE);

            Intent intent = new Intent(Entry.this, MainActivity.class);
            startActivity(intent);
            finish();

        } else {
            status.setText("Logged OUT !!!!");
            btnLogout.setVisibility(View.GONE);
            btnLogin.setVisibility(View.VISIBLE);
        }
    }

    void logout() {
        FirebaseAuth.getInstance().signOut();
        mGoogleSignInClient.signOut().addOnCompleteListener(this, task -> {
            update(null
            );
        });
    }
}
