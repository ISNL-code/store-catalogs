import ErrorComponent from './ErrorComponent';

const PAGE_404 = () => {
    return <ErrorComponent code="404" title="Page Not Found" withLink />;
};

export default PAGE_404;
