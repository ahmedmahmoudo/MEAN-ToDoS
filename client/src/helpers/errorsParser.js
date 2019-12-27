export const parseError = (err) => {
    let message = '';
    if(err.response) {
        if(err.response.data) {
            if(err.response.data.errors) {
                message = err.response.data.errors.map(msg => `${msg.msg} for ${msg.param}`);
            } else if(err.response.data.msg) {
                message = err.response.data.msg;
            }            
        } else {
            console.log(err.response);
        }
    } else {
        console.log(err);
        message = 'Something went wrong, please try again later!';
    }
    return message;
}