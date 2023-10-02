import { useFetchOneScriptQuery } from "@/slices/scriptApiSlice";
import { useParams } from "react-router-dom";

export const ScriptDetailsScreen = () => {
  const { scriptId } = useParams();

  const { data, isLoading, isSuccess } = useFetchOneScriptQuery(scriptId as string);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess || !data) {
    return <p>Error loading script details.</p>;
  }

  const {
    avatar,
    email,
    logline,
    personalConnect,
    synopsis,
    uploadDate,
    userName,
  } = data.script;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center">
        <img
          src={avatar}
          alt={`${userName}'s avatar`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="text-gray-700 text-sm">
            {userName} - {email}
          </p>
          <p className="text-gray-600 text-xs">{uploadDate}</p>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mt-4">{logline}</h1>
      <p className="text-lg mt-2">{synopsis}</p>
      <h2 className="text-xl font-semibold mt-4">Personal Connect</h2>
      <p className="text-lg mt-2">{personalConnect}</p>
    </div>
  );
};
