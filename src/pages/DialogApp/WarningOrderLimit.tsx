import InfoDialog from 'components/organisms/Modals/InfoDialog';
import { STORE_CONFIG } from 'store_constants/stores_config';

const WarningOrderLimit = ({ isOpen, setIsOpen, string }) => {
    const { SIDE_LINKS } = STORE_CONFIG;
    if (!isOpen) return null;

    const linkURL = SIDE_LINKS?.find(el => el?.description === 'Retail')?.href;

    return (
        <>
            <InfoDialog
                variant="error"
                link={
                    linkURL
                        ? {
                              name: string?.retail_catalog,
                              action: () => {
                                  window.open(linkURL, '_blank');
                              },
                          }
                        : null
                }
                string={string}
                onClose={() => {
                    setIsOpen(null);
                }}
                title={null}
                fullWidth
                onSubmit={() => {
                    setIsOpen(null);
                }}
                description={string?.wholesales_ordering_limitation_message}
                closeAvailable
                component="warning ordering"
            />
        </>
    );
};

export default WarningOrderLimit;
