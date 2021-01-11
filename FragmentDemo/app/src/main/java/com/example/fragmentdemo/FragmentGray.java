package com.example.fragmentdemo;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.bumptech.glide.Glide;


public class FragmentGray extends Fragment {

    Context context;
    String url = "https://picsum.photos/0/200/300?grayscale";


    public FragmentGray() {
        // Required empty public constructor
    }

    public FragmentGray(Context context, String url) {
        this.context = context;
        this.url = url;
    }

    public static FragmentGray newInstance() {
        FragmentGray fragment = new FragmentGray();
        Bundle args = new Bundle();

        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View v = inflater.inflate(R.layout.fragment_gray, container, false);
        ImageView imageViewGray = v.findViewById(R.id.imageViewGray);
        Glide.with(context).load(url).into(imageViewGray);
        return v;
    }
}