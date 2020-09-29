export function setYears() {
    let years = [];
    const now = new Date().getFullYear();

    for(let i = 1994; i <= now; i++) {
        years.push(i);
    };

    return years;
};

// convert params to valid query url
// export function convertParamsToValidUrl(params) {
//     const qs = Object.keys(params)
//       .map(key => `${key}=${params[key]}`)
//       .join('&');
//     return qs;
// };

// add query
// add query
export const addQuery = (key, value, location, history) => {
    let pathname = location.pathname;
    let search = location.search; 
    let searchParams = new URLSearchParams(search); 
    //const queryValues = queryString.parse(search);
    searchParams.set(key, value);
    history.push({
        pathname: pathname,
        search: searchParams.toString()
    });
};