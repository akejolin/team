export const sortArray = <model>(arr:model[], key:string, order:'asc' | 'desc' = 'asc'):model[] => {
  return arr.sort((function(index:string) {
    return function(a:any, b:any) {
      if (order === 'desc') {
        return (a[index] === b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
      } else {
        return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
      }
    };
  })(key))
}

export default sortArray