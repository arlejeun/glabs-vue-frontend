
/**
 * This Javascript function gets the substring located between the two strings passed as parameters, start and end. The start and end strings are not included in the returned string.
 * @param startStr extract substring from the end of this word
 * @param endStr extract substring to the beginning of this word
 * @param str sentence
 */
 
export function stringBetweenStrings (startStr: string, endStr: string, str: string): string {
    const pos = str.indexOf(startStr) + startStr.length;
    return str.substring(pos, str.indexOf(endStr, pos)); 
}


/**
 * This Javascript function extracts parameter by name.
 * @param name name of the parameter to extract
 */
 
export function getParameterByName(name: string) : string {
    name = name.replace(/[\\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\#&]" + name + "=([^&#]*)"),
      results = regex.exec(location.hash);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}