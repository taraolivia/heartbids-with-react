const ErrorMessage: React.FC<{ message: string | null }> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-2 p-3 border border-red-400 bg-red-100 text-red-700 rounded-md">
      <strong className="font-bold">Error: </strong>
      <ul className="list-disc ml-4">
        {message.split("\n").map((errMsg, index) => (
          <li key={index}>
            {errMsg}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessage;
