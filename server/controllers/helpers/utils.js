class StatusRes {
    constructor(message = null, response = null) {
        this.message = message;
        this.response = response;
    }

    returnStatus() {
        return {
            message: this.message,
            response: this.response
        }
    }

}

module.exports = {
    StatusRes
}