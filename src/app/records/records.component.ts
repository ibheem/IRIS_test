// import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { records } from '../shared/record';




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

  

  /**
   * Discovers columns in the data
   */
  initData(data){
    if(!data) return false;
    this.displayedColumns = Object.keys(data[0]);
    this.initialData = records;
    return true;
  }


  ngOnInit() {
    let inputData = records;
    if(!this.initData(inputData)) return;
    this.buildDataSource();
  }

   /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource(){
    this.dataSource = this.groupBy(this.groupingDef,this.initialData,this.reducedGroups);
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
      if(!accumulator[currentGroup])
      accumulator[currentGroup] = [{
        groupName: `${column} ${currentValue[column]}`,
        value: currentValue[column], 
        isGroup: true,
        reduced: collapsedGroups.some((group) => group.value == currentValue[column])
      }];
      
      accumulator[currentGroup].push(currentValue);

      return accumulator;
    }
    let groups = data.reduce(customReducer,{});
    let groupArray = Object.keys(groups).map(key => groups[key]);
    let flatList = groupArray.reduce((a,c)=>{return a.concat(c); },[]);

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
}

