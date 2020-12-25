/**
 * table 合并单元格
 * @param dataSource
 * @param type
 */
export function mergeCells(dataSource, type){
  const objResult ={};
  const arr = [];//将数组重合成3个数组
  const arr1 = [];//每个组的长度
  const arr2=[0];//每组的位置
  const arrResult =[];
  let len =0;
  let typeResult;
  dataSource. map((val)=>{
     for (const i in val) {
      if (i === type) {
        typeResult = val[i];
      }
    }
    const objArray = objResult[typeResult]||[];
      objArray. push(val);
      objResult [typeResult] = objArray;
  });
  for(const i in objResult) {
    arr.push(objResult[i]);
  }
  arr.map((val, key)=> {
    arr1.push(val.length);
    len += val.length;
    arr2.push(len);
  });
  arrResult[0] = arr1;
  arrResult[1] = arr2;
  return arrResult
}
