// import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { records, iRecord } from '../shared/record';
import { MatInput } from '@angular/material/input';




/**
 * @title Required records table
 */
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit{
  displayedColumns: string[] = [];
  // dataSource = new RecordsDataSource();
  dataSource = [];

  groupingDef: string = "group";

  groupingColumn;

  reducedGroups = [];

  initialData: any [];

  validNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')]);

  editRowId:number=-1
  @ViewChildren(MatInput,{read:ElementRef}) inputs:QueryList<ElementRef>;

  ngOnInit() {
    let inputData = records;
    if(!this.initData(inputData)) return;
    this.buildDataSource();
  }

  /**
   * Discovers columns in the data
   */
  initData(data){
    if(!data) return false;
    this.displayedColumns = Object.keys(data[0]);
    this.initialData = records;
    return true;
  }


   /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource(){
    this.dataSource = this.groupBy(this.groupingDef,this.initialData,this.reducedGroups);
    console.log( 'data-source');
    console.log( this.dataSource);
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */
  groupBy(column:string,data: any[],reducedGroups?: any[]){
    if(!column) return data;
    let collapsedGroups = reducedGroups;
    if(!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator, currentValue) => {
      let currentGroup = currentValue[column];
      if(!accumulator[currentGroup]){
        accumulator[currentGroup] = [{
          groupName: `${column} ${currentValue[column]}`,
          value: currentValue[column], 
          isGroup: true,
          reduced: collapsedGroups.some((group) => group.value == currentValue[column])
        }];
      }
      accumulator[currentGroup].push(currentValue);

      return accumulator;
    }
    let groups = data.reduce(customReducer,{});
    
    let groupArray = Object.keys(groups).map(key => groups[key]);
    this.addFooterRow(groupArray);
    let flatList = groupArray.reduce((a,c)=>{return a.concat(c); },[]);
    // console.log( 'groups');
    // console.log(groups);
    // console.log( 'group-array');
    // console.log(groupArray);
    // console.log( 'flatList');
    // console.log(flatList);
    return flatList.filter((rawLine) => {
        return rawLine.isGroup || 
        collapsedGroups.every((group) => rawLine[column]!=group.value);
      });
  }
/**
   * Since groups are on the same level as the data, 
   * this function is used by @input(matRowDefWhen)
   */
  isGroup(index,item): boolean{
    return item.isGroup;
  }

  /**
   * Used in the view to collapse a group
   * Effectively removing it from the displayed datasource
   */
  reduceGroup(row){
    row.reduced=!row.reduced;
    if(row.reduced)
      this.reducedGroups.push(row);
    else
      this.reducedGroups = this.reducedGroups.filter((el)=>el.value!=row.value);
    
    this.buildDataSource();
  }

  /** Gets the total of all columns. */
  addFooterRow(groups) {
    
    for(const element of groups){
      console.log(element);
      let footerRow = {group:element[0].value,index:"Total"};
      element.forEach((row,index)=>{
        if(index>0){
          let sum = 0;
          let key = '';
          Object.keys(row).forEach((obj, i)=>{
            
            if(i>1){
              sum = sum + (row[obj]);
              footerRow[obj] = sum.toFixed(2);
            }
            
          });
          // footerRow[obj] = sum.toFixed(2);
        }
      });
      element.push(footerRow)
      // console.log(element)
    }
    // var sum = this.items[i]['myfield'].reduce(function(x, y) { return x + y; }, 0);
  }
}

