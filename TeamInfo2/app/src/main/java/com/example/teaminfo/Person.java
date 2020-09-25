package com.example.teaminfo;

import android.util.Log;

public class Person {

    String name,contactNo,email,profileImage;
    private static final String TAG = "Person";

    public Person() {}

    public Person(String name, String contactNo, String email, String profileImage) {
        this.name = name;
        this.contactNo = contactNo;
        this.email = email;
        this.profileImage = profileImage;
        Log.d(TAG, "Person: " + profileImage);
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
