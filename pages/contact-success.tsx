/* eslint-disable react/display-name */
import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import PageTitle from "../components/title";
import { WithPageLayout } from "../types/with-page-layout";

const ContactSuccess: WithPageLayout = () => {
    return (
        <div className="container px-4 mx-auto">
            <div>Your information was successfully submitted!</div>
        </div>
    );
};

ContactSuccess.getLayout = (page) => <Layout>{page}</Layout>;

export default ContactSuccess;
