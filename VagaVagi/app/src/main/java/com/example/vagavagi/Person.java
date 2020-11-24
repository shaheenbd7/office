package com.example.vagavagi;

import android.widget.TextView;

public class Person {

    public int id;
    public String name;
    public String status;
    public String balance;

    public Person() {
        id = 0;
        name = status = balance = "NULL";
    }

    public Person(int id, String name, String status, String balance) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.balance = balance;
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

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

}
