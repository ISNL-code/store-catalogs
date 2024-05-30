export interface CreateOrderProps {
    storeCode: string;
    data: {
        shoppingCartItems: {
            attributes: [
                {
                    id: string;
                    name: 'Size';
                    variant: boolean;
                },
                {
                    id: string;
                    name: 'Color';
                    variant: boolean;
                }
            ];
            product: string;
            quantity: number;
        }[];
        amount: number;
        order: {
            shippingQuote: string;
            currency: string;
            payment: {
                paymentType: 'MONEYORDER';
                transactionType: 'CAPTURE';
                paymentModule: 'moneyorder';
                paymentToken: null;
                amount: string;
            };
            delivery: {
                address: string;
                city: string;
                postalCode: string;
                country: string;
                zone: string;
                firstName: string;
                lastName: string;
                phone: string;
                company: string;
            };
        };
    };
    lang: string;
}
