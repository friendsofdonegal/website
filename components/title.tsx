import React from "react";

interface TitleProps {
  title?: string;
}

const DEFAULT_TITLE = "Friends of Donegal";

const PageTitle: React.FC<TitleProps> = (props) => {
  const pageTitle =
    props.title == null ? DEFAULT_TITLE : `${DEFAULT_TITLE} - ${props.title}`;

  return (
    <>
      <title key="site-title">{pageTitle}</title>
      <meta key="og-site-title" property="og:title" content={pageTitle} />
    </>
  );
};

export default PageTitle;
