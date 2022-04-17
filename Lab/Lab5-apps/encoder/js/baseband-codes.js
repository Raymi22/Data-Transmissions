function getManchesterLevelEncoding(bits) {
    var result = [];
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 1) symbol = '▁∣▔';
      //  AMI = "- 0 _" => - = 1; 0 = 0; _ = -1
        if (parseInt(bits[i].value) == 1 && i > 0 && parseInt(bits[i - 1].value) == 1) symbol = '∣▁∣▔';
        if (parseInt(bits[i].value) == 0) symbol = '▔∣▁';
        if (parseInt(bits[i].value) == 0 && i > 0 && parseInt(bits[i - 1].value) == 0) symbol = '∣▔∣▁';
        result.push(symbol);
    }
    return result;
}

function getNRZL(bits) {
    var result = [];
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 1 && i > 0 && parseInt(bits[i - 1].value) == 1) symbol = '▔▔';
        if (parseInt(bits[i].value) == 0 && i > 0 && parseInt(bits[i - 1].value) == 0) symbol = '▁▁';
        if (parseInt(bits[i].value) == 1 && i > 0 && parseInt(bits[i - 1].value) == 0) symbol = '∣▔▔';
        if (parseInt(bits[i].value) == 0 && i > 0 && parseInt(bits[i - 1].value) == 1) symbol = '∣▁▁';
        if (parseInt(bits[i].value) == 1 && i == 0) symbol = '▔▔';
        if (parseInt(bits[i].value) == 0 && i == 0) symbol = '▁▁';
        result.push(symbol);
    }
    return result;
}

function getNRZM(bits) {
    var result = [];
    var lastState = 0;
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 1 && lastState == 1) {symbol = '∣▁▁'; lastState=0;}
        else {
            if (parseInt(bits[i].value) == 1 && lastState == 0) {symbol = '∣▔▔'; lastState=1;}
            else {
                if (parseInt(bits[i].value) == 0 && lastState == 0) {symbol = '▁▁'; lastState=0;}
                else if (parseInt(bits[i].value) == 0 && lastState == 1) {symbol = '▔▔'; lastState=1;}
            }   
        }

        result.push(symbol);
    }
    return result;
}

function getNRZS(bits) {
    var result = [];
    var lastState = 0;
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 0 && lastState == 1) {symbol = '∣▁▁'; lastState=0;}
        else {
            if (parseInt(bits[i].value) == 0 && lastState == 0) {symbol = '∣▔▔'; lastState=1;}
            else {
                if (parseInt(bits[i].value) == 1 && lastState == 0) {symbol = '▁▁'; lastState=0;}
                else if (parseInt(bits[i].value) == 1 && lastState == 1) {symbol = '▔▔'; lastState=1;}
            }   
        }

        result.push(symbol);
    }
    return result;
}

function getRZ(bits) {
    var result = [];
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 0) symbol = '▁▁';
        else if (parseInt(bits[i].value) == 1) symbol = '∣▔∣▁';

        result.push(symbol);
    }
    return result;
}

function getBL(bits) {
    var result = [];
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 1 && i > 0 && parseInt(bits[i - 1].value) == 1) symbol = '∣▔∣▁';
        else {
            if (parseInt(bits[i].value) == 0 && i > 0 && parseInt(bits[i - 1].value) == 0) symbol = '∣▁∣▔';
            else {
                if (parseInt(bits[i].value) == 0) symbol = '▁∣▔';
                else if (parseInt(bits[i].value) == 1) symbol = '▔∣▁';
            }
        }

        result.push(symbol);
    }
    return result;
}

function getBM(bits) {
    var result = [];
    var lastState = 0;
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 1 && lastState == 1) {symbol = '∣▁∣▔'; lastState=1;}
        else {
            if (parseInt(bits[i].value) == 1 && lastState == 0) {symbol = '∣▔∣▁'; lastState=0;}
            else {
                if (parseInt(bits[i].value) == 0 && lastState == 0) {symbol = '∣▔▔'; lastState=1;}
                else if (parseInt(bits[i].value) == 0 && lastState == 1) {symbol = '∣▁▁'; lastState=0;}
            }   
        }

        result.push(symbol);
    }
    return result;
}

function getBS(bits) {
    var result = [];
    var lastState = 0;
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 0 && lastState == 1) {symbol = '∣▁∣▔'; lastState=1;}
        else {
            if (parseInt(bits[i].value) == 0 && lastState == 0) {symbol = '∣▔∣▁'; lastState=0;}
            else {
                if (parseInt(bits[i].value) == 1 && lastState == 0) {symbol = '∣▔▔'; lastState=1;}
                else if (parseInt(bits[i].value) == 1 && lastState == 1) {symbol = '∣▁▁'; lastState=0;}
            }   
        }

        result.push(symbol);
    }
    return result;
}

function getDelay(bits) {
    var result = [];
    var lastState = 0;
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 1 && lastState == 1) {symbol = '▔∣▁'; lastState=0;}
        else {
            if (parseInt(bits[i].value) == 1 && lastState == 0) {symbol = '▁∣▔'; lastState=1;}
            else {
                if (parseInt(bits[i].value) == 0 && lastState == 0 && i-1>=0 && parseInt(bits[i-1].value) == 0) {symbol = '∣▔▔'; lastState=1;}
                else{
                    if (parseInt(bits[i].value) == 0 && lastState == 1 && i-1>=0 && parseInt(bits[i-1].value) == 0) {symbol = '∣▁▁'; lastState=0;}
                    else{
                        if (parseInt(bits[i].value) == 0 && lastState == 0 && i-1>=0 && parseInt(bits[i-1].value) == 1) {symbol = '▁▁'; lastState=0;}
                        else{
                            if (parseInt(bits[i].value) == 0 && lastState == 1 && i-1>=0 && parseInt(bits[i-1].value) == 1) {symbol = '▔▔'; lastState=1;}
                        }
                    }
                }
            }   
        }

        result.push(symbol);
    }
    return result;
}

function getBLDiff(bits) {
    var result = [];
    var lastState = 0;
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 0 && lastState == 1) {symbol = '∣▁∣▔'; lastState=1;}
        else {
            if (parseInt(bits[i].value) == 0 && lastState == 0) {symbol = '∣▔∣▁'; lastState=0;}
            else {
                if (parseInt(bits[i].value) == 1 && lastState == 0) {symbol = '∣▔▔'; lastState=1;}
                else if (parseInt(bits[i].value) == 1 && lastState == 1) {symbol = '∣▁▁'; lastState=0;}
            }   
        }

        result.push(symbol);
    }
    return result;
}