/* eslint-disable react/display-name */
import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import PageTitle from "../components/title";
import { WithPageLayout } from "../types/with-page-layout";

const Contact: WithPageLayout = () => {
    return (
        <div className="container px-4 mx-auto">
            <h1>Contact Us</h1>
            <form
                name="contact"
                method="POST"
                data-netlify="true"
                className="grid max-w-lg grid-cols-1 gap-6 mt-6"
            >
                <label className="block">
                    Your Name:{" "}
                    <input
                        className="block w-full mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                        name="name"
                        type="text"
                    />
                </label>
                <label className="block">
                    Your Email:{" "}
                    <input
                        className="block w-full mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                        placeholder="john@example.com"
                        name="email"
                        type="email"
                    />
                </label>
                <label className="block">
                    Message:{" "}
                    <textarea
                        className="block w-full mt-1 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                        rows={3}
                        spellCheck="false"
                        data-ms-editor="true"
                        name="message"
                    />
                </label>
                <div data-netlify-recaptcha="true"></div>
                <button
                    className="block w-full p-3 mt-1 font-bold bg-gray-100 border-transparent rounded-md ring-gray-400 ring-2 focus:ring-gray-500"
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

Contact.getLayout = (page) => <Layout>{page}</Layout>;

export default Contact;
