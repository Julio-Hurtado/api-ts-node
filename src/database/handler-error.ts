export const handlerError = (error: Error) => {
  if (error.name === 'ConnectionError') {
    console.error('error db ConnectionError ->', error.message);
    return new Error('connection to db failed');
  }
  if (error.name === 'TransactionError') {
    console.error('error db TransactionError ->', error.message);
    return new Error('Transaction failed');
  }
  if (error.name === 'RequestError') {
    console.error('error db RequestError ->', error.message);
    return new Error('Request failed or missing fields');
  }
  if (error.name === 'PreparedStatementError') {
    console.error('error db PreparedStatementError ->', error.message);
    return new Error('Statement error');
  }
  return error;
};
