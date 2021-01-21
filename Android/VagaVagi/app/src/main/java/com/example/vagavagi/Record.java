package com.example.vagavagi;

public class Record {

    public String recordDescription;
    public String recordStatus;
    public String recordDate;

    public Record(String recordDescription, String recordStatus, String recordDate) {
        this.recordDescription = recordDescription;
        this.recordStatus = recordStatus;
        this.recordDate = recordDate;
    }

    public String getRecordDescription() {
        return recordDescription;
    }

    public void setRecordDescription(String recordDescription) {
        this.recordDescription = recordDescription;
    }

    public String getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(String recordStatus) {
        this.recordStatus = recordStatus;
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate;
    }
}
