import { useState, useEffect } from "react";

function useContent(fetchData, setLoading, searchParams) {
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const params = searchParams.toString();
    fetchData(params)
      .then(({ results, total_pages }) => {
        if (isMounted) {
          setTotalPages(total_pages);
          setContent(results);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [searchParams, setError, setLoading, setContent, setTotalPages]);

  return [content, totalPages, error];
}

export default useContent;
