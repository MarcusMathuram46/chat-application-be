const requestLogger =(request, response, next)=>{
    console.log('Method', request.method); // Log the HTTP method of the request
    console.log('Path', request.path); // Log the path (URL) of the request
    console.log('Body', request.body); // Log the body of the request (useful for POST, PUT, etc.)
    console.log('---'); // Separator for clarity in logs
    next(); // Call the next middleware function in the stack
}

module.exports={
    requestLogger
};