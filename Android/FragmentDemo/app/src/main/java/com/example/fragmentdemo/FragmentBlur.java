package com.example.fragmentdemo;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.bumptech.glide.Glide;


public class FragmentBlur extends Fragment {

    Context context;
    String url = "https://picsum.photos/id/0/300/200";

    public FragmentBlur() {
        // Required empty public constructor
    }

    public FragmentBlur(Context context,String url) {
        // Required empty public constructor
        this.context = context;
        this.url = url;
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View v = inflater.inflate(R.layout.fragment_blur, container, false);
        ImageView img = v.findViewById(R.id.image_view_blur);
        Glide.with(context).load(url).into(img);

        return v;
    }
}