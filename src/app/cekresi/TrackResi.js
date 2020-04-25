const Operation = require('src/app/Operation');
const axios = require('axios').default;

class traceAirBill extends Operation {
    constructor({ usersRepository }) {
        super();
        this.usersRepository = usersRepository;
    }
    async execute(userData) {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

        const user = new User(userData);

        try {
            //const trackingHistory = await axios
            console.log("here");
            this.emit(SUCCESS, newUser);
        } catch (error) {
            if (error.message === 'ValidationError') {
                return this.emit(VALIDATION_ERROR, error);
            }

            this.emit(ERROR, error);
        }
    }
}

traceAirBill.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = traceAirBill;