import { currentUrl } from "../globals";
import { useCallback, useEffect, useState } from "react";
import { INoteItem } from "../models";

export function useApp() {
  const [submittedValues, setSubmittedValues] = useState<INoteItem[]>([]); // стэйт с noteItem
  const [shouldFetch, setShouldFetch] = useState(false); // флаг для фетча
  const [shouldRender, setShouldRender] = useState(false); // флаг для рендера
  const [currentContent, setCurrentContent] = useState({}); // стейт с текущим объектом для пост-запроса
  const [currentId, setCurrentId] = useState(""); // стейт с текущим id(key) для пост-запроса
  const [requestType, setRequestType] = useState("get"); // стейт с текущим типом запроса

  const fetchData = useCallback(
    async (requestType: string) => {
      if (!shouldFetch) return;

      if (requestType === "post") {
        try {
          const response = await fetch(`${currentUrl}/notes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(currentContent),
          });

          const jsonData = await response.json();

          setShouldFetch(false);
          setShouldRender(true);
          setRequestType("get");

          console.log("POST: ", jsonData);
        } catch (error) {
          console.error(error);
        }
      }
      if (requestType === "get") {
        try {
          const response = await fetch(`${currentUrl}/notes`);
          const jsonData = await response.json();

          setShouldFetch(false);
          setSubmittedValues(jsonData);
          setShouldRender(true);

          console.log("GET: ", jsonData);
        } catch (error) {
          console.error(error);
        }
      }
      if (requestType === "delete") {
        try {
          const response = await fetch(`${currentUrl}/notes/${currentId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          });
          const jsonData = await response.json();

          console.log("DELETE: ", jsonData);

          if (jsonData.success) {
            setRequestType("get");
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    [shouldFetch, currentContent, currentId]
  );

  useEffect(() => {
    fetchData(requestType);
  }, [fetchData, requestType]);

  const handleFormSubmit = (data: INoteItem) => {
    setSubmittedValues([...submittedValues, { ...data }]);
    setCurrentContent(data);
    setShouldFetch(true);
    setRequestType("post");
  };

  const handleDeleteNote = (element: React.RefObject<HTMLElement>) => {
    console.log(element, "delete note!", element.current?.id);
    const id = element.current?.id;
    if (id) {
      setCurrentId(id);
      setShouldFetch(true);
      setRequestType("delete");
    }
  };

  const handleRefreshNotes = () => {
    setShouldFetch(true);
    setRequestType("get");
  };

  return {handleFormSubmit, handleDeleteNote, handleRefreshNotes, shouldRender, submittedValues, };
}
