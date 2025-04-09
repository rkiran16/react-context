import { useEffect, useState } from "react";

export const getDogs = async (length = 10) => {
  const response = await fetch(`https://img.cdn4dd.com/s/managed/interview/tps-dogs/api.json`);
  const response_1 = await response.json();
  let dogs = [];
  response_1.data.children.forEach((c) => {
        const title = c.data.title;
        const url = c.data.preview?.images[0]?.resolutions[2]?.url;
        if (url) {
            dogs.push({ title: title, url: url.replaceAll("&amp;", "&") });
        }
    });
    return dogs.slice(0, length);
};

export const useGetDogs = () => {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDogs()
      .then((response) => {
        setDogs(response);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    dogs,
    isLoading,
    isError,
  };
};
