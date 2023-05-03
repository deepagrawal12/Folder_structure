export class SimCardInformation {
    ChannelOrderID: string;
    EmailID: string;
    SimInfo: SimInfo[];
}

export class SimInfo {
    ProductDetails : string;
    SigmaProductID: string;
    LogicalResourceID: number;
    SimCardNumber: number;
    OfferDesc: string;
}
