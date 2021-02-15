class CustomMath {
    static HexadecimalDigitToDecimal(HexadecimalDigitString) {
        switch (HexadecimalDigitString) {
            case 'A' || 'a':
                return 10;
            case 'B' || 'b':
                return 11;
            case 'C' || 'c':
                return 12;
            case 'D' || 'd':
                return 13;
            case 'E' || 'e':
                return 14;
            case 'F' || 'f':
                return 15;
            default:
                return parseInt(HexadecimalDigitString);
        }
    }
    static HexadecimalNumberToDecimal(HexadecimalString) {
        let output = 0;

        for (let i = 0; i < HexadecimalString.length; i++) {
            output += CustomMath.HexadecimalDigitToDecimal(HexadecimalString[i]) * (16 ** (HexadecimalString.length - i - 1));
        }
        return output;
    }

    static DecimalDigitToHexadecimal(DecimalDigit) {
        let integer = Math.floor(DecimalDigit);
        switch (integer) {
            case 15:
                return 'F';
            case 14:
                return 'E';
            case 13:
                return 'D';
            case 12:
                return 'C';
            case 11:
                return 'B';
            case 10:
                return 'A';
            default:
                return integer;
        }
    }
    static DecimalNumberToHexadecimal(DecimalNumber) {
        let output = "";
        let remain = DecimalNumber;
        let remainder = 0;
        while (remain > 1) {
            remainder = remain % 16;
            if (remainder > 0) {
                output = CustomMath.DecimalDigitToHexadecimal(remainder) + output;
                remainder = 0;
            }
            remain = remain / 16;
        }
        return output;
    }

    static ToPositive(Number) {
        return Math.sqrt(Math.pow(Number, 2));
    }

    static OppositeDecimalNumber(DecimalNumber) {
        let newnumber = 0;

        newnumber = CustomMath.ToPositive(DecimalNumber - 10);

        return newnumber;
    }

    static OppositeHexadecimalNumber(HexadecimalNumber) {
        let newnumber;

        newnumber = CustomMath.HexadecimalDigitToDecimal(HexadecimalNumber);

        newnumber = CustomMath.ToPositive(newnumber - 15);

        return CustomMath.DecimalDigitToHexadecimal(newnumber);
    }

    //Color Purpose Manager
    static InvertColor(HexadecimalColor) {
        let col = "#000000";
        let newcol = "#";
        let currentChar = "";

        col = HexadecimalColor;

        for (let i = 0; i < col.length; i++) {
            currentChar = col.charAt(i);
            if (i != 0) {
                newcol += CustomMath.OppositeHexadecimalNumber(currentChar);
            }
        }

        return newcol;
    }
    static DecimalToRGBUnit(Value) {
        let newvalue = "", output = "";
        newvalue = CustomMath.DecimalNumberToHexadecimal(Value);

        switch (newvalue.length) {
            case 0:
                output = "00"
                break;
            case 1:
                output = newvalue + "0";
                break;
            default:
                output = newvalue;
                break;
        }

        return output;
    }
}