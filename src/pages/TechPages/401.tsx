import ErrorComponent from './ErrorComponent';

const PAGE_401 = () => {
    return <ErrorComponent code="401" title="Authorization ERROR" withLink />;
};

export default PAGE_401;
