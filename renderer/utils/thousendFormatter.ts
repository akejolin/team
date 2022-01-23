export const numberWithCommas:Function = (x:Number):string => `${x}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
