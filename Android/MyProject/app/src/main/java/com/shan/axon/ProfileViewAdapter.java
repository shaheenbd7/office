package com.shan.axon;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import java.util.List;

public class ProfileViewAdapter extends RecyclerView.Adapter<ProfileViewHolder>{

    private Context context;
    public List<Profile> profileList;

    public ProfileViewAdapter(Context context, List<Profile> profileList) {
        this.context = context;
        this.profileList = profileList;
    }

    @NonNull
    @Override
    public ProfileViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int i) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.cell_profile, parent,false);
        return  new ProfileViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ProfileViewHolder holder, final int position) {
        final Profile profile  = profileList.get(position);
        holder.mNameTextView.setText( profile.getName() );
        holder.mNicknameTextView.setText( profile.getNickname() );
        Picasso.get().load(profile.getImageurl()).into(holder.mProfileImageView);


        holder.mCell.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(context, "Profile of :: " + (profile.getName()), Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(context, ProfileDetails.class);
                intent.putExtra("position", String.valueOf(position));
                context.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return profileList.size();
    }
}
