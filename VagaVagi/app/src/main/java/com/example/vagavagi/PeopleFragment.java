package com.example.vagavagi;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link PeopleFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class PeopleFragment extends Fragment {

    RecyclerView recyclerViewPeople;
    View v;
    List<Person> people;


    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public PeopleFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment PeopleFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static PeopleFragment newInstance(String param1, String param2) {
        PeopleFragment fragment = new PeopleFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }

        //recyclerViewPeople =

        people = new ArrayList<>();
        people.add(new Person(1,"Shaheen", "owes you", "11323"));
        people.add(new Person(1,"asdf", "owes you", "123"));
        people.add(new Person(1,"asdfa", "owes you", "11323"));
        people.add(new Person(1,"asdfasdfadf", "owes you", "41123"));
        people.add(new Person(1,"adfasdfasdfsdf", "owes you", "1523"));
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_people, container, false);
        recyclerViewPeople = v.findViewById(R.id.recycler_view_people);
        AdapterPeople adapterPeople = new AdapterPeople(getContext(), people);
        recyclerViewPeople.setLayoutManager( new LinearLayoutManager(getActivity()));
        recyclerViewPeople.setAdapter( adapterPeople  );
        return v;
    }
}