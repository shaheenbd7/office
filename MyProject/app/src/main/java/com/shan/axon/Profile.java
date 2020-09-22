package com.shan.axon;

public class Profile {

     String bloodgroup, cadress, education, email, facebook, imageurl, name, nickname, paddress, phone, profession, userid;

     public Profile() {

     }

    public Profile(String bloodgroup, String cadress, String education, String email, String facebook, String imageurl, String name, String nickname, String paddress, String phone, String profession, String userid) {
        this.bloodgroup = bloodgroup;
        this.cadress = cadress;
        this.education = education;
        this.email = email;
        this.facebook = facebook;
        this.imageurl = imageurl;
        this.name = name;
        this.nickname = nickname;
        this.paddress = paddress;
        this.phone = phone;
        this.profession = profession;
        this.userid = userid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getBloodgroup() {
        return bloodgroup;
    }

    public void setBloodgroup(String bloodgroup) {
        this.bloodgroup = bloodgroup;
    }

    public String getCadress() {
        return cadress;
    }

    public void setCadress(String cadress) {
        this.cadress = cadress;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPaddress() {
        return paddress;
    }

    public void setPaddress(String paddress) {
        this.paddress = paddress;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }
}
