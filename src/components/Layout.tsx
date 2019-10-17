import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>IP3X Admiralty Portal</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        {this.props.children}
      </div>
    );
  }
}
