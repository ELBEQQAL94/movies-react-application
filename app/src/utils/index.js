export function setYears() {
    let years = [];
    const now = new Date().getFullYear();

    for(let i = 1994; i <= now; i++) {
        years.push(i);
    };

    return years;
};

// add query
export const setQueryToUrl = (key, value, location, history) => {
    let pathname = location.pathname;
    let search = location.search; 
    let searchParams = new URLSearchParams(search); 
    searchParams.set(key, value);
    history.push({
        pathname: pathname,
        search: searchParams.toString()
    });
};