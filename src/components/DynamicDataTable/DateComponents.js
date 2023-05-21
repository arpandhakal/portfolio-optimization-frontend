import React from 'react';
import BikramSambat, {ADToBS, BSToAD}  from "bikram-sambat-js"

export class DateIndividualGetter {
  constructor(dateValue){
    this.dateObject = new Date(dateValue)
  }
  getMonth(){
    let currentMonth = (this.dateObject.getMonth()+1+1).toString() //for expiry date to set onemonth from current date
    if(currentMonth.length<2){
      return "0"+currentMonth
    }
    else{
      return currentMonth

    }

  }

  getManufactureMonth(){
    let currentMonth = (this.dateObject.getMonth()+1).toString() //for expiry date to set onemonth from current date
    if(currentMonth.length<2){
      return "0"+currentMonth
    }
    else{
      return currentMonth

    }

  }

  getCurrentMonth(){
    let currentMonth = (this.dateObject.getMonth()+1).toString()
    if(currentMonth.length<2){
      return "0"+currentMonth
    }
    else{
      return currentMonth

    }

  }

  getTodayDay(){
    if(this.dateObject.getDate().toString().length<2){
      return "0"+this.dateObject.getDate().toString()
    }
    else{
      return this.dateObject.getDate().toString()

    }

  }

  getTodayYear(){
    return this.dateObject.getFullYear()

  }

}


export const getTodayDate = (dateValue=null,isToday=false) =>{

    let dateObject =  isToday?new Date():new Date(dateValue)
    let todayYear = dateObject.getFullYear()

    let todayMonth =()=> {
      let currentMonth = (dateObject.getMonth()+1).toString()
      if(currentMonth.length<2){
        return "0"+currentMonth
      }
      else{
        return currentMonth

      }
    
    }
    let todayDay = ()=> {
      if(dateObject.getDate().toString().length<2){
        return "0"+dateObject.getDate().toString()
      }
      else{
        return dateObject.getDate().toString()

      }
    
    }
    let stringDate = todayYear.toString()+"-"+todayMonth()+"-"+todayDay()
    return stringDate
  };

export class BSConverter {
    constructor(englishDate){
        this.convertDate(englishDate)
    }
    convertDate(value){
        let newDate = ADToBS(value)
        this.nepaliDate = newDate
        this.splitDate = newDate.split("-")

        return this.nepaliDate
    }
    getNepaliYear(){

        return this.splitDate[0]
    }
    getNepaliMonth(){
        return this.splitDate[1]
    }
    getNepaliDay(){
        return this.splitDate[2]
    }

}

export class ADConveter {
    constructor(englishDate){
      this.convertDate(englishDate)
    }
    convertDate(value){
        let newDate = BSToAD(value)
        this.adDate = newDate

        return this.adDate
    }
}

export const nepaliYears = (begin,end) =>{
    const nepliNumbers = {0:"०",1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९"}
    let nepaliDaysList = []
    let nepaliDaysDict = {}
    for(let i=begin;i<=end;i++){
        let nepaliConvert= []
        for (const j of i.toString()){
            nepaliConvert.push(nepliNumbers[j])
        }
        
        let nepaliTemp=""
        for (let z in nepaliConvert){
            nepaliTemp=nepaliTemp+nepaliConvert[z]
        }
        nepaliDaysList.push(nepaliTemp)
        nepaliDaysDict[i]=nepaliTemp
    }
    
    return nepaliDaysDict
}
