import ErrorComponent from './ErrorComponent';

const PAGE_500 = () => {
    return <ErrorComponent code="500" title="SERVER ERROR" withLink={false} />;
};

export default PAGE_500;
