package com.example.teaminfo;


import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class ProfileViewHolder extends RecyclerView.ViewHolder {

    public TextView mNameTextView;
    public TextView mNicknameTextView;
    public ImageView mProfileImageView;
    public LinearLayout mCell;

    public ProfileViewHolder(@NonNull View itemView) {
        super(itemView);

        mNameTextView = (TextView) itemView.findViewById(R.id.r_textFullname);
        mNicknameTextView = (TextView) itemView.findViewById(R.id.r_textNickName);
        mProfileImageView = (ImageView) itemView.findViewById(R.id.r_profile_image);
        mCell = (LinearLayout) itemView.findViewById(R.id.r_profileCell);
    }
}
