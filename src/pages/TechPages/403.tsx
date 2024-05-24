import ErrorComponent from './ErrorComponent';

const PAGE_403 = () => {
    return <ErrorComponent code="403" title="Bad Request" withLink />;
};

export default PAGE_403;
