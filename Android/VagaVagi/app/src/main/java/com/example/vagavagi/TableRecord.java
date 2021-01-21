package com.example.vagavagi;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "table_record")
public class TableRecord {

    @PrimaryKey
    int id;
    String date;
    String userid;
    String payee1;
    String payee2;
    String payee3;
    String description;
    String amount;
    String groupid;

    public TableRecord(int id, String date, String userid, String payee1, String payee2, String payee3, String description, String amount, String groupid) {
        this.id = id;
        this.date = date;
        this.userid = userid;
        this.payee1 = payee1;
        this.payee2 = payee2;
        this.payee3 = payee3;
        this.description = description;
        this.amount = amount;
        this.groupid = groupid;
    }

    public int getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getUserid() {
        return userid;
    }

    public String getPayee1() {
        return payee1;
    }

    public String getPayee2() {
        return payee2;
    }

    public String getPayee3() {
        return payee3;
    }

    public String getDescription() {
        return description;
    }

    public String getAmount() {
        return amount;
    }

    public String getGroupid() {
        return groupid;
    }
}
