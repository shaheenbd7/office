package com.example.vagavagi;

import java.util.List;

public class Group {

    int id;
    //List<Integer> memberList;
    //List<String> nameList;
    String name;
    String status;
    String amount;

    public Group() {
        this.id = 0;
        this.status = "NULL";
        this.amount = "NULL";
        this.name = "NULL";
    }

    public Group(int id, String name, String status, String amount) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
