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
 * Use the {@link GroupsFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class GroupsFragment extends Fragment {

    RecyclerView recyclerViewGroup;
    View v;
    List<Group> groupList;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public GroupsFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment GroupsFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static GroupsFragment newInstance(String param1, String param2) {
        GroupsFragment fragment = new GroupsFragment();
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


//        groupList = new ArrayList<>();
//        groupList.add(new Group(1,"Group 1", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 2", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 3", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 4", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 5", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 6", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 7", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 8", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 9", "You owe","BDT 700"));
//        groupList.add(new Group(1,"Group 10", "You owe","BDT 700"));
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_groups, container, false);

//        v = inflater.inflate(R.layout.fragment_people, container, false);
//        recyclerViewGroup = v.findViewById(R.id.recycler_view_group);
//        AdapterGroup adapterGroup = new AdapterGroup(getContext(), groupList);
//        recyclerViewGroup.setLayoutManager( new LinearLayoutManager(getActivity()));
//        recyclerViewGroup.setAdapter( adapterGroup  );
//        return v;
    }
}