const domains = [{ URL: ['https://alberto-bini.netlify.app', 'http://localhost:3000'], store: 'ALBERTO_BINI' }];

export const getStoreCode = () => {
    const currentUrl = window.location.href;

    const matchingDomain = domains.find(domain => domain.URL.some(url => currentUrl.includes(url)));

    return matchingDomain ? matchingDomain.store : null;
};
