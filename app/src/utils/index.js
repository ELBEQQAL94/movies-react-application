export function setYears() {
    let years = [];
    const now = new Date().getFullYear();

    for(let i = 1994; i <= now; i++) {
        years.push(i);
    };

    return years;
};

// convert params to valid query url
export function convertParamsToValidUrl(params) {
    const qs = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return qs;
};