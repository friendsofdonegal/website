export type WithPageLayout<TUnknown = unknown> = React.FC<TUnknown> & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
};
