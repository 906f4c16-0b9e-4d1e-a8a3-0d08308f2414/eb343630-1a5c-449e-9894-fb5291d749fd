//
window.oncontextmenu = (e) => {
    e.preventDefault();
    swal("Forbidden", "You can not use right click on this website!", "error");
};

//
var minimalUserResponseInMiliseconds = 100;
var before = new Date().getTime();
debugger;
var after = new Date().getTime();
if (after - before > minimalUserResponseInMiliseconds) {
    window.history.back();
    document.getElementsByTagName("BODY")[0].style.display = "none";
    swal("Denied", "Inspect is not allowed!", "error");
}

//
document.onkeydown = (e) => {
    if (Event.keyCode == 123) {
        swal("Denied", "Inspect is not allowed!", "error");
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        swal("Denied", "Inspect is not allowed!", "error");
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
        swal("Denied", "Inspect is not allowed!", "error");
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        swal("Denied", "Inspect is not allowed!", "error");
        return false;
    }

    if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        swal("Denied", "Inspect is not allowed!", "error");
        return false;
    }
};
