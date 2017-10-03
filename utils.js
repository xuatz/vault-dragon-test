const isValueValid = value => {
    if (!value && value !== false) {
        return false;
    }

    if (Object.prototype.toString.call(value) === "[object String]") {
        return true;
    } else {
        if (typeof value === "object") {
            return true;
        } else {
            try {
                JSON.parse(value);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
};

module.exports = {
    isValueValid
};
