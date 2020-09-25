package com.example.teaminfo;


import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class ViewHolder extends RecyclerView.ViewHolder{

        //View mView;
    public TextView mNameView;
    public TextView mEmailView;
    public TextView mContactNoView;
    public ImageView mProfileImage;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
           //mView = itemView;
             mNameView = (TextView) itemView.findViewById(R.id.rProfileName);
             mEmailView = (TextView) itemView.findViewById(R.id.rEmail);
             mContactNoView = (TextView) itemView.findViewById(R.id.rContactNo);
             mProfileImage = (ImageView) itemView.findViewById(R.id.rProfileImage);
        }



//        public void setData(Context context, String name, String email, String contactNo, String image) {
//
//            TextView mNameView = mView.findViewById(R.id.rProfileName);
//            TextView mEmailView = mView.findViewById(R.id.rEmail);
//            TextView mContactNoView = mView.findViewById(R.id.rContactNo);
//
//            mNameView.setText(name);
//            mEmailView.setText(email);
//            mContactNoView.setText(contactNo);
//        }

}

