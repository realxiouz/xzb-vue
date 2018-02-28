export const detectOS = () => {
    let isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    let isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    let isLinux = /Linux/i.test(navigator.userAgent);
    if(isWin){
        return "win";
    } else if(isMac){
        return "mac";
    } else if(isLinux){
        if(/android/i.test(navigator.userAgent.toLowerCase())){
            return "android"
        }
        return "linux";
    }
}