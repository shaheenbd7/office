package com.example.fragmentdemo;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.bumptech.glide.Glide;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link FragmentActual#newInstance} factory method to
 * create an instance of this fragment.
 */
public class FragmentActual extends Fragment {

    Context context;
    String url = "https://picsum.photos/0/200/300?grayscale";

    public FragmentActual() {
        // Required empty public constructor
    }

    public FragmentActual(Context context, String url) {
        this.context = context;
        this.url = url;
    }

    public static FragmentActual newInstance(String param1, String param2) {
        FragmentActual fragment = new FragmentActual();
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
       View v = inflater.inflate(R.layout.fragment_actual, container, false);
       ImageView imageView = v.findViewById(R.id.image_view_actual);
       Glide.with(context).load(url).into(imageView);
       return v;
    }
}