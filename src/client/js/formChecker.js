function handleURL(text)  {
    let urlRGEX = /^[a-zA-Z\s]$/ 
    if (urlRGEX.test(text)) {
        return true
    } else {
        alert("Please enter a valid word");
        return false;
    }
}

export { handleURL}