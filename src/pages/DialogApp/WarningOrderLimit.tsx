import InfoDialog from 'components/organisms/Modals/InfoDialog';
import { STORE_CONFIG } from 'store_constants/stores_config';
import { telegramSender } from 'utils/telegramSender';

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
                                  telegramSender({
                                      action: `GO TO RETAIL FROM CART`,
                                  });
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
                content={null}
            />
        </>
    );
};

export default WarningOrderLimit;
