// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { getBalances } from "../../../actions";
import { NO_BALANCE } from "../../../reducers/balance";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Status from "../../../components/_layout/status/";
import Card from "../../../components/card";
import Overview from "../../../components/overview";
import data from "../../../constants/data.js";

class Assets extends Component {
  state = {
    status: false,
    token: data
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleState = () => {
    this.setState(state => ({
      status: !state.status
    }));
  };

  renderTokens = () => {
    const { token } = this.state;
    return token.map(data => {
      const { token, ticker, price, change } = data;
      return (
        <Card
          key={token}
          tokenName={token}
          ticker={ticker}
          price={price}
          change={change}
        />
      );
    });
  };

  render() {
    const { status } = this.state;
    const viewBalance =
      this.props.balance === NO_BALANCE
        ? "loading..."
        : this.props.balance / Math.pow(10, 12);
    return (
      <Page>
        <Menu />
        <Body>
          <Header
            title="Assets"
            description="Overview of all available Haven Assets"
          />
          <Overview amount={viewBalance} />
          {this.renderTokens()}
        </Body>
        {status && <Status>Pending transaction</Status>}
      </Page>
    );
  }
}

export const mapStateToProps = state => ({
  ...state.balance
});

export default connect(
  mapStateToProps,
  { getBalances }
)(Assets);
