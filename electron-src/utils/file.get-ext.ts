/**
* @desc Extract file ext of an url.
* @param string $url - the target url to extract from
* @return string - success or failure
*/

export default (_path:string) => {

  const arr = _path.split('/')
  const nameArr = arr[arr.length - 1].split('.')
  
  let ext:string = ""

  if (nameArr.length < 2) {
    ext = "none"
  } else {
    ext = nameArr[nameArr.length - 1]
  }
  return ext
}